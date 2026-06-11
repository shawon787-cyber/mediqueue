const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const getAuthHeader = () => {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("token");
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
};

const handleUnauthorized = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
  window.location.href = "/Login";
};

async function request(url, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...getAuthHeader(),
    ...(options.headers || {}),
  };

  const res = await fetch(url, {
    ...options,
    headers,
  });

  if (res.status === 401 || res.status === 403) {
    handleUnauthorized();
    throw new Error("Unauthorized");
  }

  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return res.json();
  }
  return res;
}

export async function getTutors(search = "", startDate = "", endDate = "") {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (startDate) params.set("startDate", startDate);
  if (endDate) params.set("endDate", endDate);

  return request(`${API_BASE}/tutors?${params.toString()}`, {
    cache: "no-store",
  });
}

export const fetchTutors = getTutors;

export async function fetchTutorById(id) {
  return request(`${API_BASE}/tutors/${id}`, {
    cache: "no-store",
  });
}

export async function createTutor(tutorData) {
  return request(`${API_BASE}/tutors`, {
    method: "POST",
    body: JSON.stringify(tutorData),
  });
}

export async function updateTutor(id, tutorData) {
  return request(`${API_BASE}/tutors/${id}`, {
    method: "PATCH",
    body: JSON.stringify(tutorData),
  });
}

export async function deleteTutor(id) {
  return request(`${API_BASE}/tutors/${id}`, {
    method: "DELETE",
  });
}

export async function createBooking(bookingData) {
  return request(`${API_BASE}/bookings`, {
    method: "POST",
    body: JSON.stringify(bookingData),
  });
}

export async function fetchBookings(email) {
  const url = email ? `${API_BASE}/bookings/${email}` : `${API_BASE}/bookings`;
  return request(url, { method: "GET" });
}

export async function updateBookingStatus(id, status) {
  const url =
    status === "Confirmed"
      ? `${API_BASE}/bookings/confirm/${id}`
      : `${API_BASE}/bookings/${id}`;

  return request(url, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export async function getMyTutors(email) {
  return request(`${API_BASE}/my-tutors/${email}`, {
    cache: "no-store",
  });
}

export const fetchMyTutors = getMyTutors;

export function getToken() {
  return typeof window !== "undefined" ? localStorage.getItem("token") : null;
}

export function getUser() {
  if (typeof window === "undefined") return null;
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
}

export function isAuthenticated() {
  return typeof window !== "undefined" ? !!localStorage.getItem("token") : false;
}