const API_BASE = "http://localhost:5000";

const getAuthHeader = () => {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("token");
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
};

const handleUnauthorized = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
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

export async function fetchTutors(search = "", startDate = "", endDate = "") {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (startDate) params.set("startDate", startDate);
  if (endDate) params.set("endDate", endDate);

  const res = await fetch(`${API_BASE}/tutors?${params.toString()}`, {
    cache: "no-store",
  });

  if (res.status === 401 || res.status === 403) {
    handleUnauthorized();
  }

  return res.json();
}

export async function fetchTutorById(id) {
  const res = await fetch(`${API_BASE}/tutors/${id}`, {
    cache: "no-store",
  });

  if (res.status === 401 || res.status === 403) {
    handleUnauthorized();
  }

  return res.json();
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
  const res = await fetch(url);

  if (res.status === 401 || res.status === 403) {
    handleUnauthorized();
  }

  return res.json();
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

export async function fetchMyTutors(email) {
  const res = await fetch(`${API_BASE}/my-tutors/${email}`, {
    cache: "no-store",
    headers: getAuthHeader(),
  });

  if (res.status === 401 || res.status === 403) {
    handleUnauthorized();
  }

  return res.json();
}

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
