import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useAuth from "../../Hooks/useAuth";
import { format } from "date-fns";
import {
  FaMoneyBillWave,
  FaCalendarAlt,
  FaLayerGroup,
  FaFileInvoiceDollar,
} from "react-icons/fa";
import { MdOutlinePending, MdPaid } from "react-icons/md";
import { RiWaterFlashFill } from "react-icons/ri";
import { Link } from "react-router";

const DashBoard = () => {
  const { userBalance } = useAuth();
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartType, setChartType] = useState("pie");

  // Fetch bills data
  useEffect(() => {
    fetch("/JSON/bills.json")
      .then((res) => res.json())
      .then((data) => {
        setBills(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching bills:", error);
        setLoading(false);
      });
  }, []);

  // Calculate total bill amount
  const totalBillAmount = bills.reduce((total, bill) => total + bill.amount, 0);

  // Calculate upcoming bill (closest due date)
  const today = new Date();
  const upcomingBill =
    bills.length > 0
      ? bills.reduce((closest, bill) => {
          const dueDate = new Date(bill.due_date);
          if (dueDate >= today) {
            if (!closest) return bill;
            return new Date(closest.due_date) > dueDate ? bill : closest;
          }
          return closest;
        }, null)
      : null;

  // Calculate bills by type
  const billsByType = bills.reduce((acc, bill) => {
    if (!acc[bill.bill_type]) {
      acc[bill.bill_type] = 0;
    }
    acc[bill.bill_type] += bill.amount;
    return acc;
  }, {});

  const numberOfBillTypes = Object.keys(billsByType).length;

  // chasrt data
  const pieChartData = [
    { name: "Available Balance", value: userBalance },
    { name: "Bills Due", value: totalBillAmount },
  ];

  const barChartData = Object.keys(billsByType).map((type) => ({
    name: type.charAt(0).toUpperCase() + type.slice(1),
    amount: billsByType[type],
  }));

  // Chart colors
  const COLORS = ["#8884d8", "#FF8042", "#00C49F", "#FFBB28", "#0088FE"];

  // Stat boxes data
  const statBoxes = [
    {
      title: "Available Balance",
      value: `${userBalance.toLocaleString()} BDT`,
      icon: <FaMoneyBillWave className="text-green-500 text-3xl" />,
      color: "bg-green-100 border-green-300",
    },
    {
      title: "Total Bills Due",
      value: `${totalBillAmount.toLocaleString()} BDT`,
      icon: <MdOutlinePending className="text-orange-500 text-3xl" />,
      color: "bg-orange-100 border-orange-300",
    },
    {
      title: "Bill Categories",
      value: `${numberOfBillTypes} Types`,
      icon: <FaLayerGroup className="text-teal-500 text-3xl" />,
      color: "bg-teal-100 border-teal-300",
    },
    {
      title: "Next Due Bill",
      value: upcomingBill
        ? `${upcomingBill.organization} (${format(new Date(upcomingBill.due_date), "MMM d")})`
        : "No upcoming bills",
      icon: <FaCalendarAlt className="text-purple-500 text-3xl" />,
      color: "bg-purple-100 border-purple-300",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Financial Dashboard
      </h1>
      <Link to="/bills">
        <button className="btn btn-primary btn-md shadow-lg hover:shadow-xl transition-shadow duration-300 my-2">
          View All Bills
          <FaFileInvoiceDollar className="ml-4" />
        </button>
      </Link>

      {/* Stat Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statBoxes.map((stat, index) => (
          <div
            key={index}
            className={`${stat.color} border rounded-xl shadow-md p-6 transition-all hover:shadow-lg`}
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">{stat.title}</h2>
              {stat.icon}
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Financial Overview</h2>
          <div className="btn-group">
            <button
              onClick={() => setChartType("pie")}
              className={`btn btn-sm ${chartType === "pie" ? "btn-active" : ""}`}
            >
              Pie Chart
            </button>
            <button
              onClick={() => setChartType("bar")}
              className={`btn btn-sm ${chartType === "bar" ? "btn-active" : ""}`}
            >
              Bar Chart
            </button>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={400}>
          {chartType === "pie" ? (
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {pieChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value.toLocaleString()} BDT`} />
              <Legend />
            </PieChart>
          ) : (
            <BarChart
              data={barChartData}
              margin={{ top: 20, right: 30, left: 30, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `${value.toLocaleString()} BDT`} />
              <Legend />
              <Bar dataKey="amount" name="Bill Amount" fill="#8884d8">
                {barChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Bills Breakdown */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Bills Breakdown</h2>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Bill Type</th>
                <th>Organization</th>
                <th>Amount</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {bills.map((bill) => (
                <tr key={bill.id}>
                  <td className="flex items-center gap-2">
                    <img
                      src={bill.icon}
                      alt={bill.bill_type}
                      className="w-6 h-6"
                    />
                    <span className="capitalize">{bill.bill_type}</span>
                  </td>
                  <td>{bill.organization}</td>
                  <td>{bill.amount.toLocaleString()} BDT</td>
                  <td>{format(new Date(bill.due_date), "MMMM d, yyyy")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
