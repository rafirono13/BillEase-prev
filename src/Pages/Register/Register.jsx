import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "./../../Hooks/useAuth";
import Swal from "sweetalert2";

const Register = () => {
  const { register, setUser, updateUser, googleLogin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  console.log("Register page location state:", location.state);

  const HandleRegSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const password = form.password.value;
    const email = form.email.value;

    console.log({ email, password, name, photo });

    //User Creation and update

    register(email, password)
      .then((res) => {
        const user = res.user;
        console.log(user);
        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
            console.log("User profile updated");
          })
          .catch((err) => {
            console.error("Profile Update Error:", err);
            setUser(user);
            Swal.fire({
              icon: "warning",
              title: "Profile Update Failed",
              text: "Could not update profile picture or name. You are registered.",
            });
          });

        const from = location.state?.form?.pathname || "/";
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.error("Registration Error:", err);
        const errMsg = err.message;
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: errMsg || "An error occurred during registration.",
        });
      });
  };

  const handleGoogleSignIn = () => {
    googleLogin()
      .then((res) => {
        setUser(res.user);
        console.log("Google signed in user:", res.user);

        const from = location.state?.form?.pathname || "/";
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.error("Google Sign-in Error:", err);
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
        {/* Left Text */}
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Create an Account</h1>
          <p className="py-6 text-lg">
            Join us and simplify your financial life. Register to access your
            dashboard and stay on top of your bills.
          </p>
        </div>

        {/* Right Form */}
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={HandleRegSubmit}>
              <fieldset className="fieldset">
                <label className="label">Full Name</label>
                <input
                  type="text"
                  className="input input-bordered"
                  placeholder="Your name"
                  name="name"
                  autoComplete="username"
                  required
                />

                <label className="label">Photo URL</label>
                <input
                  type="text"
                  className="input input-bordered"
                  placeholder="Paste your photo URL"
                  name="photo"
                />

                <label className="label">Email</label>
                <input
                  type="email"
                  className="input input-bordered"
                  placeholder="mail@site.com"
                  name="email"
                  autoComplete="email"
                  required
                />

                <label className="label validator">Password</label>
                <input
                  type="password"
                  className="input input-bordered"
                  placeholder="Password"
                  name="password"
                  autoComplete="current-password"
                  required
                />

                <button type="submit" className="btn btn-primary mt-4">
                  Register
                </button>

                <div className="divider">OR</div>

                <button
                  onClick={handleGoogleSignIn}
                  className="btn btn-outline flex items-center justify-center gap-2"
                >
                  <FcGoogle size={20} /> Sign up with Google
                </button>

                <p className="mt-4 text-sm text-center">
                  Already have an account?{" "}
                  <Link
                    to="/auth/login"
                    className="link link-primary font-semibold"
                  >
                    Login here
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

export default Register;
