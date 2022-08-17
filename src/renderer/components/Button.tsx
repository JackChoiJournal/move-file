import {PlusIcon, RefreshIcon} from "@heroicons/react/solid";

export function Button({
                    title,
                    icon,
                    className,
                    onClick,
                }: { title: string, icon: JSX.Element | null, className: string, onClick: () => void }) {
    return (
        <button type="button" className={className} onClick={onClick}>
            {title}
            {icon ? icon : null}
        </button>
    )
}

export function ConfirmButton({
                               title,
                               onClick,
                           }: { title: string,  onClick: () => void }) {
    return (
        <Button
            title={title}
            icon={<PlusIcon className="ml-0.5 h-4 w-4"/>}
            onClick={onClick}
            className="inline-flex items-center
                px-3 py-2 border border-transparent
                text-sm leading-4 font-medium
                rounded-md shadow-sm text-white bg-blue-600
                hover:bg-blue-700
                active:ring-2 active:ring-blue-500"
        />
    )
}

export function RefreshButton({
                               title,
                               onClick,
                           }: { title: string,  onClick: () => void }) {
    return (
        <Button
            title={title}
            icon={<RefreshIcon className="ml-0.5 h-4 w-4"/>}
            onClick={onClick}
            className="inline-flex items-center
                px-3 py-2 border border-transparent
                text-sm leading-4 font-medium
                rounded-md shadow-sm text-white bg-yellow-600
                hover:bg-yellow-700
                active:ring-2 active:ring-yellow-500"
        />
    )
}