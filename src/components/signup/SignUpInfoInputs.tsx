import { useDispatch, useSelector } from "react-redux";
import { InputForm } from "@/components/common/InputForm";
import { setSignUpformData } from "@/redux/signUpSlice";
import { setFieldError } from "@/redux/inputErrorSlice";

interface SignUpForm {
  id: string;
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
  phone: string;
  [key: string]: string | "male" | "female" | "";
}

interface RootState {
  signUp: {
    signUpForm: SignUpForm;
  };
  error: {
    errors: {
      id?: string;
      email?: string;
      name?: string;
      password?: string;
      passwordConfirm?: string;
      phone?: string;
    };
  };
}

const SignUpInfoInputs = () => {
  const dispatch = useDispatch();

  const { signUpForm } = useSelector((state: RootState) => state.signUp);
  const errors = useSelector((state: RootState) => state.error.errors);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const onlyNumbers = value.replace(/[^0-9]/g, "");
      dispatch(setSignUpformData({ name, value: onlyNumbers }));
    } else {
      dispatch(setSignUpformData({ name, value }));
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
    <>
      <InputForm
        label="아이디"
        name="id"
        value={signUpForm.id}
        onChange={handleChange}
        onBlur={handleError}
        error={errors.id}
        className="mb-4"
      />

      <InputForm
        label="이메일"
        name="email"
        type="email"
        value={signUpForm.email}
        onChange={handleChange}
        onBlur={handleError}
        error={errors.email}
        className="mb-4"
      />

      <InputForm
        label="이름"
        name="name"
        value={signUpForm.name}
        onChange={handleChange}
        onBlur={handleError}
        error={errors.name}
        className="mb-4"
      />

      <InputForm
        label="비밀번호"
        name="password"
        type="password"
        value={signUpForm.password}
        onChange={handleChange}
        onBlur={handleError}
        error={errors.password}
        className="mb-4"
      />

      <InputForm
        label="비밀번호 확인"
        name="passwordConfirm"
        type="password"
        value={signUpForm.passwordConfirm}
        onChange={handleChange}
        onBlur={handleError}
        error={errors.passwordConfirm}
        className="mb-4"
      />

      <InputForm
        label="전화번호"
        name="phone"
        type="tel"
        value={signUpForm.phone}
        onChange={handleChange}
        onBlur={handleError}
        maxLength={11}
        placeholder="01012345678"
        error={errors.phone}
        className="mb-4"
      />
    </>
  );
};

export default SignUpInfoInputs;
