import SoftwareCard from "./SoftwareCard"


function Software() {
    return (
        <>
            <div className="w-full flex flex-col justify-center items-center gap-5 mt-10">
                <span className="text-4xl font-semibold">
                    <span className="text-secondary mr-4">BCS-CMS</span>
                    Software
                </span>
                <div className="w-1/4 h-[4px] bg-primary my-2"></div>

                <div className="w-full flex flex-col lg:flex-row justify-around items-center gap-5">
                    <SoftwareCard bgImage={"bg-software1"} title={"Credentialing Basics"} number={"01"} p1={"Streamline credentialing processes"} p2={"Ensure compliance with industry standards"} p3={"Simplify provider verification"} />
                    <SoftwareCard bgImage={"bg-software2"} title={"Practitioner Data Pull"} number={"02"} p1={"Access accurate provider data quickly"} p2={"Reduce manual data entry errors"} p3={"Improve efficiency in data collection"} />
                    <SoftwareCard bgImage={"bg-software3"} title={"Privileging Module"} number={"03"} p1={"Manage provider privileges with ease"} p2={"Ensure correct access levels for each provider"} p3={"Reduce administrative overhead"} />
                </div>

                <div className="w-full flex flex-col lg:flex-row justify-evenly items-center -mt-10">
                    <SoftwareCard bgImage={"bg-software4"} title={"Insurance Enrollment"} number={"04"} p1={"Simplify enrollment with insurance payers"} p2={"Ensure smooth provider onboarding"} p3={"Minimize errors in payer contracts"} />
                    <SoftwareCard bgImage={"bg-software5"} title={"Credentialing Monitoring"} number={"05"} p1={"Track credentialing status in real-time"} p2={"Prevent lapses in provider certifications"} p3={"Improve workflow efficiency with tracking tools"} />
                </div>
            </div>
        </>
    )
}

export default Software