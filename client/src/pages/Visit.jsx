import VisitTable from "../components/VisitTable";
import Navbar from "../components/navbar.jsx";
import AccountSession from "../components/accountSession.jsx";
import Contents from "../components/contents.jsx";
import { useState } from "react";
import { useParams } from "react-router-dom";
function Visit() {
  const [patientId, setPatientId] = useState(parseInt(useParams().patientId));
  console.log(patientId);
  return (
    <>
      <Navbar />
      <AccountSession />
      <Contents>
        <VisitTable propPatientId={patientId} />
      </Contents>
    </>
  );
}

export default Visit;
