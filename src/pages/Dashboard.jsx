import { useSelector } from "react-redux";
import MainContainer from "../components/shared/MainContainer";

function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  return (
    <MainContainer>
      <h1>Greetings, {user.firstName} {user.lastName}</h1>
    </MainContainer>
  );
}

export default Dashboard;
