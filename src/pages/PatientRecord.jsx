import React, {useState, useEffect} from "react";
import '../index.css'
import Contents from "../components/contents.jsx";

function PatientRecord() {
    return (
        <>
            <div className="flex justify-between items-center px-12 py-6 border-b bg-custom-blue">
                <h1 className=" text-white font-bold font-Monsterrat text-3xl uppercase">PASCO, JERICHO</h1>
                <button className=" text-rose-500 text-xl underline font-Karla p-4">Delete</button>
            </div>

            <div className="w-full flex-col justify-center px-10 py-8 border-2">
                <div className="flex-col w-full border-2 rounded-lg">
                    <h1 className="text-black font-bold font-Monsterrat text-xl uppercase w-full p-4 border-b">Personal Information</h1>
                    <div className="grid grid-cols-6">
                            <div className="p-4">
                                <div className="font-bold text-black text-base mb-4 font-Karla">First Name</div>
                                <div className="text-lg font-Karla">JERICHO</div>
                            </div>
                            <div className="p-4">
                                <div className="font-bold text-black text-base mb-4 font-Karla">Last Name</div>
                                <div className="text-lg font-Karla">PASCO</div>
                            </div>
                            <div className="p-4">
                                <div className="font-bold text-black text-base mb-4 font-Karla">Middle Name</div>
                                <div className="text-lg font-Karla]">CLAM</div>
                            </div>
                            <div className="p-4">
                                <div className="font-bold text-black text-base mb-4 font-Karla">Birthday</div>
                                <div className="text-lg font-Karla">12/31/2000</div>
                            </div>
                            <div className="p-4">
                                <div className="font-bold text-black text-base mb-4 font-Karla">Age</div>
                                <div className="text-lg font-Karla">22</div>
                            </div>
                            <div className="p-4">
                                <div className="font-bold text-black text-base mb-4 font-Karla">Sex</div>
                                <div className="text-lg font-Karla">MALE</div>
                            </div>
                            <div className="p-4 col-span-2">
                                <div className="font-bold text-black text-base mb-4 font-Karla">Address</div>
                                <div className="text-lg font-Karla">DUNGGUAN, BARANGAY BASAK</div>
                            </div>
                            <div className="p-4">
                                <div className="font-bold text-black text-base mb-4 font-Karla">City</div>
                                <div className="text-lg font-Karla">CEBU</div>
                            </div>
                            <div className="p-4">
                                <div className="font-bold text-black text-base mb-4 font-Karla">CONTACT NUMBER</div>
                                <div className="text-lg font-Karla]">097612345678</div>
                            </div>
                            <div className="p-4">
                                <div className="font-bold text-black text-base mb-4 font-Karla ">EMAIL</div>
                                <div className="text-lg font-Karla">jericho@gmail.com</div>
                            </div>
                        </div>
                </div>
            </div>
        </>
    );
}

export default PatientRecord