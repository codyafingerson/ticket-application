import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInProgressTickets } from "../features/tickets/ticketSlice";
import MainContainer from "../components/shared/MainContainer";
import TicketTable from "../components/shared/TicketTable";

function ActiveTickets() {
    const dispatch = useDispatch();
    const { tickets }  = useSelector((state) => state.tickets);
    
    useEffect(() => {
        dispatch(getInProgressTickets());
    }, [dispatch]);

  return (
    <MainContainer>
        <TicketTable tickets={tickets} />
    </MainContainer>
  )
}

export default ActiveTickets