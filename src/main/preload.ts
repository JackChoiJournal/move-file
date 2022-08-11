import { contextBridge, ipcRenderer } from 'electron';

export type Channels = 'ipc-example';

contextBridge.exposeInMainWorld('api', {
    getTasks() {
      return ipcRenderer.invoke('get-tasks');
    },
    getDrives() {
        return ipcRenderer.invoke('get-drives');
    },
    getDirectories() {
        return ipcRenderer.invoke('get-directories');
    }
});
