export type InputTypes =
  | "text"
  | "email"
  | "password"
  | "number"
  | "tel"
  | "url"
  | "search"
  | "date"
  | "datetime-local"
  | "month"
  | "week"
  | "time"
  | "color";

export interface User {
  _id: string;
  username: string;
  email: string;
  phone: string;
  role?: string;
}

export interface Booking {
  _id: string;
  movieTitle: string;
  showtime: string;
  seats: string[];
  totalAmount: number;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}

