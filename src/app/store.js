import { configureStore } from '@reduxjs/toolkit';

import authReducer from "../features/auth/authSlice";
import ticketReducer from "../features/tickets/ticketSlice";
import templateReducer from '../features/templates/templateSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        tickets: ticketReducer,
        templates: templateReducer
    },
});