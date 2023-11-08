import React, {useState, useEffect} from "react";
import '../index.css'

function AddRecord() {
    return (
        <>
            <div className="flex justify-between items-center p-6 border-b">
                <h1 className="text-black font-bold font-Monsterrat text-3xl uppercase">Add Record</h1>
            </div>

            <div className="p-4">
                <div className="flex flex-col lg:flex-row justify-between bg-white px-8 flex-wrap">
                    <div className="flex flex-row gap-x-16 justify-between flex-wrap">
                        <div className="my-5 flex flex-col">
                            <label className='mb-3'>Last Name</label>
                            <input
                                className=" pl-3 rounded-lg border-2 border-custom-blue h-12 w-96"
                                type="text"
                            />
                        </div>
                        <div className="my-5 flex flex-col">
                            <label className='mb-3'> First Name</label>
                            <input
                                className="pl-3 rounded-lg border-2 border-custom-blue h-12 w-96"
                                type="text"
                            />
                        </div>
                        <div className="my-5 flex flex-col">
                            <label className='mb-3'>Middle Name</label>
                            <input
                                className="pl-3 rounded-lg border-2 border-custom-blue h-12 w-96"
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="flex flex-row gap-x-16 flex-wrap">
                        <div className="my-5 flex flex-col mr-56">
                            <label className='mb-3'>BirthDate</label>
                            <input
                                className="px-3 rounded-lg border-2 border-custom-blue h-12 w-40"
                                type="date"
                            />
                        </div>
                        <div className="my-5 flex flex-col">
                            <label className='mb-3'>Age</label>
                            <input
                                className="pl-3 rounded-lg border-2 border-custom-blue h-12 w-20"
                                type="number"
                            />
                        </div>
                        <div className="my-5 flex flex-col">
                            <label className='mb-3'>Sex</label>
                            <select id="countries" className="border-2 border-custom-blue w-60 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                <option selected>Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-row gap-x-16 justify-between flex-wrap">
                        <div className="my-5 flex flex-col">
                            <label className='mb-3'>Address</label>
                            <input
                                className="pl-3 rounded-lg border-2 border-custom-blue h-12 w-216"
                                type="text"
                            />
                        </div>
                        <div className="my-5 flex flex-col">
                            <label className='mb-3'>City</label>
                            <input
                                className="pl-3 rounded-lg border-2 border-custom-blue h-12 w-96"
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="flex flex-row gap-x-16 flex-wrap">
                        <div className="my-5 flex flex-col">
                            <label className='mb-3'>Contact Number</label>
                            <input
                                className="pl-3 rounded-lg border-2 border-custom-blue h-12 w-96"
                                type="text"
                            />
                        </div>
                        <div className="my-5 flex flex-col mb-16">
                            <label className='mb-3'>Email</label>
                            <input
                                className="pl-3 rounded-lg border-2 border-custom-blue h-12 w-96"
                                type="text"
                            />
                        </div>
                    </div>
                    <div className='flex w-full justify-center mb-10'>
                        <button className="rounded-lg border-2 h-12 w-60 text-2xl bg-custom-green hover:bg-green-600 text-white">
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddRecord