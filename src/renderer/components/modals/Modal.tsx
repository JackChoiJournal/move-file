import {TreeItem, TreeView} from "@mui/lab";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import React from "react";
import {createPortal} from "react-dom";
import {Backdrop} from "./Backdrop";

interface RenderTree {
    id: string;
    name: string;
    children?: readonly RenderTree[];
}

export function DirectoryListModal() {
    function renderTree(tree: RenderTree[]) {
        return tree.map(({id, name, children}) => (
            <TreeItem key={id} nodeId={id} label={name}>
                {
                    children
                    ? children.map(child => renderTree([child]))
                    : null
                }
            </TreeItem>
        ));
    }

    let data: RenderTree[] = [
    ]

    return (
        <div
            className="fixed w-[50%] h-[50%]
            z-20 left-[25%] top-[25%]
            bg-white shadow-lg shadow-gray-300
            ring-[5px] ring-slate-50/70 rounded-lg
            flex justify-center items-center
            p-10"
        >
            <TreeView
                aria-label="file system navigator"
                defaultCollapseIcon={<ExpandMoreIcon/>}
                defaultExpandIcon={<ChevronRightIcon/>}
                sx={{width: '100%', height: '100%'}}
                onNodeSelect={(_: React.SyntheticEvent, nodeId:string|string[]) => {
                    // TODO Record selected node, source path
                }}
            >
                {renderTree(data)}
            </TreeView>
        </div>
    )
}

export function DirectoryListBackdropModal({onClose}: {onClose: () => void}) {
    return (
     <>
         {createPortal(<Backdrop onClick={onClose}/>, document.querySelector('#backdrop') as Element)}
         {createPortal(<DirectoryListModal />, document.querySelector('#modal') as Element)}
     </>
    )
}