import { useDispatch, useSelector } from "react-redux";

import SignUpDialog from "@/components/signup/SignUpDialog";
import SignUpInfoInputs from "@/components/signup/SignUpInfoInputs";
import SignUpTerms from "@/components/signup/SignUpTerms";

import { setSignUpDialog } from "@/redux/signUpSlice";

interface RootState {
  signUp: {
    showSignUpDialog: boolean;
  };
}

const SignUp: React.FC = () => {
  const dispatch = useDispatch();
  const { showSignUpDialog } = useSelector((state: RootState) => state.signUp);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setSignUpDialog(true));
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
