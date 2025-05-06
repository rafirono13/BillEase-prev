import React from "react";
import Navbar from "./../Components/Common/Navbar";
import { Outlet, useNavigation } from "react-router";
import Footer from "../Components/Common/Footer";
import Loading from "../Components/Common/Loading";

const HomeLayout = () => {
  const navigation = useNavigation();

  return (
    <div>
      <nav className="shadow-2xl sticky top-0 z-50 bg-base-100">
        <Navbar></Navbar>
      </nav>
      <main className="w-11/12 mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        {navigation.state === "loading" ? (
          <Loading></Loading>
        ) : (
          <Outlet></Outlet>
        )}
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default HomeLayout;
