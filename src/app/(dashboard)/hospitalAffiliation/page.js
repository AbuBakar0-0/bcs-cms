import HeadingLine from "@/components/ui/HeadingLine"
import { CiEdit } from "react-icons/ci"
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoAddCircleOutline } from "react-icons/io5"
import { MdDeleteOutline } from 'react-icons/md';


function HospitalAffiliations() {
    return (
        <>
            <div className='w-full flex flex-col justify-center items-center gap-4'>
                {/* Hospital Affiliations */}
                <HeadingLine title={"Hospital Affiliations"} />
                <p className='w-full'><span className='text-red-400'>*</span>Required all fields are marked with red asterik</p>

                {/* Admitting Privilages */}
                <div className='w-full flex flex-row justify-between items-center'>
                    <p className="w-full text-lg">Admitting Privilages</p>
                    <button className='w-52 bg-secondary px-4 py-3 rounded-lg text-white flex flex-row justify-center items-center gap-4'>
                        <IoAddCircleOutline className='size-6' />
                        <p>Add</p>
                    </button>
                </div>
                <div className='w-full flex flex-col justify-center items-center gap-4'>
                    <div className='w-full h-40 shadow-xl rounded-lg border-l-8 border-secondary flex flex-row justify-between items-center gap-4 p-10'>
                        <p>HCA Houston North Cypress</p>
                        <div className='flex flex-col justify-center items-start'>
                            <p className='text-green-400'>Active</p>
                            <p>Cypress, TX</p>
                        </div>
                        <div className='flex flex-col justify-center items-center gap-4'>
                            <button className='w-40 bg-secondary px-4 py-3 rounded-lg text-white flex flex-row justify-center items-center gap-4'>
                                <CiEdit className='size-6' />
                                <p>Edit</p>
                            </button>
                            <button className='w-40 bg-gray-400 px-4 py-3 rounded-lg text-white flex flex-row justify-center items-center gap-4'>
                                <MdDeleteOutline className='size-6' />
                                <p>Delete</p>
                            </button>

                        </div>
                    </div>

                </div>
                <div className="w-full h-[2px] bg-primary mt-10"></div>

                {/* Admitting Arrangements */}
                <div className='w-full flex flex-row justify-between items-center mt-10'>
                    <p className="w-full text-lg">Admitting Arrangements</p>
                    <button className='w-52 bg-secondary px-4 py-3 rounded-lg text-white flex flex-row justify-center items-center gap-4'>
                        <IoMdAddCircleOutline className='size-6' />
                        <p>Add</p>
                    </button>
                </div>
               

                <div className="w-full h-[2px] bg-primary mt-10"></div>

                {/* Non Admitting Affiliations */}
                <div className='w-full flex flex-row justify-between items-center mt-10'>
                    <p className="w-full text-lg">Non Admitting Affiliations</p>
                    <button className='w-52 bg-secondary px-4 py-3 rounded-lg text-white flex flex-row justify-center items-center gap-4'>
                        <IoAddCircleOutline className='size-6' />
                        <p>Add</p>
                    </button>
                </div>
               

                <div className="w-full h-[2px] bg-primary mt-10"></div>
                
                <div className='w-full flex flex-row justify-around items-center gap-4'>
                    <div className='w-1/4 flex flex-row justify-center items-center gap-4 px-4 py-3 bg-secondary rounded-lg text-white'>
                        <FaArrowCircleLeft />
                        <span> Save & Go Back</span>
                    </div>
                    <div className='w-1/4 flex flex-row justify-center items-center gap-4 px-4 py-3 bg-secondary rounded-lg text-white'>
                        <span>Save</span>
                    </div>

                    <div className='w-1/4 flex flex-row justify-center items-center gap-4 px-4 py-3 bg-secondary rounded-lg text-white'>
                        <span>Save & Continue</span>
                        <FaArrowCircleRight/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HospitalAffiliations