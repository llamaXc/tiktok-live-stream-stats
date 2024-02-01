/* eslint-disable @typescript-eslint/no-unused-vars */
import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import TiktokLiveWrapper from './tiktok'

declare const APP_WINDOW_WEBPACK_ENTRY: string;
declare const APP_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

let appWindow: BrowserWindow;

export function createAppWindow(): BrowserWindow {
  appWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    autoHideMenuBar: true,
    icon: path.resolve('assets/images/appIcon.ico'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      nodeIntegrationInWorker: false,
      nodeIntegrationInSubFrames: false,
      preload: APP_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  appWindow.setMinimumSize(1200,600)

  appWindow.loadURL(APP_WINDOW_WEBPACK_ENTRY);

  let tiktokConnection: TiktokLiveWrapper = null;
  
  ipcMain.on('connect', (event, payload) => {
    const request = JSON.parse(payload)
    tiktokConnection = new TiktokLiveWrapper(request.username)
    tiktokConnection.connect()
  })

  ipcMain.on('disconnect', (event, payload) => {
    tiktokConnection.disconnect()
    tiktokConnection = null
  })

  appWindow.on('ready-to-show', () => appWindow.show());

  appWindow.on('close', () => {
    appWindow = null;
    app.quit();
  });

  return appWindow;
}

export {appWindow}