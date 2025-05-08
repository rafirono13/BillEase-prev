import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { format } from "date-fns";

const BillPaymentPage = () => {
  const { billId } = useParams();
  const bills = useLoaderData();
  console.log(bills);
  const [selectedBill, setSelectedBill] = useState(null);
  const { user, userBalance, setUserBalance, paidBills, markBillAsPaid } =
    useAuth();
  const navigate = useNavigate();

  // finding the selected bill from the bills data
  useEffect(() => {
    const bill = bills.find((bill) => bill.id === billId);
    setSelectedBill(bill);
  }, [bills, billId]);

  const isPaid = paidBills.includes(billId);

  useEffect(() => {
    if (isPaid) {
      Swal.fire({
        icon: "info",
        title: "Already Paid",
        text: "This bill has already been paid!",
        confirmButtonColor: "#3085d6",
      });
    }
  }, [isPaid]);

  // bill handle
  const handlePay = () => {
    if (isPaid) return;
    if (userBalance < setSelectedBill.amount) {
      Swal.fire({
        icon: "error",
        title: "Insufficient Balance",
        text: "You don't have enough balance to pay this bill.",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    Swal.fire({
      title: "Confirm Payment",
      text: `Pay ${selectedBill.amount.toLocaleString()} BDT to ${selectedBill.organization}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, pay now!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Update balance
        const newBalance = userBalance - selectedBill.amount;
        setUserBalance(newBalance);
        markBillAsPaid(billId);

        // Show success message
        Swal.fire({
          icon: "success",
          title: "Payment Successful!",
          text: `You have successfully paid ${selectedBill.amount.toLocaleString()} BDT to ${selectedBill.organization}.`,
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          // Navigate back to bills page
          navigate("/bills");
        });
      }
    });
  };

  if (!selectedBill) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Bill Payment</h1>

        <div className="max-w-3xl mx-auto">
          {/* Bill Details Card */}
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            {/* Card Header */}
            <div className="bg-gradient-to-r from-primary to-accent p-6 text-white">
              <h2 className="text-2xl font-bold">Payment Details</h2>
            </div>

            {/* Card Body */}
            <div className="p-6 flex flex-col md:flex-row">
              {/* Left Side - Organization Logo */}
              <div className="md:w-1/3 flex flex-col items-center justify-center mb-6 md:mb-0 relative bg-gray-50 rounded-xl">
                <img
                  src={selectedBill.organization_logo}
                  alt={selectedBill.organization}
                  className="w-36 h-36 object-contain mb-4"
                />

                {/* Bill Type Icon (bottom right corner) */}
                <div className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md">
                  <img
                    src={selectedBill.icon}
                    alt={selectedBill.bill_type}
                    className="w-8 h-8 object-contain"
                  />
                </div>
              </div>

              {/* Right Side - Bill Information */}
              <div className="md:w-2/3 md:pl-6">
                <div className="space-y-4">
                  {/* Organization & Bill Type */}
                  <div>
                    <h3 className="text-2xl font-bold">
                      {selectedBill.organization}
                    </h3>
                    <p className="text-gray-600 capitalize">
                      {selectedBill.bill_type}
                    </p>
                  </div>

                  {/* Amount & Due Date */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Amount</p>
                      <p className="text-xl font-bold text-primary">
                        {selectedBill.amount.toLocaleString()} BDT
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Due Date</p>
                      <p className="text-md">
                        {format(new Date(selectedBill.due_date), "PPP")}
                      </p>
                    </div>
                  </div>

                  {/* Current Balance */}
                  <div className="pt-2">
                    <p className="text-sm text-gray-500">Your Balance</p>
                    <p className="text-xl font-semibold">
                      {userBalance.toLocaleString()} BDT
                    </p>
                  </div>

                  {/* Pay Button */}
                  <div className="pt-4">
                    <button
                      onClick={handlePay}
                      className="btn btn-primary w-full"
                      disabled={userBalance < selectedBill.amount || isPaid}
                    >
                      {isPaid ? "Already Paid" : "Pay Bill"}
                    </button>

                    {/* Insufficient Balance Warning */}
                    {userBalance < selectedBill.amount && (
                      <p className="text-red-500 text-sm mt-2">
                        You don't have enough balance to pay this bill.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/bills")}
              className="btn btn-ghost"
            >
              Back to Bills
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillPaymentPage;
