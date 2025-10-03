import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  return data;
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    loading: false,
    error: null,
    searchQuery: "",
  },
  reducers: {
    addUser: (state, action) => {
      const companyVal = action.payload.company;
      const companyObj = companyVal
        ? typeof companyVal === "string"
          ? { name: companyVal }
          : companyVal.name
          ? companyVal
          : { name: String(companyVal) }
        : { name: "Local User" };

      const newUser = {
        ...action.payload,
        id: Date.now(),
        company: companyObj,
      };
      state.list.unshift(newUser);
    },

  
    deleteUser: (state, action) => {
      state.list = state.list.filter((u) => u.id !== action.payload);
    },

    updateUser: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.list.findIndex((u) => u.id === id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...updatedData };
      }
    },

    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to fetch users.";
      });
  },
});

export const { addUser, deleteUser, updateUser, setSearchQuery } =
  userSlice.actions;

export default userSlice.reducer;
