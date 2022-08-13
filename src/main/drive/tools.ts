import * as util from "util";
import {access, readdir} from "fs/promises";
import path from "path";
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


export let getDirectoryTree: GetDirectoryTree = async function (parentPath, option = {depth: 5}, currentDepth = 0): Promise<DirectoryTree | undefined> {
    if (Number.isInteger(option.depth) && currentDepth > option.depth) {
        return;
    }

    let directories: DirectoryTree = {
        id: parentPath,
        name: path.basename(parentPath) === '' ? parentPath : path.basename(parentPath)
    } as DirectoryTree;

    try {
        if (parentPath === 'E:') {
            console.log();
        }
        let files = await readdir(parentPath, {withFileTypes: true})
        let children: DirectoryTree[] = [];
        for (let file of files) {
            if (file.isDirectory()) {
                let child = await getDirectoryTree(parentPath + "\\" + file.name, option, currentDepth + 1);

                if (child) {
                    children.push(child);
                }
            }
        }

        if (children.length > 0) {
            directories.children = children;
        }


        return directories;
    } catch (e) {
        return;
    }
}