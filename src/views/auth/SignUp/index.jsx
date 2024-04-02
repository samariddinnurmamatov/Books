import Container from "../../../components/shared/Container";
import SignUpForm from "./SignUpForm";

const SignUp = () => {
  return (
    <div className="bg-white orqa">
      <div className="flex justify-center items-center h-screen">
        <Container>
          <div className="w-[35%] mx-auto bg-white p-8 rounded-[12px]" style={{boxShadow: "0px 4px 32px 0px #3333330A"}}>
            <h1 className="text-center mb-1 text-black text-[30px]">Sign Up</h1>
            <SignUpForm />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default SignUp;
