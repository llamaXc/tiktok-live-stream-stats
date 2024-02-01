

export function connectToTikTok(username: string):  void{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ipcRenderer = (window as any).ipcRenderer
    ipcRenderer.send("connect", JSON.stringify({"username": username}))
}

