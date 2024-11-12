import FeaturesCard from "./FeaturesCard"

function ImportantFeatures() {
    return (
        <>
            <div className="w-full flex flex-col justify-center items-center gap-5 mt-10">
                <span className="text-4xl font-semibold text-center">
                    <span className="text-secondary mr-4">BCS-CMS</span>
                    Important Features
                </span>
                <div className="w-1/4 h-[4px] bg-primary my-2"></div>
                <div className="w-full flex flex-wrap justify-between items-center gap-5 px-10">
                    <FeaturesCard
                        icon={"./assets/home/CENTRALIZED PLATFORM 1.svg"}
                        title={"Centralized Platform"}
                        description={
                            "Securely store provider data digitally with reduced paperwork overhead."
                        }
                    />
                    <FeaturesCard
                        icon={"./assets/home/CME TRACKING 1.svg"}
                        title={"CME Tracking"}
                        description={
                            "CME tracking of the educational development of providers."
                        }
                    />
                    <FeaturesCard
                        icon={"./assets/home/WORKFLOW TRACKING 1.svg"}
                        title={"Workflow Tracking"}
                        description={
                            "Monitor and manage processes like payor enrollment, license renewals, and recredentialing."
                        }
                    />

                    <FeaturesCard
                        icon={"assets/home/COMPLIANCE 1.svg"}
                        title={"Compliance"}
                        description={"Real-time reporting and alerts for expirables"}
                    />
                    <FeaturesCard
                        icon={"assets/home/REPORTING 1.svg"}
                        title={"Reporting"}
                        description={"Access customized reports tailored to your needs"}
                    />
                    <FeaturesCard
                        icon={"assets/home/SANCTIONS MONITORING 1.svg"}
                        title={"Sanctions Monitoring"}
                        description={
                            "Ensure compliance by continuously monitoring providers across 500 sources."
                        }
                    />
                </div>
            </div>
        </>
    )
}

export default ImportantFeatures