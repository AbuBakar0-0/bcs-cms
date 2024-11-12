import CounterCard from "./CounterCard";
function Counter() {

    const counterData = [
        // {
        //   title: "Provider records across 757 specialties",
        //   number: 4.8,
        // },
        // {
        //   title: "Providers verified their data within the past 120 days",
        //   number: 1.4,
        // },
        // {
        //   title: "Of all US physicians participating",
        //   number: 73,
        // },
        // {
        //   title: "Participating dentists",
        //   number: 101,
        // },
        {
          title:"Covers a broad range of medical specialties.",
        },
        {
          title:"Easy, quick data verification for accurate provider information.",
        },
        {
          title:"Secure, centralized platform for credential management.",
        },
        {
          title:"Ensures compliance with healthcare industry standards",
        },
      ];

    return (
        <>
            <div className="w-full flex flex-col justify-center items-center gap-5 mt-10">
                <span className="text-3xl lg:text-4xl font-semibold text-center capitalize">
                    Trusted by thousands of providers and healthcare organizations
                    <span className="text-secondary ml-4">Nationwide</span>
                </span>
                <div className="w-1/4 h-[4px] bg-primary my-2"></div>
                <div className="bg-secondary flex flex-wrap justify-around items-center rounded-2xl border-4 w-full p-10 shadow-3xl gap-5">
                    {counterData.map((item, index) => (
                      <div className="w-full md:w-1/5 flex flex-row justify-center md:justify-center items-center gap-4 text-white text-center text-xl" key={index}>
                        {item.title}
                      </div>
                        // <CounterCard
                        //     key={index}
                        //     title={item.title}
                        //     number={item.number}
                        // />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Counter