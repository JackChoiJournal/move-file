export function Backdrop({onClick}: {onClick: () => void}) {
    return <div className="fixed w-screen h-screen inset-0 z-10 bg-black opacity-50 blur-md backdrop-blur-sm" onClick={onClick} />;
}