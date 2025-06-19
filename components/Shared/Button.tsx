

export function Button({children, className, ...props}:ButtonProps){
    return(
        <button className={`${className} p-2 cursor-pointer`} {...props}>
            {children}
        </button>
    )
}