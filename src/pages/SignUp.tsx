import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import SignUpDialog from "@/components/signup/SignUpDialog";
import SignUpInfoInputs from "@/components/signup/SignUpInfoInputs";
import SignUpTerms from "@/components/signup/SignUpTerms";

import { setSignUpDialog } from "@/redux/signUpSlice";
import { userService } from "@/services/userService";

interface RootState {
  signUp: {
    showSignUpDialog: boolean;
    signUpForm: {
      id: string;
      email: string;
      name: string;
      password: string;
      phone: string;
      termsAgreed: boolean;
      privacyAgreed: boolean;
      marketingAgreed: boolean;
    };
  };
}

const SignUp: React.FC = () => {
  const dispatch = useDispatch();
  const { showSignUpDialog, signUpForm } = useSelector(
    (state: RootState) => state.signUp
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!signUpForm.termsAgreed || !signUpForm.privacyAgreed) {
      return;
    }

    try {
      await userService.signUp({
        id: signUpForm.id,
        email: signUpForm.email,
        name: signUpForm.name,
        password: signUpForm.password,
        phone: signUpForm.phone,
        termsAgreed: signUpForm.termsAgreed,
        privacyAgreed: signUpForm.privacyAgreed,
        marketingAgreed: signUpForm.marketingAgreed,
      });

      dispatch(setSignUpDialog(true));
    } catch (error) {}
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">회원가입</h2>

        <form onSubmit={handleSubmit}>
          <SignUpInfoInputs />

          <SignUpTerms />

          <button
            type="submit"
            className="w-full bg-[#FF7976] hover:bg-[#FF7976] text-white p-2 rounded transition-colors"
          >
            회원가입
          </button>
        </form>
      </div>

      <SignUpDialog
        open={showSignUpDialog}
        onOpenChange={(open: boolean) => dispatch(setSignUpDialog(open))}
      />
    </div>
  );
};

export default SignUp;
