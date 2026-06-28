export const API_BASE = "http://localhost:8080/api";

export interface Studio {
  id: number | string;
  name: string;
  maxCapacity: number;
  equipmentList: string[] | string;
}

export interface Host {
  id: number | string;
  name: string;
  email: string;
}

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const err = new Error(`HTTP ${res.status}`) as Error & { status?: number };
    err.status = res.status;
    throw err;
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export const api = {
  getStudios: () => fetch(`${API_BASE}/studios`).then((r) => handle<Studio[]>(r)),
  createStudio: (data: { name: string; maxCapacity: number; equipmentList: string[] }) =>
    fetch(`${API_BASE}/studios`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => handle<Studio>(r)),

  getHosts: () => fetch(`${API_BASE}/hosts`).then((r) => handle<Host[]>(r)),
  createHost: (data: { name: string; email: string }) =>
    fetch(`${API_BASE}/hosts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => handle<Host>(r)),

  createBooking: (data: {
    studioId: string | number;
    hostId: string | number;
    startTime: string;
    endTime: string;
  }) =>
    fetch(`${API_BASE}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),
};
