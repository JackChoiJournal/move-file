import {Task} from "../../@types/types";

import {getDirectories, getDirectoryTree, getDrives} from "../drive/tools";
const {ipcMain} = require('electron');

ipcMain.handle('get-tasks', async () => {
    let tasks: Task[] = [];

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

ipcMain.handle('get-directory-tree', (_, drive:string, option: {depth:number})=>{
    return getDirectoryTree(drive, option);
});