import Navbar from "./components/navbar";
import AddRecord from "./pages/AddRecord.jsx";
import PatientRecord from "./pages/PatientRecord.jsx";
import Contents from "./components/contents";
import "./index.css";

function App() {
  return (
    <>
      <div>
        <Navbar />
        <Contents>
          <AddRecord />
          {/*<PatientRecord />*/}
        </Contents>
      </div>
    </>
  );
}

export default App;
