import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: {},
  },
  reducers: {
    getProfile(state, actions) {
      return {
        ...state,
        profile: actions.payload,
      };
    },
  },
});

export const { getProfile } = userSlice.actions;
export default userSlice.reducer;
