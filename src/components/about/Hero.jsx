
function Hero() {
    return (
        <>
            <div className="w-full min-h-[30rem] p-10 lg:p-20 flex flex-row justify-start items-center bg-white gap-5 bg-hero-about bg-cover bg-center bg-no-repeat border-y-8 border-primary">
                <div className="w-full lg:w-1/2 flex flex-col justify-center items-start gap-5">
                    <h1 className="w-full text-5xl lg:text-6xl text-secondary font-semibold text-left">
                        Effective Solutions for Provider
                        <span className="text-primary"> Credentialing</span>
                    </h1>
                    <h2 className="w-full text-xl text-left">
                        Minimize provider friction, streamline network management, and
                        optimize internal resources.
                    </h2>
                    <button className="px-4 py-3 bg-secondary text-white rounded-lg">
                        Log Into Your Account
                    </button>
                </div>
                <div className="w-1/2"></div>
            </div>
        </>
    )
}

export default Hero