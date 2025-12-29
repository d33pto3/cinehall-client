import axios from "axios";
import { IShow, IFetchSeatsResponse, IHoldSeatsResponse, IScreen, ISlot, ICreateBookingRequest, IBookingResponse, IPaymentInitiateResponse } from "./booking-types";

const getApiUrl = () => {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url) throw new Error("API URL is not defined in environment variables.");
  return url;
};

// Fetch available slots for a movie, date, and hall
export const fetchAvailableSlots = async (
  movieId: string,
  date: string,
  hallId?: string
): Promise<ISlot[]> => {
  const url = getApiUrl();
  const response = await axios.get(`${url}/show/showtime`, {
    params: { movieId, date, hallId },
  });
  return response.data.data.availableSlots;
};

// Fetch valid screens for a movie in a hall (date is optional)
export const fetchScreensByHallMovieDate = async (
  hallId: string,
  movieId: string,
  date?: string
): Promise<IScreen[]> => {
  const url = getApiUrl();
  const response = await axios.get(`${url}/screen/by-movie-hall-date`, {
    params: { hallId, movieId, date },
  });
  return response.data.data;
};

// Release seats held by a user
export const releaseSeats = async (
  showId: string,
  seatIds: string[],
  userId: string
): Promise<{ success: boolean; message: string; data: Record<string, unknown> }> => {
  const url = getApiUrl();
  const response = await axios.post(`${url}/seat/shows/${showId}/release`, {
    seatIds,
    userId,
  });
  return response.data;
};

// Book seats (confirm after payment)
export const bookSeats = async (
  showId: string,
  seatIds: string[],
  userId: string,
  bookingId?: string
): Promise<{ success: boolean; message: string; data: Record<string, unknown> }> => {
  const url = getApiUrl();
  const response = await axios.post(`${url}/seat/shows/${showId}/book`, {
    seatIds,
    userId,
    bookingId,
  });
  return response.data;
};

// Fetch show by ID
export const fetchShowById = async (showId: string): Promise<IShow> => {
   const url = getApiUrl();
   const response = await axios.get(`${url}/show/${showId}`);
   return response.data.data;
};

// Fetch a specific show by date, slot, and screen
export const fetchShowByDetails = async (params: { date: string, slot: string, screenId: string }): Promise<IShow | null> => {
  const url = getApiUrl();
  try {
    const response = await axios.get(`${url}/show/by-details`, { params });
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
};

// Fetch all shows (useful for general filters)
export const fetchShows = async (params: { movieId?: string, hallId?: string, date?: string, slot?: string }): Promise<IShow[]> => {
  const url = getApiUrl();
  const response = await axios.get(`${url}/show`, { params });
  return response.data.data || response.data;
};

// Fetch seats for a specific show
export const fetchSeatsByShow = async (showId: string): Promise<IFetchSeatsResponse> => {
  const url = getApiUrl();
  const response = await axios.get(`${url}/seat/shows/${showId}`);
  return response.data;
};

// Hold seats
export const holdSeats = async (
  showId: string, 
  seatIds: string[], 
  userId: string
): Promise<IHoldSeatsResponse> => {
  const url = getApiUrl();
  const response = await axios.post(
    `${url}/seat/shows/${showId}/hold`,
    { seatIds, userId },
    { withCredentials: true }
  );
  return response.data;
};

// Create a new booking
export const createBooking = async (
  bookingData: ICreateBookingRequest
): Promise<IBookingResponse> => {
  const url = getApiUrl();
  const response = await axios.post(`${url}/booking`, bookingData);
  return response.data;
};

// Initiate payment for a booking
export const initiatePayment = async (
  bookingId: string
): Promise<IPaymentInitiateResponse> => {
  const url = getApiUrl();
  const response = await axios.post(`${url}/booking/initiate/${bookingId}`);
  return response.data;
};
