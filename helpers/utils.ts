import moment from "moment";

export const capitalize = (str: string): string => {
	if (!str) return ""; // Handle empty or undefined strings
	return str.charAt(0).toUpperCase() + str.slice(1);
};

