import { createSlice } from "@reduxjs/toolkit";

interface ProfileType {
  id: number;
  email: string;
  name: string;
  password: string;
  photo: string;
  phone: string;
  position: string;
  skype: string;
}

type AuthStateType = {
  isAuth: boolean;
  profile: ProfileType;
};

const initialState: AuthStateType = {
  isAuth: false,
  profile: {
    id: 1,
    email: "",
    name: "",
    password: "",
    photo: "",
    phone: "",
    position: "",
    skype: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.profile = payload;
    },

    loginUser: (state, { payload }) => {
      state.isAuth = payload;
    },
  },
});

export const { setUser, loginUser } = authSlice.actions;
export default authSlice.reducer;
