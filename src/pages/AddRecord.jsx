import React, {useState, useEffect} from "react";
import '../index.css'

function AddRecord() {
    return (
        <>
            <div className="flex justify-between items-center pt-8 pb-4 px-12 border-b">
                <h1 className="text-black font-bold font-Monsterrat text-3xl uppercase">Add Record</h1>
            </div>

            <div className="grid grid-cols-6 flex-col justify-between gap-x-6 gap-y-10 py-8 px-12 mb-8">
                    <div className="flex flex-col col-span-2 font-Karla text-lg">
                        <label className='mb-3'>Last Name</label>
                        <input
                            className="px-3 rounded-lg border-2 border-custom-blue h-12"
                            type="text"
                        />
                    </div>
                    <div className="flex flex-col col-span-2 font-Karla text-lg">
                        <label className='mb-3'> First Name</label>
                        <input
                            className="px-3 rounded-lg border-2 border-custom-blue h-12"
                            type="text"
                        />
                    </div>
                    <div className="flex flex-col col-span-2 font-Karla text-lg">
                        <label className='mb-3'>Middle Name</label>
                        <input
                            className="px-3 rounded-lg border-2 border-custom-blue h-12"
                            type="text"
                        />
                    </div>
                    <div className="flex flex-col col-span-2 font-Karla text-lg">
                        <label className='mb-3'>Birthdate</label>
                        <input
                            className="px-3 rounded-lg border-2 border-custom-blue h-12"
                            type="date"
                        />
                    </div>
                    <div className="flex flex-col col-span-2 font-Karla text-lg">
                        <label className='mb-3'>Age</label>
                        <input
                            className="px-3 rounded-lg border-2 border-custom-blue h-12"
                            type="number"
                            min="0"
                        />
                    </div>
                    <div className="flex flex-col col-span-2 font-Karla text-lg">
                        <label className='mb-3'>Sex</label>
                        <select className="px-3 rounded-lg border-2 border-custom-blue h-12">
                            <option selected>Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className="flex flex-col col-span-4 font-Karla text-lg">
                        <label className='mb-3'>Address</label>
                        <input
                            className="px-3 rounded-lg border-2 border-custom-blue h-12"
                            type="text"
                        />
                    </div>
                    <div className="flex flex-col col-span-2 font-Karla text-lg">
                        <label className='mb-3'>City</label>
                        <input
                            className="px-3 rounded-lg border-2 border-custom-blue h-12"
                            type="text"
                        />
                    </div>
                    <div className="flex flex-col col-span-2 font-Karla text-lg">
                        <label className='mb-3'>Contact Number</label>
                        <input
                            className="px-3 rounded-lg border-2 border-custom-blue h-12"
                            type="text"
                        />
                    </div>
                    <div className="flex flex-col col-span-2 font-Karla text-lg">
                        <label className='mb-3'>Email</label>
                        <input
                            className="px-3 rounded-lg border-2 border-custom-blue h-12"
                            type="text"
                        />
                    </div>
                    <button className="rounded-lg border-2 h-12 w-40 font-bold font-Karla text-2xl bg-custom-green hover:bg-green-600 text-white col-span-2 place-self-end">
                            Submit
                    </button>
            </div>
        </>
    );
}

export default AddRecord