import React from "react";

interface SectionHeaderProps {
  title: string;
  description: string;
  className?: string;
}

const SectionHeadings: React.FC<SectionHeaderProps> = ({
  title,
  description,
  className = "",
}) => {
  return (
    <div className={`flex flex-col w-full text-center ${className}`}>
      <h2 className="text-xl sm:text-2xl md:text-3xl 2xl:text-4xl font-bold text-gray-800 dark:text-gray-100 ">
        {title}
      </h2>
      <p className="mt-6 text-sm xxl:text-base leading-5 text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </div>
  );
};

export default SectionHeadings;
