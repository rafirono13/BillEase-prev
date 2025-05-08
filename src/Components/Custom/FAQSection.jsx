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
    <section className="my-12 w-full">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-primary flex items-center justify-center gap-2">
          <FaQuestionCircle className="" />
          FAQ
        </h2>
        <p className="text-sm text-gray-500">
          Everything you need to know about our bill payment system.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((faq, idx) => (
          <details
            key={idx}
            className="bg-base-200 rounded-xl shadow-md p-4 group open:shadow-lg transition-all"
          >
            <summary className="cursor-pointer text-lg font-medium group-open:text-white group-open:bg-primary px-2 py-1 rounded-md transition-colors">
              {faq.question}
            </summary>
            <p className="mt-2 text-gray-600 px-2">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
