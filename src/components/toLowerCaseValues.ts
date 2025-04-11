// utils/toLowerCaseValues.ts

const toLowerCaseValues = (obj: Record<string, any>) => {
  const lowered: Record<string, any> = {};
  for (const key in obj) {
    const value = obj[key];
    const lowerKey = key.toLowerCase(); // Convert the key to lowercase
    lowered[lowerKey] = typeof value === "string" ? value.toLowerCase() : value; // Convert value to lowercase if it's a string
  }
  return lowered;
};

export default toLowerCaseValues;
