import { app, BrowserWindow } from 'electron';
import { createAppWindow } from './appWindow';

app.whenReady().then(async () => {
  createAppWindow()
}).catch(console.log)

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createAppWindow();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

if (require('electron-squirrel-startup')) {
  app.quit();
}
