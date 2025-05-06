import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "./../../Hooks/useAuth";
import Swal from "sweetalert2";

const Login = () => {
  const { login, setUser, googleLogin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.pathname);

  const HandleLoginSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const password = form.password.value;
    const email = form.email.value;
    console.log({ email, password });

    login(email, password)
      .then((res) => {
        setUser(res.user);
        console.log(res.user);
        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.error("Login Error:", err);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: err.message || "An error occurred during login.",
        });
      });
  };

  const handleGoogleSignIn = () => {
    const fromPath = location.state?.form?.pathname;
    if (fromPath) {
      sessionStorage.setItem("redirectedAfterLogin", fromPath);
    }

    googleLogin()
      .then((res) => {
        setUser(res.user);
        console.log("Google signed in user:", res.user);

        const savedPath = sessionStorage.getItem("redirectAfterLogin");
        sessionStorage.removeItem("redirectAfterLogin");

        const redirectTo = savedPath || "/";
        navigate(redirectTo, { replace: true });
      })
      .catch((err) => {
        console.error("Google Sign-in Error:", err);
        sessionStorage.removeItem("redirectAfterLogin");
        Swal.fire({
          icon: "error",
          title: "Sign-in Failed",
          text: err.message || "An error occurred during Google sign-in.",
        });
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        {/* Left Side Text */}
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Welcome back!</h1>
          <p className="py-6 text-lg">
            Log in to manage your bills, track expenses, and take control of
            your finances in one place.
          </p>
        </div>

        {/* Right Side Form */}
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={HandleLoginSubmit}>
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input input-bordered"
                  placeholder="Email"
                  name="email"
                  required
                />

                <label className="label">Password</label>
                <input
                  type="password"
                  className="input input-bordered"
                  placeholder="Password"
                  name="password"
                  required
                />

                <div className="flex justify-end text-sm mt-1 mb-2">
                  <a className="link link-hover">Forgot password?</a>
                </div>

                <button className="btn btn-neutral mt-2">Login</button>

                {/* Divider */}
                <div className="divider">OR</div>

                {/* Google Button */}
                <button
                  onClick={handleGoogleSignIn}
                  className="btn btn-outline flex items-center justify-center gap-2"
                >
                  <FcGoogle size={20} /> Sign in with Google
                </button>

                {/* Redirect to Register */}
                <p className="mt-4 text-sm text-center">
                  Don’t have an account?{" "}
                  <Link
                    to="/auth/register"
                    state={{ from: location?.state?.from }}
                    className="link link-primary font-semibold"
                  >
                    Register here
                  </Link>
                </p>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
