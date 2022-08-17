interface TColumnProps {
    children: React.ReactNode;
    className?: string;
}

export function Column({children, className}: TColumnProps) {
    return (
        <div className={`my-12 min-w-[300px] flex flex-col ${className ? className : ''}`}>{children}</div>
    )
}

export function GrowColumn({children, className}: TColumnProps) {
    return (
        <div className={`grow ${className ? className : ''}`}>{children}</div>
    )
}