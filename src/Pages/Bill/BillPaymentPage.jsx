import React, { useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router";
import useAuth from "../../Hooks/useAuth";

const BillPaymentPage = () => {
  const { billId } = useParams();
  const bills = useLoaderData();
  console.log(bills);
  const [selectedBill, setSelectedBill] = useState(null);
  const { user, userBalance, setUserBalance } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <div>
        <h1>Bill Payment Page</h1>
        <p>You're paying for bill ID: {billId}</p>
      </div>
    </div>
  );
};

export default BillPaymentPage;
