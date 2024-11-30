import { IoIosArrowForward } from "react-icons/io"


function WhyChoose() {
    return (
        <>
            <div className="w-full flex flex-col justify-center items-center gap-5 mt-10">
                <span className="text-2xl lg:text-4xl font-semibold text-center">
                    Why Choose
                    <span className="text-secondary ml-4">BCS-CMS</span>
                </span>
                <div className="w-1/4 h-[4px] bg-primary my-2"></div>

                <div className="container mx-auto flex flex-col lg:flex-row justify-center items-center gap-5">
                    <div className="w-full lg:w-1/2 flex flex-col justify-center items-start gap-5 lg:p-10">
                        <p className="text-justify text-xl leading-10">
                            <strong>BCS-CMS</strong> allows provider management streamlined
                            processes of credentialing. In one easy, efficient, and reliable
                            place, it delivers accurate provider information, renewal timing,
                            and payer enrollment with automation, all on a simplified
                            workflow. To deliver quality care as the key value we have a
                            purpose of cutting out as much administrative workload as we
                            possibly can and boost compliance levels in healthcare
                            institutions.
                        </p>
                        <div className="border-2 border-secondary rounded-full px-4 py-3 flex flex-row justify-center items-center gap-4 text-primary text-xl">
                            <span>Let's Talk</span>
                            <div className="bg-primary rounded-full size-8 flex justify-center items-center text-white">
                                <IoIosArrowForward />
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 flex flex-col justify-center items-center gap-5">
                        <img src="/assets/about/about.png" alt="About us" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default WhyChoose