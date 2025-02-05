import { useDispatch, useSelector } from "react-redux";
import { setSignUpformData } from "@/redux/signUpSlice";
import { setFieldError } from "@/redux/inputErrorSlice";

interface SignUpState {
  signUpForm: {
    allAgreed: boolean;
    termsAgreed: boolean;
    privacyAgreed: boolean;
    marketingAgreed: boolean;
    [key: string]: boolean | "";
  };
}

interface RootState {
  signUp: SignUpState;
  error: {
    errors: {
      termsAgreed?: string;
      privacyAgreed?: string;
      [key: string]: string | undefined;
    };
  };
}

const SignUpTerms = () => {
  const dispatch = useDispatch();
  const { signUpForm } = useSelector((state: RootState) => state.signUp);
  const errors = useSelector((state: RootState) => state.error.errors);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    if (name === "allAgreed") {
      dispatch(setSignUpformData({ name: "allAgreed", value: checked }));
      dispatch(setSignUpformData({ name: "termsAgreed", value: checked }));
      dispatch(setSignUpformData({ name: "privacyAgreed", value: checked }));
      dispatch(setSignUpformData({ name: "marketingAgreed", value: checked }));
    } else {
      dispatch(setSignUpformData({ name, value: checked }));

      const allChecked =
        name === "termsAgreed"
          ? checked && signUpForm.privacyAgreed && signUpForm.marketingAgreed
          : name === "privacyAgreed"
          ? signUpForm.termsAgreed && checked && signUpForm.marketingAgreed
          : signUpForm.termsAgreed && signUpForm.privacyAgreed && checked;

      dispatch(setSignUpformData({ name: "allAgreed", value: allChecked }));
    }
  };

  const handleError = (e: React.FocusEvent<HTMLInputElement>) => {
    dispatch(
      setFieldError({
        field: e.target.name,
        value: e.target.value,
        formData: signUpForm,
      })
    );
  };

  return (
    <div className="mb-4 space-y-2">
      <label className="block mb-2 text-sm font-medium">약관 동의</label>
      <div className="flex items-center font-medium">
        <input
          type="checkbox"
          name="allAgreed"
          checked={signUpForm.allAgreed}
          onChange={handleChange}
          className="mr-2"
        />
        <span className="text-sm">전체 동의</span>
      </div>
      <div className="ml-4 space-y-2">
        <div className="flex items-center">
          <input
            type="checkbox"
            name="termsAgreed"
            checked={signUpForm.termsAgreed}
            onChange={handleChange}
            onBlur={handleError}
            className="mr-2"
          />
          <span className="text-sm">서비스 이용약관 동의 (필수)</span>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="privacyAgreed"
            checked={signUpForm.privacyAgreed}
            onChange={handleChange}
            onBlur={handleError}
            className="mr-2"
          />
          <span className="text-sm">개인정보 수집 및 이용 동의 (필수)</span>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="marketingAgreed"
            checked={signUpForm.marketingAgreed}
            onChange={handleChange}
            onBlur={handleError}
            className="mr-2"
          />
          <span className="text-sm">마케팅 정보 수신 동의 (선택)</span>
        </div>
      </div>
      {(errors.termsAgreed || errors.privacyAgreed) && (
        <p className="text-red-500 text-sm">필수 약관에 동의해주세요.</p>
      )}
    </div>
  );
};

export default SignUpTerms;
