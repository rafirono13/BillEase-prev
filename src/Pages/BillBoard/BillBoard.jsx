import { useLoaderData, useNavigate } from "react-router";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { FaCheckCircle } from "react-icons/fa";

const BillBoard = () => {
  const bills = useLoaderData();
  const navigate = useNavigate();
  const [filteredBills, setFilteredBills] = useState(bills);
  const [selectType, setSelectedType] = useState("all");
  const { paidBills } = useAuth();

  const billTypes = ["all", ...new Set(bills.map((bill) => bill.bill_type))];

  useEffect(() => {
    if (selectType === "all") {
      setFilteredBills(bills);
    } else {
      const filtered = bills.filter((bill) => bill.bill_type === selectType);
      setFilteredBills(filtered);
    }
  }, [selectType, bills]);

  const handlePayClick = (billId) => {
    navigate(`/bills/pay/${billId}`);
  };

  const handleFilterChange = (type) => {
    setSelectedType(type);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Mother div */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Bills</h1>

        {/* Filter Dropdown */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn m-1">
            Filter by:{" "}
            {selectType.charAt(0).toUpperCase() + selectType.slice(1)}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="ml-2"
              viewBox="0 0 16 16"
            >
              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            {billTypes.map((type) => (
              <li key={type}>
                <a
                  onClick={() => handleFilterChange(type)}
                  className={selectType === type ? "active" : ""}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* cards */}
      {/* Bill Cards */}
      <div className="grid grid-cols-1 gap-6">
        {filteredBills.length > 0 ? (
          filteredBills.map((bill) => {
            const isPaid = paidBills.includes(bill.id);
            return (
              <div
                key={bill.id}
                className="bg-white rounded-xl shadow-2xl p-3 flex items-center justify-between lg:p-6 transition-all hover:shadow-xl"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={bill.icon}
                    alt={bill.bill_type}
                    className="w-10 h-10 object-contain"
                  />
                  <div>
                    <h2 className="text-xl font-semibold">
                      {bill.organization} - {bill.bill_type}
                    </h2>
                    <p className="text-gray-600">
                      Due Date: {format(new Date(bill.due_date), "PPP")}
                    </p>
                    <p className="text-gray-800 font-bold">
                      {bill.amount.toLocaleString()} BDT
                    </p>
                  </div>
                </div>
                {isPaid ? (
                  <FaCheckCircle className="text-green-500 text-3xl" />
                ) : (
                  <button
                    onClick={() => handlePayClick(bill.id)}
                    className="btn btn-primary"
                  >
                    Pay
                  </button>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-8">
            <p className="text-lg text-gray-500">
              No bills found for this category
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BillBoard;
