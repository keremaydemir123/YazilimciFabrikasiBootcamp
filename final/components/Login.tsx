"use client";

import { signIn } from "next-auth/react";

function Login() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <button onClick={() => signIn()} className="btn btn-primary">
        Login
      </button>
    </div>
  );
}

export default Login;
