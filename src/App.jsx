import Navbar from './components/navbar'
import AddRecord from './pages/AddRecord.jsx'
import './index.css'

function App() {

  return (
    <>
        <div className='flex'>
            <div className='basis'>
                <Navbar />
            </div>
            <div className="flex flex-col shrink justify-center p-20">
                <AddRecord />
            </div>
        </div>
    </>
  )
}

export default App
