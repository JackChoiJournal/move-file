import * as util from "util";
import {access, readdir} from "fs/promises";
import {constants, Dirent} from "fs";
import {DirectoryTree, GetDirectoryTree} from "../../@types/types";

let exec = require('child_process').exec;
exec = util.promisify(exec);

export let isWritable = async function (directory: string): Promise<boolean> {
    try {
        await access(directory, constants.W_OK);
    } catch (e) {
        return false
    }

    return true
}

export let isReadable = async function (directory: string): Promise<boolean> {
    try {
        await access(directory, constants.R_OK);
    } catch (e) {
        return false
    }

    return true
}

export let getDrives = async function (): Promise<string[]> {
    let {stdout} = await exec("wmic logicaldisk get name") as { stdout: string };
    return <string[]>stdout.match(/(\w:)/g) ?? [];
}

export let getDirectories = async function (path: string, {
    readable,
    writable
}: { readable?: boolean, writable?: boolean } = {}): Promise<string[]> {
    let files: Dirent[] = [];
    let directories: string[] = [];

    files = await readdir(path, {withFileTypes: true});

    directories = files.filter(file => file.isDirectory()).map(file => file.name);

    if (readable) {
        directories = directories.filter(async directory => {
            return await isReadable(directory);
        });
    }

    if (writable) {
        directories = directories.filter(async directory => {
            return await isWritable(directory);
        });
    }

    return directories;
}