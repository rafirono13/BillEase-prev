import React, { useState, useEffect } from "react";

const OrganizationShowcase = () => {
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    // Fetch data from bills.json
    fetch("/JSON/bills.json") // Assuming bills.json is in the public/JSON folder
      .then((response) => response.json())
      .then((data) => {
        // Extract unique organizations
        const uniqueOrganizations = Array.from(
          new Set(
            data.map((bill) =>
              JSON.stringify({
                name: bill.organization,
                logo: bill.organization_logo,
              })
            )
          )
        ).map((orgString) => JSON.parse(orgString));
        setOrganizations(uniqueOrganizations);
      })
      .catch((error) => console.error("Error fetching organizations:", error));
  }, []);

  return (
    <section className="my-10 w-full">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-primary">Our Partners</h2>
        <p className="text-sm text-gray-500">
          Organizations you can pay bills for.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {organizations.map((org, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-xl p-4 flex flex-col items-center justify-center transition-all duration-300 hover:scale-[1.02]"
          >
            <img
              src={org.logo}
              alt={org.name}
              className="w-20 h-20 object-contain mb-4"
            />
            <p className="text-lg font-semibold text-center">{org.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OrganizationShowcase;
