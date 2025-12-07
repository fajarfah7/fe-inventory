import { Login } from "@/features/auth/pages/Login";
import { useAuth } from "@/store/auth";
import type { LoginValue } from "@/features/auth/types/Login";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {

  const navigate = useNavigate();
  const { loading, login, isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard", { replace: true });
    }
  }, [isLoggedIn]);

  const [message, setMessage] = useState<string>("");

  async function handleLogin(data: LoginValue) {
    const isSuccess = login(data.username, data.password);
    if (isSuccess) navigate("/dashboard");
    else setMessage("wrong email or password");
  }

  if (isLoggedIn) return null;
  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Login onSubmit={ handleLogin } />
      {message !== "" ? message:""}
    </>
  )
}