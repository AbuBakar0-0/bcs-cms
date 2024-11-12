

function Hero() {
    return (
        <>
            <div className="w-full min-h-[80vh] p-10 lg:p-20 flex flex-row justify-start items-center bg-white gap-5 bg-hero-home bg-cover bg-center bg-no-repeat border-y-8 border-primary">
                <div className="w-full lg:w-1/2 flex flex-col justify-center items-start gap-5">
                    <h1 className="w-full text-5xl lg:text-7xl text-secondary font-semibold text-left">
                        Simplify Your
                        <span className="mx-4 text-primary">Credentialing</span><br />
                        Workflow
                    </h1>
                    <h2 className="w-full text-2xl lg:text-3xl font-semibold text-primary text-left">
                        For Your Entire Team. All In One Solution
                    </h2>
                    <button className="px-4 py-3 bg-secondary text-white rounded-lg">
                        Explore Further
                    </button>
                </div>
                <div className="w-1/2"></div>
            </div>
        </>
    )
}

export default Hero