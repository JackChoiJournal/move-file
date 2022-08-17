import {FSWatcher} from "fs";

export declare class Task {
    source: string;
    destination: string;
    extension?: string[];
    files?: string[];

    constructor(source: string, destination: string, extension?: string[], files?: string[])
}

export declare type TJsonTasks = {
    data: Task[];
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
        task: Task;
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