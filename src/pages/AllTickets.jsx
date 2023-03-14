import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTickets }  from "../features/tickets/ticketSlice";

import MainContainer from "../components/shared/MainContainer";
import TicketTable from "../components/shared/TicketTable";

function AllTickets() {
    const dispatch = useDispatch();
    const { tickets }  = useSelector((state) => state.tickets);

    useEffect(() => {
        dispatch(getAllTickets());
    }, [dispatch]);

  return (
    <MainContainer>
        <TicketTable tickets={tickets} expanded={true}/>
    </MainContainer>
  )
}

export default AllTickets