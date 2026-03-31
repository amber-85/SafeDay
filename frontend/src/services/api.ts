// src/services/api.ts

const BASE_URL = "http://localhost:3000/api";

/**
 * Helper to get JWT token from localStorage
 */
const getToken = () => localStorage.getItem("token");

/**
 * Helper to add headers including Authorization
 */
const getHeaders = (isJson = true) => {
  const headers: Record<string, string> = {};

  if (isJson) {
    headers["Content-Type"] = "application/json";
  }

  const token = getToken();
  if (token){
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

/**
 * ======================
 * AUTH
 * ======================
 */
export const signup = async (data: { phone_number: string; name?: string; password: string }) => {
  const res = await fetch(`${BASE_URL}/users/signup`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
};

export const login = async (data: { phone_number: string; password: string }) => {
  const res = await fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
};

/**
 * ======================
 * USER
 * ======================
 */
export const getUser = async (id: string) => {
  const res = await fetch(`${BASE_URL}/users/${id}`, { headers: getHeaders(false) });
  return res.json();
};

export const updateUser = async (id: string, data: { name?: string; phone_number?: string; password?: string }) => {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
};

/**
 * ======================
 * CHECK-IN
 * ======================
 */
// services/checkin.ts
export const checkIn = async () => {
  const res = await fetch(`${BASE_URL}/checkins`, {
    method: "POST",
    headers: getHeaders(),
  });

  return res.json();
};

// get last check-in time for elder
export const getElderLastCheckIn = async () => {
  const res = await fetch(`${BASE_URL}/checkins/last`, { 
    method: "GET",
    headers: getHeaders(false) });
  return res.json();
};
/**
 * ======================
 * CONTACTS (ELDER SIDE)
 * ======================
 */


export const addContact = async (data: { contact_phone: string; contact_name?: string; relationship: string }) => {
  const res = await fetch(`${BASE_URL}/users/add-contact`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateContact = async (data: { contact_id: string; contact_name?: string; contact_phone?: string; relationship?: string }) => {
  const res = await fetch(`${BASE_URL}/users/add-contact`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteContact = async (contact_id: string) => {
  const res = await fetch(`${BASE_URL}/users/add-contact`, {
    method: "DELETE",
    headers: getHeaders(),
    body: JSON.stringify({ contact_id }),
  });
  return res.json();
};

export const getContacts = async () => {
  const res = await fetch(`${BASE_URL}/users/contacts`, { headers: getHeaders(false) });
  return res.json();
};

/**
 * ======================
 * ELDERS (CONTACT SIDE)
 * ======================
 */
export const addElder = async (data: { elder_phone: string; elder_name?: string; relationship: string }) => {
  const res = await fetch(`${BASE_URL}/users/add-elder`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateElder = async (data: { elder_id: string; elder_name?: string; elder_phone?: string; relationship?: string }) => {
  const res = await fetch(`${BASE_URL}/users/add-elder`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteElder = async (elder_id: string) => {
  const res = await fetch(`${BASE_URL}/users/add-elder`, {
    method: "DELETE",
    headers: getHeaders(),
    body: JSON.stringify({ elder_id }),
  });
  return res.json();
};

export const getElders = async () => {
  const res = await fetch(`${BASE_URL}/users/elders`, { headers: getHeaders(false) });
  return res.json();
};