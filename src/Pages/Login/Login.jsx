import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "./../../Hooks/useAuth";
import Swal from "sweetalert2";

const Login = () => {
  const { login, setUser, googleLogin, resetPassword } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const HandleLoginSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const password = form.password.value;
    const email = form.email.value;

    login(email, password)
      .then((res) => {
        setUser(res.user);
        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.error("Login Error:", err);
        let errorMessage = "An unexpected error occurred during login.";

        switch (err.code) {
          case "auth/user-not-found":
            errorMessage =
              "No account found with this email. Please register or check the email address.";
            break;
          case "auth/wrong-password":
            errorMessage =
              "Incorrect password. Please check your password and try again.";
            break;
          case "auth/invalid-email":
            errorMessage =
              "The email address is not valid. Please enter a valid email address.";
            break;
          case "auth/user-disabled":
            errorMessage =
              "This account has been disabled. Please contact support.";
            break;

          default:
            errorMessage = err.message || errorMessage;
            break;
        }

        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: errorMessage,
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

        const savedPath = sessionStorage.getItem("redirectAfterLogin");
        sessionStorage.removeItem("redirectAfterLogin");

        const redirectTo = savedPath || "/";
        navigate(redirectTo, { replace: true });
      })
      .catch((err) => {
        console.error("Google Sign-in Error:", err);
        console.error("Google Sign-in Error:", err);
        sessionStorage.removeItem("redirectAfterLogin");

        let errorMessage = "An error occurred during Google sign-in.";

        switch (err.code) {
          case "auth/popup-closed-by-user":
            errorMessage = "Google Sign-in was cancelled.";
            break;
          case "auth/cancelled-popup-request":
            errorMessage =
              "You have an ongoing sign-in request. Please try again in a moment.";
            break;
          case "auth/operation-not-allowed":
            errorMessage = "Google Sign-in is not enabled for this project.";
            break;

          default:
            errorMessage = err.message || errorMessage;
            break;
        }

        Swal.fire({
          icon: "error",
          title: "Sign-in Failed",
          text: errorMessage,
        });
      });
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!forgotPasswordEmail) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please enter your email address",
      });
      return;
    }

    resetPassword(forgotPasswordEmail)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Email Sent",
          text: "Password reset email has been sent to your inbox",
          timer: 3000,
        });
        setIsModalOpen(false);
        setForgotPasswordEmail("");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.message,
        });
      });
  };

  return (
    <div className="hero min-h-screen">
      {/* Modal */}
      {isModalOpen && (
        <dialog id="forgot_password_modal" className="modal" open>
          <div className="modal-box">
            <h3 className="font-bold text-lg">Reset Password</h3>
            <p className="py-4">
              Enter your email address to receive a password reset link.
            </p>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full mt-2"
              value={forgotPasswordEmail}
              onChange={(e) => setForgotPasswordEmail(e.target.value)}
            />
            <div className="modal-action">
              <button
                className="btn btn-neutral"
                onClick={handleForgotPassword}
              >
                Send Reset Link
              </button>
              <button
                className="btn btn-outline"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* Modal */}

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
                  <a
                    className="link link-hover"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Forgot password?
                  </a>
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
