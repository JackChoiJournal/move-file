import {createContext, useEffect, useState} from "react";
import {TTask} from "../../@types/types";

interface ITasksContextInterface {
    tasks: TTask[];
    currentSource: string;
    setCurrentSource: (source: string) => void;
}

type TTasksProviderProps = {
    children: React.ReactNode;
}

export const TasksContext = createContext<ITasksContextInterface>({
    tasks: [],
    currentSource: "",
    // @ts-ignore
    setCurrentSource: (source)=>{}
});


export function TasksProvider({children}: TTasksProviderProps) {
    let [tasks, setTasks] = useState<TTask[]>([]);
    let [currentSource, setCurrentSource] = useState<string>("");

    useEffect(() => {
        window.api.getTasks().then(tasks => {
            setTasks(tasks);
        });
    }, []);

    let tasksContext: ITasksContextInterface = {
        tasks: tasks,
        currentSource: currentSource,
        setCurrentSource: setCurrentSource
    }

    return (
        <TasksContext.Provider value={tasksContext}>
            {children}
        </TasksContext.Provider>
    )
}