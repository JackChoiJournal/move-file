import {TreeItem, TreeView} from "@mui/lab";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CircularProgress from '@mui/material/CircularProgress';
import {useEffect, useState} from "react";
import {createPortal} from "react-dom";
import {RenderTree} from "../../../@types/types";
import {Backdrop} from "./Backdrop";

const memoryState: {
    [key: string]: any
} = {};

function useMemoryState(key: string, initialState: unknown | Function) {
    const [state, setState] = useState(() => {
        const hasMemoryValue = Object.prototype.hasOwnProperty.call(memoryState, key);
        if (hasMemoryValue) {
            return memoryState[key]
        } else {
            return typeof initialState === 'function' ? initialState() : initialState;
        }
    });

    function onChange(nextState: unknown) {
        memoryState[key] = nextState;
        setState(nextState);
    }

    return [state, onChange];
}

export function DirectoryListModal() {
    let [isLoaded, setIsLoaded] = useMemoryState('isLoaded', false);
    let [directoryTreeCache, setDirectoryTreeCache] = useMemoryState('directoryTreeCache', []);

    function onError() {
        directoryTreeCache = [
            {
                id: "0",
                name: "No drives found",
            }
        ];
    }

    useEffect(() => {
        window.api.getDrives()
            .then(async drives => {
                if (drives.length === 0) {
                    throw new Error("No drives found");
                }

                let directories: RenderTree[] = [];
                for (let drive of drives) {
                    directories.push(await window.api.getDirectoryTree(drive, {depth: 3}) as unknown as RenderTree);
                }

                setDirectoryTreeCache(directories);
            })
            .catch((e) => {
                // TODO Add log if needed
                console.log(e);
                onError();
            })
            .finally(() => {
                setIsLoaded(true);
            })
    }, [isLoaded]);

    function renderTree(tree: RenderTree[]) {
        return tree.map(({id, name, children}) => (
            <TreeItem key={id} nodeId={id} label={name}>
                {
                    Array.isArray(children)
                        ? children.map(child => renderTree([child]))
                        : null
                }
            </TreeItem>
        ));
    }

    let content = isLoaded
        ? (
            <TreeView
                aria-label="file system navigator"
                defaultCollapseIcon={<ExpandMoreIcon/>}
                defaultExpandIcon={<ChevronRightIcon/>}
                sx={{width: '100%', height: '100%'}}
            >
                {renderTree(directoryTreeCache)}
            </TreeView>
        )
        : <CircularProgress/>

    return (
        <div
            className="fixed w-[50%] h-[50%]
            z-20 left-[25%] top-[25%]
            bg-white shadow-lg shadow-gray-300
            ring-[5px] ring-slate-50/70 rounded-lg
            flex justify-center items-center
            p-10 overflow-auto"
        >
            {content}
        </div>
    )
}

export function DirectoryListBackdropModal({onClose}: { onClose: () => void }) {
    return (
        <>
            {createPortal(<Backdrop
                onClick={onClose}/>, document.querySelector('#backdrop') as Element)}
            {createPortal(
                <DirectoryListModal/>, document.querySelector('#modal') as Element)}
        </>
    )
}