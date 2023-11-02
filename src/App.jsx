import Navbar from './components/navbar'
import Contents from './components/contents'
import Calendar from './components/calendar'

function App() {

  return (
    <>
      <div>
        <Navbar />
        <Contents>
          <Calendar />
        </Contents>
      </div>
    </>
  )
}

export default App
