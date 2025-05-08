import React, { useState, useEffect } from "react";

const OrganizationShowcase = () => {
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    fetch("/JSON/bills.json")
      .then((res) => res.json())
      .then((data) => {
        const unique = Array.from(
          new Set(
            data.map((item) =>
              JSON.stringify({
                name: item.organization,
                logo: item.organization_logo,
              })
            )
          )
        ).map((str) => JSON.parse(str));
        setOrganizations(unique);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <section className="my-12 w-full">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-primary">Our Partners</h2>
        <p className="text-sm text-gray-500">
          Organizations you can pay bills for.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {organizations.map((org, i) => (
          <div
            key={i}
            className="bg-white w-40 sm:w-48 lg:w-56 p-4 rounded-2xl shadow-md hover:shadow-lg transition-all flex flex-col items-center"
          >
            <img
              src={org.logo}
              alt={org.name}
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain mb-3"
            />
            <p className="text-center text-sm sm:text-base font-semibold text-gray-700">
              {org.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OrganizationShowcase;
