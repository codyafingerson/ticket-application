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

export const createTicket = async (ticketData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(`${ticketUrl}`, ticketData, config);

    return response.data;
}

export const getOpenTickets = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(`${ticketUrl}/status/open`, config);

    return response.data;
};

export const getClosedTickets = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(`${ticketUrl}/status/closed`, config);

    return response.data;
};

export const getInProgressTickets = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(`${ticketUrl}/status/in-progress`, config);

    return response.data;
};

export const getTicketById = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(`${ticketUrl}/${id}`, config);

    return response.data;
};

export const addNewNoteToTicket = async (id, note, token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    
      const data = { ...note };
    
      const response = await axios.put(
        `${ticketUrl}/${id}/new-note`,
        data,
        config
      );
    
      return response.data;
};

export const removeNoteFromTicket = async (id, noteId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.delete(
        `${ticketUrl}/${id}/remove-note/${noteId}`,
        config
    );

    return response.data;
};

export const deleteTicket = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.delete(`${ticketUrl}/${id}`, config);

    return response.data;
}

export const addStationDetails = async (id, stationDetails, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const data = { ...stationDetails };

    const response = await axios.put(
        `${ticketUrl}/${id}/update-station`,
        data,
        config
    );

    return response.data;
};

const ticketService = {
    createTicket,
    getOpenTickets,
    getClosedTickets,
    getInProgressTickets,
    getTicketById,
    addNewNoteToTicket,
    removeNoteFromTicket,
    deleteTicket
};

export default ticketService;