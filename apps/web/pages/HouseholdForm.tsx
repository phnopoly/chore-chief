import React, { useState } from "react";

interface HouseholdFormProps {
  onSubmit: (data: { householdSize: number; houseType: string }) => void;
}

const HouseholdForm: React.FC<HouseholdFormProps> = ({ onSubmit }) => {
  const [householdSize, setHouseholdSize] = useState<number>(1);
  const [houseType, setHouseType] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!houseType) return;
    onSubmit({ householdSize, houseType });
  };

  return (
    <div className="bg-gray-50 px-8 py-10 mx-auto max-w-3xl flex justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-xs">
        <h1 className="text-3xl font-bold text-center mb-8">Household Info</h1>
        <div className="mb-6">
          <label className="block font-medium mb-2">How many people will be doing chores under this household?</label>
          <input
            type="number"
            min={1}
            max={10}
            value={householdSize}
            onChange={(e) => setHouseholdSize(Number(e.target.value))}
            className="border p-2 rounded w-24 text-center"
          />
        </div>
        <div className="mb-6">
          <label className="block font-medium mb-2">What kind of home is it?</label>
          <select
            value={houseType}
            onChange={(e) => setHouseType(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">Select...</option>
            <option value="apartment">Apartment / Condo</option>
            <option value="house">Single-family House</option>
            <option value="shared">Shared Rental</option>
            <option value="townhouse">Townhouse</option>
            <option value="dorm">Dorm / Studio</option>
          </select>
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={!houseType}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-300"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default HouseholdForm;
