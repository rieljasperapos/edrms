import VisitTable from "../components/VisitTable";

function Visit({ propPatientId }) {
  return (
    <>
      <VisitTable propPatientId={propPatientId} />
    </>
  );
}

export default Visit;
