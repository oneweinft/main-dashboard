import React, { createContext, useContext, useState, useCallback } from "react";

export type PropertyStatus = "occupied" | "vacant" | "maintenance" | "listed";
export type TransactionType = "income" | "expense";
export type TransactionStatus = "completed" | "pending" | "failed";
export type ContactType = "renter" | "provider" | "tradie";

export interface Property {
  id: string;
  address: string;
  suburb: string;
  state: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  rent: number;
  status: PropertyStatus;
  tenant?: string;
  owner: string;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  property: string;
  category: string;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  property?: string;
  status: "active" | "archived";
  contactType: ContactType;
}

export interface AILog {
  id: string;
  timestamp: string;
  query: string;
  response: string;
  source: "assistant" | "header-widget";
}

interface DataContextType {
  properties: Property[];
  transactions: Transaction[];
  contacts: Contact[];
  aiLogs: AILog[];
  addProperty: (p: Omit<Property, "id">) => void;
  addProperties: (ps: Omit<Property, "id">[]) => void;
  addTransaction: (t: Omit<Transaction, "id">) => void;
  addTransactions: (ts: Omit<Transaction, "id">[]) => void;
  addContact: (c: Omit<Contact, "id">) => void;
  addContacts: (cs: Omit<Contact, "id">[]) => void;
  addAILog: (log: Omit<AILog, "id">) => void;
}

const defaultProperties: Property[] = [
  { id: "p1", address: "24 Casterly Rock Dr", suburb: "Bondi", state: "NSW", type: "House", bedrooms: 4, bathrooms: 2, parking: 2, rent: 950, status: "occupied", tenant: "Sarah Mitchell", owner: "David Chen" },
  { id: "p2", address: "15 High St", suburb: "Southbank", state: "QLD", type: "Apartment", bedrooms: 2, bathrooms: 1, parking: 1, rent: 620, status: "occupied", tenant: "James Cooper", owner: "Maria Santos" },
  { id: "p3", address: "8 Park Ave", suburb: "Richmond", state: "VIC", type: "Townhouse", bedrooms: 3, bathrooms: 2, parking: 1, rent: 780, status: "vacant", owner: "Robert Taylor" },
  { id: "p4", address: "102 River Rd", suburb: "Parramatta", state: "NSW", type: "Apartment", bedrooms: 1, bathrooms: 1, parking: 1, rent: 480, status: "listed", owner: "David Chen" },
  { id: "p5", address: "56 Elm Cres", suburb: "Fitzroy", state: "VIC", type: "House", bedrooms: 5, bathrooms: 3, parking: 2, rent: 1200, status: "occupied", tenant: "Emma Wilson", owner: "Maria Santos" },
  { id: "p6", address: "9 Ocean Pde", suburb: "Manly", state: "NSW", type: "Unit", bedrooms: 2, bathrooms: 1, parking: 1, rent: 700, status: "maintenance", owner: "Robert Taylor" },
  { id: "p7", address: "33 King William St", suburb: "Adelaide", state: "SA", type: "Apartment", bedrooms: 3, bathrooms: 2, parking: 2, rent: 550, status: "occupied", tenant: "Liam O'Brien", owner: "David Chen" },
  { id: "p8", address: "12 Sunset Blvd", suburb: "Surfers Paradise", state: "QLD", type: "House", bedrooms: 4, bathrooms: 2, parking: 2, rent: 880, status: "vacant", owner: "Maria Santos" },
];

