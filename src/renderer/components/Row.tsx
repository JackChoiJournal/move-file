export function GrowRow({className, children}: { className?: string, children: React.ReactNode }) {
    return (
        <div className={`grow ${className ? className : ''}`}>{children}</div>
    )
}