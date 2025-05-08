import React from "react";
import {
  FaLightbulb,
  FaShieldAlt,
  FaMobileAlt,
  FaUsers,
  FaFileInvoiceDollar,
} from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen  py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-4xl w-full space-y-8">
        <div className="bg-white shadow-xl rounded-lg p-8 md:p-12 transform transition-all hover:shadow-2xl duration-300">
          <div className="text-center mb-10">
            <FaFileInvoiceDollar className="text-5xl md:text-6xl text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              About BillEase
            </h1>
            <p className="mt-3 text-lg text-gray-600">
              Simplifying Your Bill Management, One Click at a Time.
            </p>
          </div>

          <div className="space-y-6 text-gray-700 text-left">
            <p className="text-lg leading-relaxed">
              In today's fast-paced world, juggling multiple utility bills –
              electricity, gas, water, internet, and more – can be a
              time-consuming and often stressful task. Remembering different due
              dates, navigating various payment portals, and keeping track of
              all your expenses can easily lead to confusion and potential late
              fees. That's where
              <strong className="text-blue-600 mx-1">BillEase</strong>steps in.
            </p>
            <p className="leading-relaxed text-md">
              Our core mission is to provide a
              <strong className="text-blue-600 mx-1">
                centralized, secure, and incredibly user-friendly platform
              </strong>
              for managing and paying all your utility bills. We firmly believe
              that handling your financial obligations shouldn't be a chore, but
              a seamless and empowering part of your financial life. With
              BillEase, you can say goodbye to cluttered inboxes, stacks of
              paper bills, and the anxiety of missed payments.
            </p>
            <h2 className="text-3xl font-semibold text-gray-800 pt-6 pb-2 border-b border-gray-200">
              What We Offer:
            </h2>
            <ul className="list-none space-y-5 pt-3">
              <li className="flex items-start">
                <FaLightbulb className="text-yellow-500 text-2xl mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    One-Stop Bill Dashboard
                  </h3>
                  <p className="text-gray-600 text-sm">
                    See all your upcoming and past due bills in one intuitive,
                    organized view. No more logging into multiple websites!
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <FaShieldAlt className="text-green-500 text-2xl mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Secure & Easy Payments
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Pay your bills directly through our platform using your
                    available balance with top-tier security measures protecting
                    your data.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <FaMobileAlt className="text-sky-500 text-2xl mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Accessible Anywhere
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Designed with simplicity, our platform is easy to navigate
                    on desktop, tablet, or mobile.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <FaUsers className="text-indigo-500 text-2xl mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Stay Organized & Informed
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Keep track of payment history, analyze spending patterns,
                    and gain better control over your finances with clear
                    insights.
                  </p>
                </div>
              </li>
            </ul>
            <p className="leading-relaxed pt-6 text-md">
              BillEase is more than just a payment portal; it's your dedicated
              partner in achieving financial peace of mind and efficiency. We
              are committed to continuously improving our services and adding
              innovative features to make your bill management experience as
              effortless as possible.
            </p>
            <p className="text-center text-gray-500 pt-8 font-medium">
              Thank you for choosing BillEase – Pay Smarter, Live Simpler!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
