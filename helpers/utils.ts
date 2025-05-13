import moment from "moment";

export const capitalize = (str: string): string => {
	if (!str) return ""; // Handle empty or undefined strings
	return str.charAt(0).toUpperCase() + str.slice(1);
};

export function decodeHtmlEntities(text: string) {
	const textarea = document.createElement("textarea");
	textarea.innerHTML = text;
	return textarea.value;
}