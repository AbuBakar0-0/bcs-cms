export const placeholder = ({ title }) => {
  if (/phone|ph|fax/i.test(title)) {
    return "(___) ___-____";
  } else if (/email/i.test(title)) {
    return "yourname@example.com";
  }

  switch (title) {
    case "DOB":
      return "MM/DD/YYYY";

    case "SSN":
      return "___-__-____";

    case "Zip":
      return "_____-____";

    default:
      return "";
  }
};
