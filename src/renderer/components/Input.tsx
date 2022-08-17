export function FloatPlaceHolderInput({placeholder}: { placeholder: string }) {
    return (
        <div className="relative mb-[1rem] -z-10">
            <input
                type="text"
                name="file-type"
                id="file-type"
                className="peer text-base h-10 shadow-sm block w-full border-gray-500 border-b-2 pl-2 outline-0 placeholder-transparent"
                placeholder={placeholder ? placeholder : ""}
            />
            <label
                htmlFor="file-type"
                className="absolute pl-2 text-base text-black font-bold transition-all block w-full
                           peer-placeholder-shown:hover:cursor-text text-left
                           peer-placeholder-shown:text-gray-400 peer-placeholder-shown:-mt-8
                           peer-placeholder-shown:font-thin peer-placeholder-shown:text-left"
            >
                {placeholder ? placeholder : ""}
            </label>
        </div>
    )
}