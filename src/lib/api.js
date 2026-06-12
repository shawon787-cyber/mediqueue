const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const AUTH_CHANGED_EVENT = "auth-state-changed";

if (typeof window !== "undefined") {
  console.log("API URL:", API_BASE_URL);
}

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
  if (typeof window !== "undefined") {
    console.log("Request:", url);
  }
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

  let res;
  try {
    res = await fetch(url, {
      ...fetchOptions,
      headers,
      cache: fetchOptions.cache ?? "no-store",
    });
  } catch (networkError) {
    if (typeof window !== "undefined") {
      console.error("Network error:", networkError);
    }
    throw new Error("Network error - please check your connection");
  }

  const contentType = res.headers.get("content-type");
  const data =
    contentType && contentType.includes("application/json")
      ? await res.json().catch(() => ({}))
      : {};

  if (typeof window !== "undefined") {
    console.log("Response:", { status: res.status, data });
  }

  if (res.status === 400) {
    throw new Error(data.message || "Bad request");
  }

  if (res.status === 401) {
    await handleUnauthorized();
    throw new Error(data.message || "Unauthorized");
  }

  if (res.status === 403) {
    throw new Error(data.message || "Forbidden - access denied");
  }

  if (res.status === 404) {
    throw new Error(data.message || "Resource not found");
  }

  if (res.status === 500) {
    throw new Error(data.message || "Server error");
  }

  if (!res.ok) {
    throw new Error(data.message || `Request failed with status ${res.status}`);
  }

  return data;
}

export async function loginUser(credentials) {
  const data = await request(`${API_BASE_URL}/login`, {
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
  const data = await request(`${API_BASE_URL}/register`, {
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

  return request(`${API_BASE_URL}/tutors?${params.toString()}`, {
    cache: "no-store",
  });
}

export const fetchTutors = getTutors;

export async function fetchTutorById(id) {
  return request(`${API_BASE_URL}/tutors/${id}`, {
    cache: "no-store",
  });
}

export async function createTutor(tutorData) {
  return request(`${API_BASE_URL}/tutors`, {
    method: "POST",
    body: JSON.stringify(tutorData),
    requireAuth: true,
  });
}

export async function updateTutor(id, tutorData) {
  return request(`${API_BASE_URL}/tutors/${id}`, {
    method: "PATCH",
    body: JSON.stringify(tutorData),
    requireAuth: true,
  });
}

export async function deleteTutor(id) {
  return request(`${API_BASE_URL}/tutors/${id}`, {
    method: "DELETE",
    requireAuth: true,
  });
}

export async function createBooking(bookingData) {
  return request(`${API_BASE_URL}/bookings`, {
    method: "POST",
    body: JSON.stringify(bookingData),
    requireAuth: true,
  });
}

export async function fetchBookings(email) {
  // Backend GET /bookings endpoint - email is optional query param
  const params = new URLSearchParams();
  if (email) params.set("email", email);
  return request(`${API_BASE_URL}/bookings?${params.toString()}`, {
    method: "GET",
    requireAuth: true,
  });
}

export async function updateBookingStatus(id, status) {
  const url =
    status === "Confirmed"
      ? `${API_BASE_URL}/bookings/confirm/${id}`
      : `${API_BASE_URL}/bookings/${id}`;

  return request(url, {
    method: "PATCH",
    body: JSON.stringify({ status }),
    requireAuth: true,
  });
}

export async function getMyTutors(email) {
  return request(`${API_BASE_URL}/my-tutors`, {
    cache: "no-store",
    requireAuth: true,
  });
}

export const fetchMyTutors = getMyTutors;
export { AUTH_CHANGED_EVENT };
