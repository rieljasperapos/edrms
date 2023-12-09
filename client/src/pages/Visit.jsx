import VisitTable from "../components/VisitTable";
import Navbar from "../components/Navbar.jsx";
import Contents from "../components/Contents.jsx";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth.jsx";
function Visit() {
  const { authenticated } = useAuth();
  const [patientId, setPatientId] = useState(parseInt(useParams().patientId));
  console.log(patientId);
  return (
    <>
      <Navbar />
      <Contents>
        <VisitTable propPatientId={patientId} />
      </Contents>
    </>
  );
}

export default Visit;
