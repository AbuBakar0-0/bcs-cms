

function GetInTouch() {
    return (
        <>
            <div className="w-full min-h-[65vh] p-10 lg:p-20 flex flex-row justify-end items-center gap-5 bg-about-2 bg-cover lg:bg-center bg-no-repeat border-y-8 border-primary bg-opacity-55">
                <div className="w-1/2 hidden lg:flex"></div>
                <div className="w-full lg:w-1/3 flex flex-col justify-end items-end gap-5">
                    <h1 className="w-full text-6xl text-secondary font-semibold text-right">
                        Get in touch
                    </h1>
                    <div className="w-1/4 h-[4px] bg-primary my-2"></div>
                    <h2 className="w-full text-3xl text-right uppercase text-white lg:text-black ">
                        Discover how <span className="text-primary">BCS-CMS</span> can
                        revolutionize your approach to streamlining credentialing and
                        connecting providers.
                    </h2>
                    <div className="border-2 border-secondary rounded-full px-4 py-3 flex flex-row justify-center items-center gap-4 text-primary text-xl">
                        <span>Request A Demo</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GetInTouch