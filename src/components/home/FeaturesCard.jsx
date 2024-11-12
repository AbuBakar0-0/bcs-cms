
const FeaturesCard = ({ icon, title, description }) => {
    return (
        <>
            <div className="w-full lg:w-1/4 flex flex-col justify-center items-center gap-3">
                <div className="size-20 bg-secondary text-white flex flex-col justify-center items-center rounded-full p-5">
                    <img src={icon} alt={title} />
                </div>
                <span className="text-3xl text-center w-full font-semibold">{title}</span>
                <div className="w-1/4 h-[4px] bg-primary my-2"></div>
                <p className="text-xl text-center">{description}</p>
            </div>
        </>
    )
}

export default FeaturesCard