import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "../features/contactsSlice";
import contactReducer from "../features/contactSlice";

const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    contact: contactReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
