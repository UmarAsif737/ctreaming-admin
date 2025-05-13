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

export const FormatBudgetValue = (value: string) => {
  // Remove all non-digit characters except the decimal point
  const numeric = value.replace(/[^\d.]/g, "");

  // Format the number with commas
  const [integer, decimal] = numeric.split(".");
  const formatted = new Intl.NumberFormat("en-US").format(Number(integer || 0));

  return decimal ? `${formatted}.${decimal}` : `${formatted}`;
};
