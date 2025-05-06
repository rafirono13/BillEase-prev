import { FaShieldAlt, FaClock, FaBolt, FaSmileBeam } from "react-icons/fa";

const facts = [
  {
    title: "Secure & Encrypted Payments",
    desc: "Your data and transactions are protected with top-grade encryption. No compromises, ever.",
    icon: <FaShieldAlt size={48} className="text-gray-400" />,
    gradient: "from-cyan-600 to-blue-600",
  },
  {
    title: "Real-Time Bill Syncing",
    desc: "We keep your bills updated in real-time with direct integrations from trusted providers.",
    icon: <FaClock size={48} className="text-gray-400" />,
    gradient: "from-indigo-500 to-purple-600",
  },
  {
    title: "All-in-One Dashboard",
    desc: "Electricity, Gas, Water, Internet — manage everything from one beautiful interface.",
    icon: <FaBolt size={48} className="text-gray-400" />,
    gradient: "from-amber-600 to-pink-500",
  },
  {
    title: "Designed for Peace of Mind",
    desc: "No stress, no mess. Our app feels like a calm winter breeze — organized, clean, and cozy.",
    icon: <FaSmileBeam size={48} className="text-gray-400" />,
    gradient: "from-teal-600 to-green-500",
  },
];

const FactsSection = () => {
  return (
    <section className="py-16 px-4 md:px-10 rounded-b-2xl">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-10 text-center text-primary">
          Some Cool Facts About Us
        </h2>
        <div className="space-y-8">
          {facts.map((fact, index) => (
            <article
              key={index}
              className="w-full bg-base-200 rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden"
            >
              {/* Text Section */}
              <div
                className={`flex-1 p-6 md:p-8 bg-gradient-to-r ${fact.gradient} text-primary-content`}
              >
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  {fact.title}
                </h3>
                <p className="text-sm md:text-base opacity-90">{fact.desc}</p>
              </div>

              {/* Icon Section */}
              <div className="w-full md:w-1/3 bg-base-300 flex items-center justify-center p-6">
                {fact.icon}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FactsSection;
