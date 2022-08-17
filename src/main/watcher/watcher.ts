import path from "path";

import watch from 'node-watch';
import {access, mkdir, rename, readFile, writeFile} from "fs/promises";
import {constants} from "fs";
import {getAssetPath} from "../utilities/path";
import {TJsonTasks, TTask, TWatchers} from "../../@types/types";

export class WatcherHandler {
    static instance: WatcherHandler;
    static watchers: TWatchers = {};

    constructor(tasks?: TJsonTasks) {
        if (WatcherHandler.instance) {
            return WatcherHandler.instance;
        }

        WatcherHandler.instance = WatcherHandler;

        tasks?.data?.forEach((task: TTask) => {
            WatcherHandler.start(task);
        });
    }

    get watchers(): TWatchers {
        return WatcherHandler.watchers;
    }

    /**
     * This function is for starting a NEW watcher, if you want to update an existing watcher,
     * use `update()` instead.
     * If the watchers[task.source] exists, and it's a watcher then just return.
     * @param task
     */
    static start(task: Task): void {
        if (typeof WatcherHandler.watchers[task.source] !== "undefined"
            || typeof WatcherHandler.watchers[task.source]?.watcher?.isClosed === 'function') {
            return;
        }

        WatcherHandler.watchers[task.source] = {
            watcher: watch(task.source, {recursive: false}),
            task: task,
        };

        WatcherHandler.watchers[task.source]?.watcher.on('change', async (evt: string, file: string) => {
            let fileObj = path.parse(file);

            if (evt === 'update' && (task.extension?.includes(fileObj.ext) || task.files?.includes(fileObj.base))) {
                await moveFile(file, task.destination);
            }
        });

        WatcherHandler.watchers[task.source]?.watcher.on('error', function (error: Error) {
            throw error;
        });

        WatcherHandler.watchers[task.source]?.watcher.on('ready', function () {
            console.log('Watcher is ready');
        });

        console.log(`Started watching ${task.source}`);
    }

    static close(source: string): void {
        WatcherHandler.watchers[source]?.watcher.close();
        delete WatcherHandler.watchers[source];
    }
}

/**
 * @param {string} source - The source path with file name.
 * @param {string} destination - The destination path without file name.
 */
async function moveFile(source: string, destination: string) {
    try {
        await access(destination, constants.F_OK);
    } catch (err) {
        await mkdir(destination, {recursive: true});
    }

    await rename(source, path.join(destination, path.basename(source)));
}

/**
 * Reads the JSON file of the watcher tasks and returns the parsed object.
 */
export async function read(): Promise<TJsonTasks> {
    let dataString: string = await readFile(getAssetPath('tasks.json'), "utf8");
    return JSON.parse(dataString) as TJsonTasks;
}

/**
 * Writes the watchers' task into JSON file.
 */
export async function save(): Promise<void> {
    let tasks: TJsonTasks = {
        data: [],
    };

    for(let source in WatcherHandler.watchers) {
        tasks.data.push(WatcherHandler.watchers[source].task);
    }

    return writeFile(getAssetPath('tasks.json'), JSON.stringify(tasks));
}
