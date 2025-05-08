import { useLoaderData, useNavigate } from "react-router";
import { format } from "date-fns";

const BillBoard = () => {
  const bills = useLoaderData();
  const navigate = useNavigate();

  const handlePayClick = (billId) => {
    navigate(`/bills/pay/${billId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Mother div */}
      <div>
        <h1 className="text-3xl font-bold text-center mb-8">Bills</h1>
      </div>
      {/* cards */}
      <div className="grid grid-cols-1 gap-6">
        {bills.map((bill) => (
          <div
            key={bill.id}
            className="bg-white rounded-xl shadow-2xl p-3 flex items-center justify-between lg:p-6"
          >
            <div className="flex items-center space-x-4">
              <img
                src={bill.icon}
                alt="{bill.bill_type}"
                className="w-10 h-10 object-contain"
              />
              <div>
                <h2 className="text-xl font-semibold">
                  {bill.organization} - {bill.bill_type}
                </h2>
                <p className="text-gray-600">
                  Due Date: {format(new Date(bill.due_date), "PPP")}
                </p>
                {/* Format and display the amount */}
                <p className="text-gray-800 font-bold">
                  {bill.amount.toLocaleString()} BDT
                </p>
              </div>
            </div>
            <button
              onClick={() => handlePayClick(bill.id)}
              className="btn btn-primary"
            >
              Pay
            </button>
          </div>
        ))}
      </div>
      {/* cards */}
      {/* Mother div */}
    </div>
  );
};

export default BillBoard;
