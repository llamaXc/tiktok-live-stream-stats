/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("ipcRenderer", {

  send: (channel: string, data: any) => {
     ipcRenderer.send(channel, data)
  },

  on: (channel: string, func: (arg0: any) => void) => {
    ipcRenderer.on(channel, (event, ...args) => func(args))
  },
})

ipcRenderer.on('change-location', (event, location) => {
  window.location.hash=location
})
