
const SoftwareCard=({number,bgImage,title,p1,p2,p3})=> {
    return (
        <>
            <div className={`w-full lg:w-1/4 h-[45rem]  ${bgImage} bg-contain bg-no-repeat bg-right p-10 flex flex-col justify-center items-center`}>
                <div className="flex flex-row justify-center items-center mt-8">
                    <div className="size-20 flex flex-col justify-center items-center bg-primary border-4 border-secondary rounded-full z-10">
                        <span className="text-white font-semibold text-4xl">{number}</span>
                    </div>
                    <div className="w-full h-16 flex flex-col justify-center items-center bg-primary rounded-full -ml-16 z-0 pl-16 pr-5">
                        <span className="text-white font-semibold text-lg">
                            {title}
                        </span>
                    </div>
                </div>
                <div className="px-10">
                    <ul className="list-disc text-xl">
                        <li>{p1}</li>
                        <li>{p2}</li>
                        <li>{p3}</li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default SoftwareCard