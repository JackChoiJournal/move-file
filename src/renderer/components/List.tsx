export function List({data}: { data: Set<string> }) {
    return (
        <ul role="list" className="divide-y divide-gray-200">
            {Array.from(data).map((item: string, index: number) => (
                <li key={item ? item : index} className="py-4 flex hover:bg-[#F5F5F5]">
                    <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{item}</p>
                    </div>
                </li>
            ))}
        </ul>
    )
}