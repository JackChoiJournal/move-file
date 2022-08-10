import {TTask} from "../watcher/types";

const {ipcMain} = require('electron');

ipcMain.handle('get-tasks', async () => {
    let tasks: TTask[] = []

    for (let [_, watcher] of Object.entries(global.shared.watcherHandler?.watchers ?? {})) {
        tasks.push(watcher.task);
    }

    return tasks;
});
