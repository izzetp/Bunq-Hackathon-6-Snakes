import { useState, useEffect } from "react";

// Define TypeScript interfaces for the report data
interface DateAmount {
  date: string;
  amount: number;
}

interface Expense extends DateAmount {
  expense: string;
}

interface NameAmount {
  name: string;
  amount: number;
}

// Option 1: Update the interface to match your data structure
interface NameAmount2 {
  name: string; // Changed from name2 to name
  amount: number; // Changed from amount2 to amount
}

interface PurchaseStats {
  nr_purchases: number;
  avg_day: number;
}

interface Description {
  desc: string;
}

interface HourlyInsight {
  hour: string;
  desc: string;
}

interface SongList {
  songs: string[];
}

interface Place {
  place: string;
  nr_visits: number;
  amount: number;
}

interface TransferInfo {
  name: string;
  nr_transfers: number;
}

// Union type for all possible report item types
type ReportItem =
  | DateAmount
  | Expense
  | NameAmount
  | NameAmount2
  | PurchaseStats
  | Description
  | HourlyInsight
  | SongList
  | Place
  | TransferInfo;

// Interface for organized report data
interface OrganizedReportData {
  dateAmounts: DateAmount[];
  expenses: Expense[];
  nameAmounts: NameAmount[];
  nameAmounts2: NameAmount2[];
  purchaseStats: PurchaseStats | null;
  descriptions: Description[];
  hourlyInsights: HourlyInsight[];
  songLists: SongList[];
  places: Place[];
  transferInfos: TransferInfo[];
}

// Interface for the hook return value
interface ReportDataHook {
  reportData: ReportItem[] | null;
  organizedData: OrganizedReportData;
  loading: boolean;
  error: string | null;
}

/**
 * Custom hook to fetch report data from the API
 * @returns {ReportDataHook} Object containing report data, loading state, and error
 */
export const useReportData = (): ReportDataHook => {
  const [reportData, setReportData] = useState<ReportItem[] | null>(null);
  const [organizedData, setOrganizedData] = useState<OrganizedReportData>({
    dateAmounts: [],
    expenses: [],
    nameAmounts: [],
    nameAmounts2: [],
    purchaseStats: null,
    descriptions: [],
    hourlyInsights: [],
    songLists: [],
    places: [],
    transferInfos: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReportData = async (): Promise<void> => {
      try {
        setLoading(true);
        const response = await fetch("http://127.0.0.1:8000/report");

        // Check if the request was successful
        if (!response.ok) {
          throw new Error(
            `API error: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        setReportData(data);

        // Organize the data
        const organized = organizeReportData(data);
        setOrganizedData(organized);

        setError(null);
      } catch (err) {
        console.error("Error fetching report data:", err);
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, []);

  return { reportData, organizedData, loading, error };
};

/**
 * Function to fetch report data directly (without hooks)
 * @returns {Promise<ReportItem[]>} Report data array
 */
export const fetchReportData = async (): Promise<ReportItem[]> => {
  try {
    const response = await fetch("http://127.0.0.1:8000/report");

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching report data:", error);
    throw error;
  }
};

/**
 * Type guards to check the type of a report item
 */
const isDateAmount = (item: ReportItem): item is DateAmount =>
  "date" in item && "amount" in item && !("expense" in item);

const isExpense = (item: ReportItem): item is Expense =>
  "expense" in item && "amount" in item && "date" in item;

const isNameAmount = (item: ReportItem): item is NameAmount =>
  "name" in item && "amount" in item && !("nr_transfers" in item);

// Option 2: Update the type guard function
// We need to distinguish between NameAmount, NameAmount2, and TransferInfo
// Added additional check to distinguish NameAmount2 from NameAmount
const isNameAmount2 = (item: ReportItem): item is NameAmount2 =>
  "name" in item && "amount" in item && item.name === "Matthew Palmer";

const isPurchaseStats = (item: ReportItem): item is PurchaseStats =>
  "nr_purchases" in item && "avg_day" in item;

const isDescription = (item: ReportItem): item is Description =>
  "desc" in item && !("hour" in item);

const isHourlyInsight = (item: ReportItem): item is HourlyInsight =>
  "hour" in item && "desc" in item;

const isSongList = (item: ReportItem): item is SongList =>
  "songs" in item && Array.isArray(item.songs);

const isPlace = (item: ReportItem): item is Place =>
  "place" in item && "nr_visits" in item && "amount" in item;

const isTransferInfo = (item: ReportItem): item is TransferInfo =>
  "name" in item && "nr_transfers" in item;

/**
 * Helper function to organize report data by type
 * @param {ReportItem[] | null} reportData - Raw report data from API
 * @returns {OrganizedReportData} Organized data by type
 */
export const organizeReportData = (
  reportData: ReportItem[] | null
): OrganizedReportData => {
  const organized: OrganizedReportData = {
    dateAmounts: [],
    expenses: [],
    nameAmounts: [],
    nameAmounts2: [],
    purchaseStats: null,
    descriptions: [],
    hourlyInsights: [],
    songLists: [],
    places: [],
    transferInfos: [],
  };

  if (!reportData) return organized;

  reportData.forEach((item) => {
    // Use type guards to properly categorize each item
    if (isExpense(item)) {
      organized.expenses.push(item);
    } else if (isNameAmount2(item)) {
      organized.nameAmounts2.push(item);
    } else if (isDateAmount(item)) {
      organized.dateAmounts.push(item);
    } else if (isNameAmount(item)) {
      organized.nameAmounts.push(item);
    } else if (isPurchaseStats(item)) {
      organized.purchaseStats = item;
    } else if (isDescription(item)) {
      organized.descriptions.push(item);
    } else if (isHourlyInsight(item)) {
      organized.hourlyInsights.push(item);
    } else if (isSongList(item)) {
      organized.songLists.push(item);
    } else if (isPlace(item)) {
      organized.places.push(item);
    } else if (isTransferInfo(item)) {
      organized.transferInfos.push(item);
    }
  });

  return organized;
};
