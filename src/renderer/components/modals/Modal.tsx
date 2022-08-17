import {TreeItem, TreeView} from "@mui/lab";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CircularProgress from '@mui/material/CircularProgress';
import {useEffect, useState} from "react";
import {createPortal} from "react-dom";
import {RenderTree} from "../../../@types/types";
import {Backdrop} from "./Backdrop";
import {ConfirmButton, RefreshButton} from "../Button";
import {GrowColumn} from "../Column";
import {FloatPlaceHolderInput} from "../Input";
import {Title} from "../Title";
import {GrowRow} from "../Row";
import {List} from "../List";

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
        setDirectoryTreeCache([
            {
                id: "0",
                name: "No drives found",
            }
        ]);
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

    function onConfirm() {
        // TODO Add new task API here
        //      Give the API with the source directory, target directory, matched extensions and files.
    }

    function onRefresh() {
        setIsLoaded(false);
    }

    let content = isLoaded
        ? (
            <>
                <div className="flex w-full h-full overflow-hidden">
                    <GrowColumn className="w-1/3">
                        <div className="text-center font-bold text-md mb-3">
                            Watch Folder
                        </div>
                        <TreeView
                            aria-label="file system navigator"
                            defaultCollapseIcon={<ExpandMoreIcon/>}
                            defaultExpandIcon={<ChevronRightIcon/>}
                            sx={{
                                width: '100%',
                                height: '100%',
                                'overflowY': 'auto',
                                'overflowX': 'auto'
                            }}
                        >
                            {renderTree(directoryTreeCache)}
                        </TreeView>
                    </GrowColumn>
                    <GrowColumn className="w-1/3 border-1 border-black">
                        <div className="text-center font-bold text-md mb-3">
                            Move To
                        </div>
                        <TreeView
                            aria-label="file system navigator"
                            defaultCollapseIcon={<ExpandMoreIcon/>}
                            defaultExpandIcon={<ChevronRightIcon/>}
                            sx={{
                                width: '100%',
                                height: '100%',
                                'overflowY': 'auto',
                                'overflowX': 'auto'
                            }}
                        >
                            {renderTree(directoryTreeCache)}
                        </TreeView>
                    </GrowColumn>
                    <GrowColumn className="w-1/3">
                        <GrowRow className="h-[47.5%] overflow-auto mb-[5%]">
                            <Title>
                                File Type
                                <FloatPlaceHolderInput
                                    placeholder={"E.g., .mp3;.jpg;.png"}/>
                            </Title>
                            <List data={new Set(['.mp3', '.pdf'])}/>
                        </GrowRow>
                        <GrowRow className="h-[47.5%] overflow-auto">
                            <Title>
                                File Name
                                <FloatPlaceHolderInput
                                    placeholder={"E.g., example.pdf;example;txt"}/>
                            </Title>
                            <List data={new Set(['example.mp3'])}/>
                        </GrowRow>
                    </GrowColumn>
                </div>
                <div className="flex justify-around w-full">
                    <ConfirmButton title="Confirm" onClick={onConfirm}/>
                    <RefreshButton title="Refresh" onClick={onRefresh}/>
                </div>
            </>
        )
        : <CircularProgress/>

    return (
        // h-[calc(90%+1.25rem)]: 1.25rem is the height of the gap-y-5.
        // We assure there will be one y gap, so we only need to add one 1.25rem.
        // Adding 1.25rem to the height to avoid content being overflow.
        <div
            className="fixed w-[90%] h-[calc(90%+1.25rem)]
            z-20 left-[5%] top-[calc(5%-1.25rem/2)]
            bg-white shadow-lg shadow-gray-300
            ring-[5px] ring-slate-50/70 rounded-lg
            flex justify-center items-center
            py-8 px-7 flex flex-col
            gap-y-5"
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