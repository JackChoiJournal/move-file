type TColumnProps = {
    children: React.ReactNode,
}

export function Column({children}: TColumnProps) {
    return (
        <div className="my-12 min-w-[300px] flex flex-col">{children}</div>
    )
}