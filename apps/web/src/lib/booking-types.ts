export enum Slots {
  MORNING = "MORNING",
  NOON = "NOON",
  AFTERNOON = "AFTERNOON",
  EVENING = "EVENING",
}

export const SlotDisplay: Record<Slots, string> = {
  [Slots.MORNING]: "10:00 AM",
  [Slots.NOON]: "01:00 PM",
  [Slots.AFTERNOON]: "04:00 PM",
  [Slots.EVENING]: "07:00 PM",
};

export enum SeatStatus {
  AVAILABLE = "available",
  BOOKED = "booked",
  BLOCKED = "blocked",
}

export enum PaymentStatus {
  PENDING = "pending",
  PAID = "paid",
  FAILED = "failed",
  CANCELLED = "cancelled",
}

export enum PaymentMethod {
  CARD = "card",
  BKASH = "bkash",
  NAGAD = "nagad",
}

export interface IShow {
  _id: string;
  movieId: string | { _id: string; title: string; duration: number; genre: string; posterUrl?: string };
  screenId: string | { _id: string; name: string; hallId: string }; // Updated to include hallId potentially
  startTime: string; // ISO Date string
  endTime: string; // ISO Date string
  basePrice: number;
  slot: Slots;
}

export interface IScreen {
  _id: string;
  name: string;
  hallId: string;
}

export interface IScreenResponse {
  success: boolean;
  message: string;
  count: number;
  data: IScreen[];
}

export interface ISeat {
  _id: string;
  showId: string;
  seatNumber: string;
  row: string;
  column: number;
  status: SeatStatus;
  isHeld: boolean;
  heldBy?: string;
  heldUntil?: string;
}

export interface IHoldSeatsResponse {
  success: boolean;
  message: string;
  data: {
    seatIds: string[];
    heldUntil: string;
  };
}

export interface IFetchSeatsResponse {
  success: boolean;
  message: string;
  count: number;
  data: {
    seats: ISeat[];
    screen: string | Record<string, unknown>;
  };
}

export interface ISlot {
  slot: Slots;
  showCount: number;
}

export interface IBooking {
  _id: string;
  userId?: string;
  guestId?: string;
  showId: string;
  screenId: string;
  movieId: string;
  seats: string[];
  totalPrice: number;
  paymentStatus: PaymentStatus;
  paymentMethod?: PaymentMethod;
  isCancelled: boolean;
  tran_id?: string;
  expiresAt: string;
}

export interface ICreateBookingRequest {
  userId?: string;
  guestId?: string;
  showId: string;
  screenId: string;
  movieId: string;
  seats: string[];
}

export interface IBookingResponse {
  success: boolean;
  message: string;
  data: IBooking;
}

export interface IPaymentInitiateResponse {
  success: boolean;
  message: string;
  url: string;
}
