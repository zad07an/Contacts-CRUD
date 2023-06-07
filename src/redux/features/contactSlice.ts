import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL: string = "http://localhost:3000/contacts";

interface InitialStateProps {
  contact: {
    id: string;
    name: string;
    email: string;
  } | null;
  fetchLoading: boolean;
  updateLoading: boolean;
}

const initialState: InitialStateProps = {
  contact: null,
  fetchLoading: false,
  updateLoading: false,
};

export const fetchContact = createAsyncThunk(
  "contact/fetchContact",
  async (id: string, { rejectWithValue }) => {
    try {
      if (id) {
        const res = await axios.get(`${API_URL}/${id}`);
        return await res.data;
      }
    } catch (err) {
      rejectWithValue("Something went wrong.");
    }
  }
);

export const updateContact = createAsyncThunk(
  "contact/updateContact",
  async (
    data: { id: string; name: string; email: string },
    { rejectWithValue }
  ) => {
    try {
      if (data) {
        const res = await axios.put(`${API_URL}/${data.id}`, {
          ...data,
          name: data.name,
          email: data.email,
        });
        return await res.data;
      }
    } catch (err) {
      rejectWithValue("Something went wrong.");
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchContact.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(
      fetchContact.fulfilled,
      (
        state,
        action: PayloadAction<{ id: string; name: string; email: string }>
      ) => {
        state.contact = action.payload;
        state.fetchLoading = false;
      }
    );
    builder.addCase(updateContact.pending, (state) => {
      state.updateLoading = true;
    });
    builder.addCase(
      updateContact.fulfilled,
      (
        state,
        action: PayloadAction<{ id: string; name: string; email: string }>
      ) => {
        state.contact = action.payload;
        state.updateLoading = false;
      }
    );
  },
});

export const {} = contactSlice.actions;
export default contactSlice.reducer;
