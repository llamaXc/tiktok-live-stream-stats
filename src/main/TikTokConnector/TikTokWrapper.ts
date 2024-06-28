/* eslint-disable @typescript-eslint/no-explicit-any */
import { WebcastPushConnection } from 'tiktok-live-connector';
import { EventEmitter } from 'events';

let globalConnectionCount = 0;

/**
 * TikTok LIVE connection wrapper with advanced reconnect functionality and error handling
 */
class TikTokConnectionWrapper extends EventEmitter {
    private uniqueId: string;
    private enableLog: boolean;
    private clientDisconnected: boolean;
    private reconnectEnabled: boolean;
    private reconnectCount: number;
    private reconnectWaitMs: number;
    private maxReconnectAttempts: number;
    private startTime: number;
    public connection: WebcastPushConnection;

    constructor(uniqueId: string, options: any, enableLog: boolean) {
        super();

        this.uniqueId = uniqueId;
        this.enableLog = enableLog;

        // Connection State
        this.clientDisconnected = false;
        this.reconnectEnabled = true;
        this.reconnectCount = 0;
        this.reconnectWaitMs = 1000;
        this.maxReconnectAttempts = 5;
        this.startTime = Date.now();

        this.connection = new WebcastPushConnection(uniqueId, options);

        this.connection.on('streamEnd', () => {
            this.log(`streamEnd event received, giving up connection`);
            this.reconnectEnabled = false;
        });

        this.connection.on('disconnected', () => {
            globalConnectionCount -= 1;
            this.log(`TikTok connection disconnected`);
            this.scheduleReconnect();
        });

        this.connection.on('error', (err: any) => {
            this.log(`Error event triggered: ${err.info}, ${err.exception}`);
            console.error(err);
        });
    }

    connect(isReconnect: boolean): void {
        this.connection.connect().then((state: any) => {
            this.log(`${isReconnect ? 'Reconnected' : 'Connected'} to roomId ${state.roomId}, websocket: ${state.upgradedToWebsocket}`);

            globalConnectionCount += 1;

            // Reset reconnect vars
            this.reconnectCount = 0;
            this.reconnectWaitMs = 1000;

            // Client disconnected while establishing connection => drop connection
            if (this.clientDisconnected) {
                this.connection.disconnect();
                return;
            }

            // Notify client
            if (!isReconnect) {
                this.emit('connected', state);
            }
        }).catch((err: any) => {
            this.log(`${isReconnect ? 'Reconnect' : 'Connection'} failed, ${err}`);
            
            if (isReconnect) {
                // Schedule the next reconnect attempt
                console.log;
                this.scheduleReconnect(err);
            } else {
                // Notify client
                this.emit('disconnected', err.toString());
            }
        });
    }

    scheduleReconnect(reason?: any): void {
        if (!this.reconnectEnabled) {
            return;
        }

        if (this.reconnectCount >= this.maxReconnectAttempts) {
            this.log(`Give up connection, max reconnect attempts exceeded`);
            this.emit('disconnected', `Connection lost. ${reason}`);
            return;
        }

        this.log(`Try reconnect in ${this.reconnectWaitMs}ms`);

        setTimeout(() => {
            if (!this.reconnectEnabled || this.reconnectCount >= this.maxReconnectAttempts) {
                return;
            }

            this.reconnectCount += 1;
            this.reconnectWaitMs *= 2;
            console.log("OK WE ARE TRYING TO RECOUNECT: " + ((Date.now()- this.startTime) / 1000) + " seconds");
            this.connect(true);

        }, this.reconnectWaitMs);
    }

    disconnect(): void {
        this.log(`Client connection disconnected`);

        this.clientDisconnected = true;
        this.reconnectEnabled = false;

        // if (this.connection.getState().isConnected) {
        this.connection.disconnect();
        // }
    }

    private log(logString: string): void {
        if (this.enableLog) {
            console.log(`WRAPPER @${this.uniqueId}: ${logString}`);
        }
    }
}

export {
    TikTokConnectionWrapper,
    globalConnectionCount
};
