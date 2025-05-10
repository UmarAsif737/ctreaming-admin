import React from "react";

interface ProfileCardProps {
  name: string;
  email: string;
  type: string;
  phone: string;
  city: string;
  address: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  email,
  type,
  phone,
  city,
  address,
}) => {
  return (
    <div className="bg-[#f3f3f3] dark:bg-[#18181b] text-black p-6 rounded-3xl shadow-custom-black dark:shadow-custom-white border border-black dark:border-white min-w-xl">
      <h2 className="text-2xl font-medium mb-4 text-gray-700 dark:text-gray-200">
        Personal Information
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600 dark:text-gray-300 border-t border-black dark:border-white py-4 first:border-t-0 border-opacity-50">
        <div>
          <p>
            <span className="font-semibold">Name:</span> {name}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {email}
          </p>
          <p>
            <span className="font-semibold">Type:</span> {type}
          </p>
        </div>
        <div>
          <p>
            <span className="font-semibold">Phone:</span> {phone}
          </p>
          <p>
            <span className="font-semibold">City:</span> {city}
          </p>
          <p>
            <span className="font-semibold">Address:</span> {address || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
