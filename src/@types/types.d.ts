import {FSWatcher} from "fs";

export declare type TTask = {
    "source": string;
    "extension"?: string[];
    "files"?: string[];
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

export declare type DirectoryTree = {
    id: string,
    name?: string;
    children?: DirectoryTree[];
}

export declare interface GetDirectoryTree {
    (parentPath: string, option?: { depth: number }, currentDepth?: number): Promise<DirectoryTree | undefined>
}

export declare interface RenderTree {
    id: string;
    name: string;
    children?: RenderTree[];
}