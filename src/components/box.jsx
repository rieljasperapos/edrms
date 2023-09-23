import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import DumpDatas from '../data'

const itemsPerPage = 8;
const yourData = DumpDatas;

function Box({ children }) {
    const [currentPage, setCurrentPage] = useState(0);

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedData = yourData.slice(startIndex, endIndex);

    return (
        <>
            <div className="bg-white bg-opacity-80 shadow-2xl h-24 w-full ml-64">
                <div className="flex items-center text-2xl font-bold h-full uppercase ml-4">
                    <h1>Patient Records</h1>
                </div>

                <div className="justify-center bg-white h-screen w-full p-8">
                    <div className='mt-4 flex justify-between'>
                        <div>
                            <p>Search</p>
                            <input className='border rounded-lg h-8'></input>
                        </div>
                        <div>
                            <button className="bg-green-500 text-white p-2 w-32 rounded-lg mt-4">Add Patient</button>
                        </div>
                    </div>

                    <div className="overflow-x-auto mt-4 flex-grow">
                        <table className="min-w-full">
                            <thead>
                                <tr>
                                    <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                        Patient #
                                    </th>
                                    <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                        Last Name
                                    </th>
                                    <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                        First Name
                                    </th>
                                    <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                        Middle Name
                                    </th>
                                    <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                        Age
                                    </th>
                                    <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                        Contact Number
                                    </th>
                                    <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">

                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {displayedData.map((item) => (
                                    <tr key={item.id}>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <p>00{item.id}</p>
                                        </td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <p>Morales</p>
                                        </td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <p>Stanleigh</p>
                                        </td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <p>Balmes</p>
                                        </td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <p>19</p>
                                        </td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <p>0XXXXXXXXXXX</p>
                                        </td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <button className='bg-custom-blue text-white h-10 w-20 rounded-lg mr-4 mb-2'>View</button>
                                            <button className='bg-gray-300 h-10 w-20 rounded-lg'>Edit</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <ReactPaginate
                        pageCount={Math.ceil(yourData.length / itemsPerPage)}
                        pageRangeDisplayed={2}
                        marginPagesDisplayed={1}
                        onPageChange={handlePageChange}
                        forcePage={currentPage}
                        containerClassName="flex justify-center my-4"
                        pageClassName="inline-block mx-1 rounded-lg px-4 py-2 text-gray-600"
                        pageLinkClassName="text-sm"
                        activeClassName="bg-gray-200 text-white"
                        previousLabel={
                            <button className="hover:bg-custom-blue hover:text-white px-4 py-2 rounded-full mr-2">
                                Previous
                            </button>
                        }
                        nextLabel={
                            <button className="hover:bg-custom-blue hover:text-white px-4 py-2 rounded-full">
                                Next
                            </button>
                        }
                    />

                </div>
            </div>
        </>
    );
}

export default Box;
