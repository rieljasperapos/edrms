import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import Navbar from './components/navbar'
import Box from './components/box'
import DumpDatas from './data'

const itemsPerPage = 8;
const yourData = DumpDatas;

function App() {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = yourData.slice(startIndex, endIndex);

  return (
    <div>
      <Navbar />
      <div className='flex'>
        <Box />
      </div>
    </div>
  )
}

export default App
