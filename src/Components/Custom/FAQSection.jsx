import React from "react";
import { FaQuestionCircle } from "react-icons/fa";

const FAQSection = () => {
  const faqs = [
    {
      question: "How do I pay my electricity bill?",
      answer:
        "Just sign in, select your provider like DESCO or NESCO, and pay with your account balance in seconds!",
    },
    {
      question: "Is my payment information secure?",
      answer:
        "Absolutely. We use industry-standard encryption and never store your sensitive info.",
    },
    {
      question: "Can I view my previous payments?",
      answer:
        "Yes! After logging in, you can track all your previous transactions in the Dashboard.",
    },
    {
      question: "Which providers are supported?",
      answer:
        "We support DESCO, WASA, TITAS, NESCO, BTCL, and more — growing every month!",
    },
  ];

  return (
    <section className="my-10 w-full">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-primary flex justify-center items-center gap-2">
          <FaQuestionCircle className="text-accent sm:hidden" />
          Frequently Asked Questions
        </h2>
        <p className="text-sm text-gray-500">
          Everything you need to know about using our bill payment platform.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="collapse collapse-arrow bg-base-200 shadow-xl rounded-xl transition-all duration-300 hover:scale-[1.01]"
          >
            <input type="checkbox" className="peer" />
            <div className="collapse-title text-lg font-medium peer-checked:bg-primary peer-checked:text-white">
              {faq.question}
            </div>
            <div className="collapse-content bg-base-100 text-gray-600 px-4 py-2 rounded-b-xl">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
