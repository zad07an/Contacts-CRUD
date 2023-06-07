import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL: string = "http://localhost:3000/contacts";

interface InitialStateProps {
  contacts: {
    id: string;
    name: string;
    email: string;
  }[];
  fetchLoading: boolean;
  createLoading: boolean;
  removeLoading: boolean;
}

const initialState: InitialStateProps = {
  contacts: [],
  fetchLoading: false,
  createLoading: false,
  removeLoading: false,
};

export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(API_URL);
      return await res.data;
    } catch (err) {
      rejectWithValue("Something went wrong.");
    }
  }
);

export const createContact = createAsyncThunk(
  "contacts/createContact",
  async (
    data: { id: string; name: string; email: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post(API_URL, data);
      return await res.data;
    } catch (err) {
      rejectWithValue("Something went wrong.");
    }
  }
);

export const removeContact = createAsyncThunk(
  "contacts/removeContact",
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (err) {
      rejectWithValue("Something went wrong.");
    }
  }
);

const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchContacts.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchContacts.fulfilled, (state, action) => {
      state.contacts = action.payload;
      state.fetchLoading = false;
    });
    builder.addCase(createContact.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createContact.fulfilled, (state, action) => {
      state.contacts.push(action.payload);
      state.createLoading = false;
    });
    builder.addCase(removeContact.pending, (state) => {
      state.removeLoading = true;
    });
    builder.addCase(removeContact.fulfilled, (state, action) => {
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== action?.payload
      );
      state.removeLoading = false;
    });
  },
});

export const {} = contactSlice.actions;
export default contactSlice.reducer;
