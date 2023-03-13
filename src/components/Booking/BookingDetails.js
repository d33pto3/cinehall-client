import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchBookingById } from "../features/bookings/bookingsSlice";

const BookingDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const booking = useSelector((state) => state.bookings.booking);
  const status = useSelector((state) => state.bookings.status);
  const error = useSelector((state) => state.bookings.error);

  useEffect(() => {
    dispatch(fetchBookingById(id));
  }, [dispatch, id]);

  if (status === "loading") {
    return <div>Loading...</div>;
  } else if (status === "failed") {
    return <div>Error: {error}</div>;
  } else if (!booking) {
    return <div>No booking found</div>;
  } else {
    return (
      <div>
        <h2>Booking Details</h2>
        <p>Movie: {booking.movie.title}</p>
        <p>Show Time: {booking.showTime}</p>
        <p>Name: {booking.customerName}</p>
        <p>Email: {booking.customerEmail}</p>
        <p>Phone: {booking.customerPhone}</p>
        <p>Seats: {booking.seats.join(", ")}</p>
      </div>
    );
  }
};

export default BookingDetails;
