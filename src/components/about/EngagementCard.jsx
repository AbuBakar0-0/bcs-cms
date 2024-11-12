
const EngagementCard = ({ title, description }) => {
    return (
        <>
            <div className="w-full lg:w-1/4 bg-secondary p-5 text-white">
                <p className="text-2xl">{title}</p>
                <div className="w-1/4 h-[4px] bg-primary my-2"></div>
                <p className="text-justify text-lg">{description}</p>
            </div>
        </>
    )
}

export default EngagementCard