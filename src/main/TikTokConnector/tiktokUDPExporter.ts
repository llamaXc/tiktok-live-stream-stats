import dgram, { Socket } from 'dgram';

export interface DataPayload {
  likes: number;
  followers: number;
  comments: number;
  type: string;
}

export default class UDPSender {
  private client: Socket;
  private port: number;
  private host: string;

  constructor(port: number, host: string) {
    this.port = port;
    this.host = host;
    this.client = dgram.createSocket('udp4');
  }

  public sendFollowEvent(uniqueId: string, followerCount: number): void{
    const message = Buffer.from(JSON.stringify({"type": "follower", "uniqueId": uniqueId, "followerCount": followerCount}));

    this.client.send(message, 0, message.length, this.port, this.host, (err) => {
      if (err) {
        console.error('Error sending data:', err);
      } else {
        console.log('Followed sent:', uniqueId);
      }
    });
  }

  public sendStatsData(likes: number, followers: number, comments: number): void {
    const data: DataPayload = {
      likes,
      followers,
      comments,
      "type": "stats"
    };

    const message = Buffer.from(JSON.stringify(data));
    console.log("SENDING ", message)

    this.client.send(message, 0, message.length, this.port, this.host, (err) => {
      if (err) {
        console.error('Error sending data:', err);
      } else {
        console.log('Data sent:', data);
      }
    });
  }

  public close(): void {
    this.client.close();
  }
}


