import { useState } from "react";
import LogInForm from "./LogInForm";
import RegisterForm from "./RegisterForm";

function AuthSwitch() {
  const [isRegistering, setIsRegistering] = useState(false);

  return isRegistering ? (
    <RegisterForm onClick={() => setIsRegistering(false)} />
  ) : (
    <LogInForm onClick={() => setIsRegistering(true)} />
  );
}

export default AuthSwitch;