import VisitTable from "../components/VisitTable";
import Navbar from "../components/navbar.jsx";
import Contents from "../components/contents.jsx";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
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
