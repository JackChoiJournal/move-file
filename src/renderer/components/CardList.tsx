import {useContext, useEffect, useState} from "react";
import {TasksContext} from "../contexts/TasksContext";

type TListItemProps = {
    item: string;
}

type TCardListProps = {
    items: string[];
    title: string;
};

export function ListItem({item}: TListItemProps) {
    let [isActive, setIsActive] = useState<boolean>(false);
    let tasksCtx = useContext(TasksContext);

    useEffect(()=>{
        if(item === tasksCtx.currentSource){
            setIsActive(true);
        }else{
            setIsActive(false);
        }
    }, [tasksCtx.currentSource]);

    const onClick = () => {
        for (let task of tasksCtx.tasks) {
            if (task.source === item) {
                tasksCtx.setCurrentSource(item);
            }
        }
    }

    return (
        <div
            onClick={onClick}
            className={`px-6 py-4 whitespace-pre-line hover:bg-gray-600 hover:text-gray-200 ${isActive ? "bg-gray-400" : ""}`}
        >
            {item}
        </div>
    )
}

export function CardList({items, title}: TCardListProps) {
    return (
        <>
            <h6 className="text-4xl text-center mb-3">{title}</h6>
            <div
                className="flex-1 border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200 bottom-1">
                <div className="bg-white shadow overflow-hidden rounded-md">
                    <div className="divide-y divide-gray-200">
                        {items.map((item) => (
                            <ListItem key={item.toString()} item={item}/>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}