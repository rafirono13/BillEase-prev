import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import {
  FaUsers,
  FaFileInvoiceDollar,
  FaBuilding,
  FaSmile,
} from "react-icons/fa";

const stats = [
  {
    icon: <FaUsers size={36} className="text-primary" />,
    title: "Happy Users",
    count: 12000,
    suffix: "+",
  },
  {
    icon: <FaFileInvoiceDollar size={36} className="text-primary" />,
    title: "Bills Paid",
    count: 85000,
    suffix: "+",
  },
  {
    icon: <FaBuilding size={36} className="text-primary" />,
    title: "Service Providers",
    count: 20,
    suffix: "+",
  },
  {
    icon: <FaSmile size={36} className="text-primary" />,
    title: "Customer Satisfaction",
    count: 99,
    suffix: "%",
  },
];

const StatsSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section ref={ref} className="py-16 px-4 md:px-10">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12 text-primary">
          We're Growing With You
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, id) => (
            <div
              key={id}
              className="bg-base-100 p-6 rounded-xl shadow-md flex flex-col items-center justify-center"
            >
              <div className="mb-4">{stat.icon}</div>
              <h3 className="text-3xl font-bold text-accent">
                {inView && (
                  <CountUp
                    end={stat.count}
                    duration={2}
                    suffix={stat.suffix}
                    separator=","
                  />
                )}
              </h3>
              <p className="mt-2 text-base-content/80">{stat.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
