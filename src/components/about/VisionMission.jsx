import React from 'react'

function VisionMission() {
    return (
        <>
            <div className="w-full flex flex-col lg:flex-row justify-center items-center mt-10">
                <div className="w-1/2 flex flex-col lg:flex-row justify-end items-center lg:-mr-8 z-10">
                    <div className="size-96 bg-primary bg-opacity-85 border-2 border-secondary rounded-full flex flex-col justify-center items-center text-white">
                        <p className="text-4xl">Our Vision</p>
                        <div className="w-1/4 h-[4px] bg-secondary my-2"></div>
                        <p className="px-10 text-center text-xl">
                            To streamline healthcare credentialing with a secure,
                            user-friendly platform that speeds up approvals, promotes
                            compliance, and prioritizes patient care efficiency.
                        </p>
                    </div>
                </div>
                <div className="w-1/2 flex flex-col lg:flex-row justify-start items-center z-0">
                    <div className="size-96 bg-primary bg-opacity-85 border-2 border-secondary rounded-full flex flex-col justify-center items-center text-white">
                        <p className="text-4xl">Our Mission</p>
                        <div className="w-1/4 h-[4px] bg-secondary my-2"></div>
                        <p className="px-10 text-center text-xl">
                            To become the leading digital solution for credentialing, creating a compliant, accessible, and efficient healthcare ecosystem for all providers.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VisionMission