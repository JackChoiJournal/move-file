import {TTask} from "../watcher/types";
import {getDirectories, getDrives} from "../drive/tools";

const {ipcMain} = require('electron');

ipcMain.handle('get-tasks', async () => {
    let tasks: TTask[] = []

    for (let [_, watcher] of Object.entries(global.shared.watcherHandler?.watchers ?? {})) {
        tasks.push(watcher.task);
    }

    return tasks;
});

ipcMain.handle('get-drives', () => {
   return getDrives();
});

ipcMain.handle('get-directories', (_, drive:string)=>{
    return getDirectories(drive);
});