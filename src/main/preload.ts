import {contextBridge, ipcRenderer} from 'electron';

export type Channels = 'ipc-example';

contextBridge.exposeInMainWorld('api', {
    getTasks() {
        return ipcRenderer.invoke('get-tasks');
    },
    getDrives() {
        return ipcRenderer.invoke('get-drives');
    },
    getDirectories(path: string) {
        return ipcRenderer.invoke('get-directories', path);
    },
    getDirectoryTree(path: string, option: {depth: number}) {
        return ipcRenderer.invoke('get-directory-tree', path, option);
    }
});