const defaultTransactions: Transaction[] = [
  { id: "t1", date: "2025-03-25", description: "Rent Payment", property: "24 Casterly Rock Dr", category: "Rent", type: "income", amount: 950, status: "completed" },
  { id: "t2", date: "2025-03-24", description: "Plumbing Repair", property: "8 Park Ave", category: "Maintenance", type: "expense", amount: 380, status: "completed" },
  { id: "t3", date: "2025-03-24", description: "Rent Payment", property: "15 High St", category: "Rent", type: "income", amount: 620, status: "completed" },
  { id: "t4", date: "2025-03-23", description: "Insurance Premium", property: "56 Elm Cres", category: "Insurance", type: "expense", amount: 245, status: "pending" },
  { id: "t5", date: "2025-03-22", description: "Rent Payment", property: "56 Elm Cres", category: "Rent", type: "income", amount: 1200, status: "completed" },
  { id: "t6", date: "2025-03-22", description: "Body Corporate Fees", property: "15 High St", category: "Admin", type: "expense", amount: 890, status: "completed" },
  { id: "t7", date: "2025-03-21", description: "Rent Payment", property: "33 King William St", category: "Rent", type: "income", amount: 550, status: "failed" },
  { id: "t8", date: "2025-03-20", description: "Property Inspection", property: "9 Ocean Pde", category: "Compliance", type: "expense", amount: 150, status: "completed" },
  { id: "t9", date: "2025-03-19", description: "Management Fee", property: "24 Casterly Rock Dr", category: "Admin", type: "expense", amount: 76, status: "completed" },
  { id: "t10", date: "2025-03-18", description: "Rent Payment", property: "9 Ocean Pde", category: "Rent", type: "income", amount: 700, status: "pending" },
];

const defaultContacts: Contact[] = [
  { id: "c1", name: "Sarah Mitchell", email: "sarah.m@email.com", phone: "0412 345 678", property: "24 Casterly Rock Dr", status: "active", contactType: "renter" },
  { id: "c2", name: "James Cooper", email: "j.cooper@email.com", phone: "0423 456 789", property: "15 High St", status: "active", contactType: "renter" },
  { id: "c3", name: "Emma Wilson", email: "emma.w@email.com", phone: "0434 567 890", property: "56 Elm Cres", status: "active", contactType: "renter" },
  { id: "c4", name: "David Chen", email: "d.chen@email.com", phone: "0456 789 012", status: "active", contactType: "provider" },
  { id: "c5", name: "Maria Santos", email: "m.santos@email.com", phone: "0467 890 123", status: "active", contactType: "provider" },
  { id: "c6", name: "Robert Taylor", email: "r.taylor@email.com", phone: "0478 901 234", status: "active", contactType: "provider" },
  { id: "c7", name: "Mike's Plumbing", email: "mike@plumbing.com", phone: "0489 012 345", status: "active", contactType: "tradie" },
  { id: "c8", name: "Spark Electrical", email: "info@sparkelectrical.com", phone: "0490 123 456", status: "active", contactType: "tradie" },
];

const DataContext = createContext<DataContextType | null>(null);

let idCounter = 100;
const genId = (prefix: string) => `${prefix}${++idCounter}`;

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [properties, setProperties] = useState<Property[]>(defaultProperties);
  const [transactions, setTransactions] = useState<Transaction[]>(defaultTransactions);
  const [contacts, setContacts] = useState<Contact[]>(defaultContacts);
  const [aiLogs, setAILogs] = useState<AILog[]>([]);

  const addProperty = useCallback((p: Omit<Property, "id">) => {
    setProperties((prev) => [...prev, { ...p, id: genId("p") }]);
  }, []);
  const addProperties = useCallback((ps: Omit<Property, "id">[]) => {
    setProperties((prev) => [...prev, ...ps.map((p) => ({ ...p, id: genId("p") }))]);
  }, []);
  const addTransaction = useCallback((t: Omit<Transaction, "id">) => {
    setTransactions((prev) => [{ ...t, id: genId("t") }, ...prev]);
  }, []);
  const addTransactions = useCallback((ts: Omit<Transaction, "id">[]) => {
    setTransactions((prev) => [...ts.map((t) => ({ ...t, id: genId("t") })), ...prev]);
  }, []);
  const addContact = useCallback((c: Omit<Contact, "id">) => {
    setContacts((prev) => [...prev, { ...c, id: genId("c") }]);
  }, []);
  const addContacts = useCallback((cs: Omit<Contact, "id">[]) => {
    setContacts((prev) => [...prev, ...cs.map((c) => ({ ...c, id: genId("c") }))]);
  }, []);
  const addAILog = useCallback((log: Omit<AILog, "id">) => {
    setAILogs((prev) => [{ ...log, id: genId("ai") }, ...prev]);
  }, []);

  return (
    <DataContext.Provider value={{ properties, transactions, contacts, aiLogs, addProperty, addProperties, addTransaction, addTransactions, addContact, addContacts, addAILog }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}
