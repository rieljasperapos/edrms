import Navbar from "./components/navbar";
import AddRecord from "./pages/AddRecord.jsx";
import PatientRecord from "./pages/PatientRecord.jsx";
import Contents from "./components/contents";
import "./index.css";
import PatientRecordList from "./pages/PatientRecordList.jsx";
function App() {
  return (
    <>
      <div>
        <Navbar />
        <Contents>
          {/*<AddRecord />*/}
          <PatientRecord />
          {/*<PatientRecordList />*/}
        </Contents>
      </div>
    </>
  );
}

export default App;
