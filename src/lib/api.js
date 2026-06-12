const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const AUTH_CHANGED_EVENT = "auth-state-changed";

const showToast = async (type, message) => {
  if (typeof window === "undefined") return;
  const { toast } = await import("react-toastify");
  toast[type](message);
};

const dispatchAuthChanged = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(AUTH_CHANGED_EVENT));
  }
};

export function getToken() {
  return typeof window !== "undefined" ? localStorage.getItem("token") : null;
}

export function getUser() {
  if (typeof window === "undefined") return null;
  const userStr = localStorage.getItem("user");
  if (!userStr) return null;

  try {
    return JSON.parse(userStr);
  } catch {
    localStorage.removeItem("user");
    return null;
  }
}

export function isAuthenticated() {
  return typeof window !== "undefined" ? !!localStorage.getItem("token") : false;
}

export function setAuthStorage(token, user) {
  if (typeof window === "undefined") return;

  if (token !== undefined) {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }

  if (user !== undefined) {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }

  dispatchAuthChanged();
}

export function clearAuthStorage() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatchAuthChanged();
  }
}

async function handleUnauthorized() {
  if (typeof window !== "undefined") {
    clearAuthStorage();
    showToast("error", "Session expired, please login again").catch(() => {});
    if (window.location.pathname !== "/login") {
      window.location.href = "/login";
    }
  }
}

async function request(url, options = {}) {
  if (options.requireAuth && !getToken()) {
    if (typeof window !== "undefined") {
      showToast("error", "Please login first").catch(() => {});
      window.location.href = "/login";
    }
    const error = new Error("Please login first");
    error.name = "UnauthorizedRequestError";
    throw error;
  }

  const fetchOptions = { ...options };
  delete fetchOptions.requireAuth;
  const token = fetchOptions.skipAuth ? null : getToken();
  delete fetchOptions.skipAuth;
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(fetchOptions.headers || {}),
  };

  const res = await fetch(url, {
    ...fetchOptions,
    headers,
    cache: fetchOptions.cache ?? "no-store",
  });

  const contentType = res.headers.get("content-type");
  const data =
    contentType && contentType.includes("application/json")
      ? await res.json()
      : {};

  if (res.status === 401) {
    await handleUnauthorized();
    throw new Error(data.message || "Unauthorized");
  }

  if (!res.ok) {
    throw new Error(data.message || `Request failed with status ${res.status}`);
  }

  return data;
}

export async function loginUser(credentials) {
  const data = await request(`${API_BASE}/login`, {
    method: "POST",
    body: JSON.stringify(credentials),
    skipAuth: true,
  });

  if (!data.token || !data.user) {
    throw new Error(data.message || "Login response missing token or user");
  }

  setAuthStorage(data.token, data.user);
  return data;
}

export async function registerUser(userData) {
  const data = await request(`${API_BASE}/register`, {
    method: "POST",
    body: JSON.stringify(userData),
    skipAuth: true,
  });

  if (!data.token || !data.user) {
    throw new Error(data.message || "Register response missing token or user");
  }

  setAuthStorage(data.token, data.user);
  return data;
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
    requireAuth: true,
  });
}

export async function updateTutor(id, tutorData) {
  return request(`${API_BASE}/tutors/${id}`, {
    method: "PATCH",
    body: JSON.stringify(tutorData),
    requireAuth: true,
  });
}

export async function deleteTutor(id) {
  return request(`${API_BASE}/tutors/${id}`, {
    method: "DELETE",
    requireAuth: true,
  });
}

export async function createBooking(bookingData) {
  return request(`${API_BASE}/bookings`, {
    method: "POST",
    body: JSON.stringify(bookingData),
    requireAuth: true,
  });
}

export async function fetchBookings(email) {
  const url = email ? `${API_BASE}/bookings/${email}` : `${API_BASE}/bookings`;
  return request(url, {
    method: "GET",
    requireAuth: true,
  });
}

export async function updateBookingStatus(id, status) {
  const url =
    status === "Confirmed"
      ? `${API_BASE}/bookings/confirm/${id}`
      : `${API_BASE}/bookings/${id}`;

  return request(url, {
    method: "PATCH",
    body: JSON.stringify({ status }),
    requireAuth: true,
  });
}

export async function getMyTutors(email) {
  return request(`${API_BASE}/my-tutors/${email}`, {
    cache: "no-store",
    requireAuth: true,
  });
}

export const fetchMyTutors = getMyTutors;
export { AUTH_CHANGED_EVENT };
