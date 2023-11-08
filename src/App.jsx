import Navbar from './components/navbar'
import AddRecord from './pages/AddRecord.jsx'
import Contents from './components/contents'
import './index.css'

function App() {

  return (
    <>
        <div>
            <Navbar />
            <Contents>
                <AddRecord />
            </Contents>
        </div>
    </>
  )
}

export default App
