import EngagementCard from "./EngagementCard"

function Engagement() {
    return (
        <>
            <div className="w-full flex flex-col justify-center items-center gap-5 mt-10">
                <span className="text-2xl lg:text-4xl font-semibold text-center">
                    Enhance
                    <span className="text-secondary mx-4">Provider</span>
                    Engagement and Improve Data Quality
                </span>
                <div className="w-1/4 h-[4px] bg-primary my-2"></div>
                <div className="w-full flex flex-wrap justify-evenly items-center gap-4">
                    <EngagementCard
                        title={"Streamlined Credentialing"}
                        description={
                            "Providers and group administrators enter data once and it is shared with all plans they designate."
                        }
                    />
                    <EngagementCard
                        title={"Improved Verification"}
                        description={
                            "Manual processes are automated, simplified, and enhanced for increased efficiency, accuracy, and performance."
                        }
                    />
                    <EngagementCard
                        title={"Ongoing Monitoring"}
                        description={
                            "Sanctioned providers are flagged daily, improving network management and regulatory compliance."
                        }
                    />
                </div>
            </div>
        </>
    )
}

export default Engagement