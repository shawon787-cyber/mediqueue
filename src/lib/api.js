const API_BASE = "http://localhost:5000";

export async function fetchTutors(search = "", startDate = "", endDate = "") {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (startDate) params.set("startDate", startDate);
  if (endDate) params.set("endDate", endDate);

  const res = await fetch(`${API_BASE}/tutors?${params.toString()}`, {
    cache: "no-store",
  });
  return res.json();
}

export async function fetchTutorById(id) {
  const res = await fetch(`${API_BASE}/tutors/${id}`, {
    cache: "no-store",
  });
  return res.json();
}

export async function createTutor(tutorData) {
  const res = await fetch(`${API_BASE}/tutors`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tutorData),
  });
  return res.json();
}

export async function deleteTutor(id) {
  const res = await fetch(`${API_BASE}/tutors/${id}`, {
    method: "DELETE",
  });
  return res.json();
}

export async function createBooking(bookingData) {
  const res = await fetch(`${API_BASE}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookingData),
  });
  return res.json();
}

export async function fetchBookings(email) {
  const url = email ? `${API_BASE}/bookings/${email}` : `${API_BASE}/bookings`;
  const res = await fetch(url);
  return res.json();
}

export async function updateBookingStatus(id, status) {
  const url = status === "Confirmed"
    ? `${API_BASE}/bookings/confirm/${id}`
    : `${API_BASE}/bookings/${id}`;
  const res = await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  return res.json();
}