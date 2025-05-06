import React from "react";
import Navbar from "../Components/Common/Navbar";
import { Outlet } from "react-router";
import FadeIn from "../Components/Custom/FadeIn";

const AuthLayout = () => {
  return (
    <div>
      <nav>
        <Navbar></Navbar>
      </nav>
      <div>
        <FadeIn direction="Right" delay={0.5}>
          <Outlet></Outlet>
        </FadeIn>
      </div>
    </div>
  );
};

export default AuthLayout;
