import {FSWatcher} from "fs";

export declare type TTask = {
    "source": string;
    "extension"?: string[];
    "file"?: string[];
    "destination": string;
}

export declare type TJsonTasks = {
    data: TTask[];
};

export declare interface Watcher extends FSWatcher {
    /**
     * Returns `true` if the watcher has been closed.
     */
    isClosed(): boolean;

    /**
     * Returns all watched paths.
     */
    getWatchedPaths(): Array<string>;
}

export declare type TWatchers = {
    [source: string]: {
        watcher: Watcher;
        task: TTask;
    };
}
