import axios from "axios";

const ticketUrl = "/api/tickets";

/* 
    Routes in this service:
    GET /status/open
    GET /status/closed
    GET /status/in-progress
    GET /:id -> get tickets by id
    PUT /:id/new-note -> add a new note to a ticket
*/

export const getOpenTickets = async () => {
    const { data } = await axios.get(`${ticketUrl}/status/open`);
    return data;
};

export const getClosedTickets = async () => {
    const { data } = await axios.get(`${ticketUrl}/status/closed`);
    return data;
};

export const getInProgressTickets = async () => {
    const { data } = await axios.get(`${ticketUrl}/status/in-progress`);
    return data;
};

export const getTicketById = async (id) => {
    const { data } = await axios.get(`${ticketUrl}/${id}`);
    return data;
};

export const addNewNoteToTicket = async (id, note, createdBy, token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    
      const data = { ...note, createdBy };
    
      const response = await axios.put(
        `${ticketUrl}/${id}/new-note`,
        data,
        config
      );
    
      return response.data;
};

const ticketService = {
    getOpenTickets,
    getClosedTickets,
    getInProgressTickets,
    getTicketById,
    addNewNoteToTicket,
};

export default ticketService;