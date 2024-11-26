"use client";

const OrganizationCard = () => {


    return (
        <div className="w-full flex flex-col bg-secondary rounded-lg gap-4 p-4 text-white">
            <div className="w-full flex flex-row justify-between items-center gap-4">
                <div className="w-1/3 flex flex-col justify-start items-start gap-2">
                    <h2 className="text-lg font-semibold text-left">
                        Community Health Network	<br />CHN
                    </h2>
                    <p className="text-sm">
                    211D00000X
                    </p>
                    
                </div>
                
                <div className="w-1/3 flex flex-col justify-start items-start gap-2">
                    <p>Address:30 N GOULD, ST, STE R</p>
                    <p>Taxonomy Code: 331LOOOOOX : Blood Bank</p>
                    <p>State : WH</p>
                    <p>Zip Code: 23345-9987 </p>
                    <p>Email: chn@gmail.com</p>
                </div>

            </div>
        </div>
    );
};

export default OrganizationCard;
