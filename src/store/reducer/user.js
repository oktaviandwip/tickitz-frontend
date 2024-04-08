import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    isAuth: false,
    token: "",
    role: "",
    user_id: 0,
  },
  reducers: {
    login(state, actions) {
      return {
        ...state,
        isAuth: true,
        token: actions.payload.token,
        role: actions.payload.role,
        user_id: actions.payload.user_id,
      };
    },
    logout(state, actions) {
      return {
        ...state,
        isAuth: false,
        token: "",
        role: "",
        user_id: 0,
      };
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
