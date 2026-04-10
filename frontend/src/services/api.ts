// src/services/api.ts

const BASE_URL = "http://localhost:3000/api";

// ======================
// HELPERS
// ======================
const getToken = () => localStorage.getItem("token");

const getHeaders = (isJson = true) => {
  const headers: Record<string, string> = {};

  if (isJson) headers["Content-Type"] = "application/json";

  const token = getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;

  return headers;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};
// ======================
// USER HELPERS
// ======================
export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const getUserRole = () => {
  const user = getCurrentUser();
  return user?.role || null;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};


// ======================
// CONTACTS (ELDER)
// ======================
export const getContacts = async () => {
  const res = await fetch(`${BASE_URL}/users/me/contacts`, {
    headers: getHeaders(false),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
};

export const addContact = async (data: {
  contact_phone: string;
  contact_name?: string;
  relationship: string;
}) => {
  const res = await fetch(`${BASE_URL}/users/me/contacts`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.error);
  return result;
};

export const updateContact = async (data: {
  contact_id: string;
  contact_name?: string;
  contact_phone?: string;
  relationship?: string;
}) => {
  const res = await fetch(
    `${BASE_URL}/users/me/contacts/${data.contact_id}`,
    {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify(data),
    }
  );
  const result = await res.json();
  if (!res.ok) throw new Error(result.error);
  return result;
};

export const deleteContact = async (contact_id: string) => {
  const res = await fetch(`${BASE_URL}/users/me/contacts/${contact_id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.error);
  return result;
};

// ======================
// ELDERS (CONTACT)
// ======================
export const getElders = async () => {
  const res = await fetch(`${BASE_URL}/users/me/elders`, {
    headers: getHeaders(false),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
};

export const addElder = async (data: {
  elder_phone: string;
  elder_name?: string;
  relationship: string;
}) => {
  const res = await fetch(`${BASE_URL}/users/me/elders`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.error);
  return result;
};

export const updateElder = async (data: {
  elder_id: string;
  elder_name?: string;
  elder_phone?: string;
  relationship?: string;
}) => {
  const res = await fetch(
    `${BASE_URL}/users/me/elders/${data.elder_id}`,
    {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify(data),
    }
  );
  const result = await res.json();
  if (!res.ok) throw new Error(result.error);
  return result;
};

export const deleteElder = async (elder_id: string) => {
  const res = await fetch(`${BASE_URL}/users/me/elders/${elder_id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.error);
  return result;
};

// get profile
export const getProfile = async () => {
  const res = await fetch(`${BASE_URL}/users/me/profile`, {
    headers: getHeaders(false),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error);

  return data;
};

// get last check-in time
export const getLastCheckIn = async () => {
  const res = await fetch(`${BASE_URL}/checkins/last`, {
    method: "GET",
    headers: getHeaders(false),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error);

  return data;
};