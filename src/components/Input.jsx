import React, { useId } from 'react'

const Input = ({
    classname = "",
    type = "text",
    label,
    ...props

}, ref) => {

    const id = useId();

    return (
        <div>
            {label && <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >{label}</label>}
            <input
                label={label}
                type={type}
                {...props}
                id={id}
                ref={ref}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
        </div>
    )
}

export default React.forwardRef(Input);