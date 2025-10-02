import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 📥 Fetch users nga API
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
    // ➕ Shto përdorues të ri (lokalisht)
    addUser: (state, action) => {
      const newUser = {
        ...action.payload,
        id: Date.now(), // ID unike lokale
        company: { name: action.payload.company || "Local User" },
      };
      state.list.unshift(newUser);
    },

    // 🗑️ Fshi përdorues
    deleteUser: (state, action) => {
      state.list = state.list.filter((u) => u.id !== action.payload);
    },

    // ✏️ Përditëso përdorues
    updateUser: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.list.findIndex((u) => u.id === id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...updatedData };
      }
    },

    // 🔍 Ruaj kërkimin
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
