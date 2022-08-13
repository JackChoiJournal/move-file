import './App.css';
import {useContext, useState} from "react";
import "tailwindcss/tailwind.css";
import {CardList} from "./components/CardList";
import {Column} from "./components/Column";
import {TasksContext, TasksProvider} from "./contexts/TasksContext";
import {PlusSmIcon as PlusSmIconOutline} from '@heroicons/react/outline'
import {DirectoryListBackdropModal} from "./components/modals/Modal";

const Home = () => {
    let tasksCtx = useContext(TasksContext);

    let [isDirectoryListBackdropModalActive, setDirectoryListBackdropModalActive] = useState(false);

    const getTaskSources = function (): string[] {
        return tasksCtx.tasks.map(task => task.source);
    }

    const getCurrentTaskExtensions = function (): string[] {
        let extension: string[] = [];

        tasksCtx.tasks.map(task => {
            if (task.source === tasksCtx.currentSource && task.extension instanceof Array) {
                extension.push(...task.extension);
            }

        });

        return extension;
    }

    const getCurrentTaskFiles = function (): string[] {
        let files: string[] = [];

        tasksCtx.tasks.map(task => {
            if (task.source === tasksCtx.currentSource && task.files instanceof Array) {
                files.push(...task.files);
            }

        });

        return files;
    }

    const getCurrentTaskDestination = function (): string {
        for (let task of tasksCtx.tasks) {
            if (task.source === tasksCtx.currentSource) {
                return task.destination;
            }
        }

        return "";
    }

    const onShowDirectoryListBackdropModalClick = async function (): Promise<void> {
        setDirectoryListBackdropModalActive(true);
    };

    const onHideDirectoryListBackdropModalClick = async function (): Promise<void> {
        setDirectoryListBackdropModalActive(false);
    };

    return (
        <div
            className="flex flex-row justify-center content-center space-x-6 h-screen">
            {isDirectoryListBackdropModalActive
                ? <DirectoryListBackdropModal
                    onClose={onHideDirectoryListBackdropModalClick}
                />
                : null}
            <Column>
                <CardList
                    items={getTaskSources()}
                    title={"Watch Folder"}
                />
                <button
                    type="button"
                    className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 active:ring-2 active:ring-offset-2 active:ring-indigo-500 self-center mt-2"
                    onClick={onShowDirectoryListBackdropModalClick}
                >
                    <PlusSmIconOutline className="h-6 w-6" aria-hidden="true"/>
                </button>
            </Column>

            <Column>
                <CardList
                    items={getCurrentTaskExtensions()}
                    title={"File Type"}
                />
                <CardList
                    items={getCurrentTaskFiles()}
                    title={"File Name"}
                />
            </Column>

            <Column>
                <CardList
                    items={getCurrentTaskDestination() !== ""
                        ? [getCurrentTaskDestination()]
                        : []}
                    title={"Move To"}
                />
            </Column>
        </div>
    );
};

export default function App() {
    return (
        <TasksProvider>
            <Home/>
        </TasksProvider>
    );
}
