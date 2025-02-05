import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SignUpForm {
  id: string;
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
  phone: string;
  allAgreed: boolean;
  termsAgreed: boolean;
  privacyAgreed: boolean;
  marketingAgreed: boolean;
}

interface SignUpState {
  signUpForm: SignUpForm;
  showSignUpDialog: boolean;
}

const initialState: SignUpState = {
  signUpForm: {
    id: "",
    email: "",
    name: "",
    password: "",
    passwordConfirm: "",
    phone: "",
    allAgreed: false,
    termsAgreed: false,
    privacyAgreed: false,
    marketingAgreed: false,
  },
  showSignUpDialog: false,
};

const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    setSignUpformData: (
      state,
      action: PayloadAction<{ name: string; value: string | boolean }>
    ) => {
      const { name, value } = action.payload;
      state.signUpForm = {
        ...state.signUpForm,
        [name]: value,
      };
    },
    setSignUpDialog: (state, action: PayloadAction<boolean>) => {
      state.showSignUpDialog = action.payload;
    },
  },
});

export const { setSignUpformData, setSignUpDialog } = signUpSlice.actions;

export default signUpSlice.reducer;
