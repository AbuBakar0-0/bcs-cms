import React from 'react'

const HeadingLine2=({title})=> {
    return (
        <div className="w-full">
            <p className="w-full text-lg">{title}</p>
            <div className="w-1/6 h-[2px] bg-primary"></div>
        </div>
    )
}

export default HeadingLine2