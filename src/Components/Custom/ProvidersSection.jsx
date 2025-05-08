import { FaBolt, FaFireAlt, FaWifi, FaTint, FaMobileAlt } from "react-icons/fa";

const providers = [
  {
    icon: <FaBolt size={32} />,
    name: "Electricity",
    desc: "Pay your power bills quickly.",
  },
  {
    icon: <FaFireAlt size={32} />,
    name: "Gas",
    desc: "Never miss a gas refill deadline.",
  },
  {
    icon: <FaWifi size={32} />,
    name: "Internet",
    desc: "Stay connected without interruptions.",
  },
  {
    icon: <FaTint size={32} />,
    name: "Water",
    desc: "Manage water utilities with ease.",
  },
  {
    icon: <FaMobileAlt size={32} />,
    name: "Mobile Recharge",
    desc: "Top up anytime, anywhere.",
  },
];

const ProvidersSection = () => {
  return (
    <section className="py-16 px-4 md:px-10 rounded-t-2xl">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 text-primary">
          Our Service Providers
        </h2>
        <p className="text-base-content/80 max-w-2xl mx-auto mb-12">
          We've partnered with the most trusted providers so you can manage all
          your bills in one place — fast, reliable, and secure.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 bg">
          {providers.map((provider, idx) => (
            <div
              key={idx}
              className="bg-base-200 rounded-2xl shadow-2xl p-6 flex flex-col items-center text-center hover:shadow-xl transition duration-300"
            >
              <div className="mb-4">{provider.icon}</div>
              <h3 className="font-semibold text-lg mb-1">{provider.name}</h3>
              <p className="text-sm text-base-content/70">{provider.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProvidersSection;
