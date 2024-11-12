import { IoIosArrowForward } from "react-icons/io"

function Hero() {
    return (
        <>
            <div className="w-full min-h-[38rem] p-10 lg:p-20 flex flex-row justify-start items-center bg-white gap-5 bg-hero-credentialing bg-cover bg-center bg-no-repeat border-y-8 border-primary">
                <div className="w-full lg:w-1/2 flex flex-col justify-center items-start gap-5">
                    <h1 className="w-full text-5xl lg:text-6xl text-secondary font-semibold text-left">
                    Revolutionize Your Medical
                        <span className="text-primary"> Practice</span>
                    </h1>
                    <h2 className="w-full text-xl text-left">
                        Premium, innovative solutions for credentialing and career management, expertly designed for healthcare providers, organizations, and telemedicine solutions.
                    </h2>
                    <div className="w-full flex flex-col lg:flex-row justify-start items-start lg:items-center gap-5 ">
                        <button className="px-4 py-3 bg-secondary text-white rounded-lg flex flex-row justify-center items-center gap-5">
                            <span className="uppercase">I’M A Provider</span>
                            <div className="bg-primary rounded-full size-8 flex justify-center items-center text-white">
                                <IoIosArrowForward />
                            </div>
                        </button>
                        <button className="px-4 py-3 bg-secondary text-white rounded-lg flex flex-row justify-center items-center gap-5">
                            <span className="uppercase">I’M An Owner</span>
                            <div className="bg-primary rounded-full size-8 flex justify-center items-center text-white">
                                <IoIosArrowForward />
                            </div>
                        </button>
                    </div>
                </div>
                <div className="w-1/2 hidden lg:flex"></div>
            </div>
        </>
    )
}

export default Hero