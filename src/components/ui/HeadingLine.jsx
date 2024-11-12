import React from 'react'

const HeadingLine=({title})=> {
    return (
        <div className="w-full">
            <p className="w-full text-lg">{title}</p>
            <div className="w-full h-[2px] bg-primary"></div>
        </div>
    )
}

export default HeadingLine