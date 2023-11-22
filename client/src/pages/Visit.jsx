import VisitTable from "../components/VisitTable";
import Navbar from "../components/navbar.jsx";
import AccountSession from "../components/accountSession.jsx";
import Contents from "../components/contents.jsx";
function Visit() {
  return (
    <>
      <Navbar />
      <AccountSession />
      <Contents>
        <VisitTable />
      </Contents>
    </>
  );
}

export default Visit;
