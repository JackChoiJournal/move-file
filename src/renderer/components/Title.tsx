import React from "react";

export function Title({children}: { children: React.ReactNode }) {
    return (
        <div className="text-center font-bold text-md sticky top-0 bg-white">
            {children}
        </div>
    )
}