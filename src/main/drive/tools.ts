import * as util from "util";
const {access, readdir} = require("fs/promises");
const {constants, Dirent} = require("fs");
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

export let getDirectories = async function (drive: string, {
    readable,
    writable
}: { readable?: boolean, writable?: boolean } = {}): Promise<string[]> {
    let files: typeof Dirent[] = [];
    let directories: string[] = [];

    files = await readdir(drive, {withFileTypes: true});

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