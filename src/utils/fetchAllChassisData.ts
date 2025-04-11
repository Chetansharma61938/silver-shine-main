import { supabase } from "@/lib/supabase";

// Fetch data based on customerId or return all data
const fetchDataFromTable = async (table: string, customerId?: string) => {
  let query = supabase.from(table).select("*");

  // If customerId is provided, filter by customerId
  if (customerId) {
    query = query
      .eq("customer_id", customerId)
      // .order("id", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(1); // assuming 'id' is the primary key
  }

  const { data, error } = await query;

  if (error) {
    console.error(`Error fetching from ${table}:`, error.message);
    return null;
  }

  // If no customerId, return all data
  return data || null;
};

const fetchAllChassisData = async (customerId?: string) => {
  const tables = [
    "bumpersandexterior",
    "chassiconfiguration",
    "chassiframe",
    "chassisdetails",
    "customsuspension",
    "model_type_details",
    "order_informations",
    "steplocation",
    "suspension",
    "wheelsandtyres",
    "extrasdetails",
    "contactdetails",
    "tankdetails",
  ];

  const results = await Promise.all(
    tables.map((table) => fetchDataFromTable(table, customerId))
  );

  // If customerId is provided, return the last record for that customer
  if (customerId) {
    const allData = results.reduce((acc, row, index) => {
      if (row && row.length > 0) {
        acc[tables[index]] = row[0]; // Only the last record (first one after sorting)
      }
      return acc;
    }, {} as Record<string, any>);
    return allData;
  }

  // If no customerId is provided, return all data
  const allData = results.reduce((acc, row, index) => {
    if (row) {
      acc[tables[index]] = row;
    }
    return acc;
  }, {} as Record<string, any>);

  return allData;
};

export default fetchAllChassisData;
