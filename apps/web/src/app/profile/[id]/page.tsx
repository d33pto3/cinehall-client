"use client";

import { useAuth } from "@/context/AuthContext";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  IconUser,
  IconMail,
  IconPhone,
  IconTicket,
  IconCalendar,
  IconClock,
  IconMapPin,
} from "@tabler/icons-react";
import { Booking } from "@/lib/types";
import axiosInstance from "@/lib/axios";

export default function ProfilePage() {
  const { id } = useParams();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  useEffect(() => {
    if (!authLoading && (!user || user._id !== id)) {
      // router.push("/login");
    }
  }, [authLoading, user, id, router]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoadingBookings(true);
        const response = await axiosInstance.get(`/bookings/user/${id}`);
        setBookings(response.data.bookings || []);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
        setBookings([]);
      } finally {
        setLoadingBookings(false);
      }
    };

    if (user && user._id === id) {
      fetchBookings();
    }
  }, [user, id]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user || user._id !== id) {
    return null; // Will redirect in useEffect
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "text-green-400";
      case "pending":
        return "text-yellow-400";
      case "cancelled":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-semibold";
    switch (status) {
      case "confirmed":
        return `${baseClasses} bg-green-500/20 text-green-400 border border-green-500/30`;
      case "pending":
        return `${baseClasses} bg-yellow-500/20 text-yellow-400 border border-yellow-500/30`;
      case "cancelled":
        return `${baseClasses} bg-red-500/20 text-red-400 border border-red-500/30`;
      default:
        return `${baseClasses} bg-gray-500/20 text-gray-400 border border-gray-500/30`;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">My Profile</h1>
        <p className="text-[#CAC1C1]">Manage your account and view your bookings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Information Card */}
        <div className="lg:col-span-1">
          <Card className="bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] border-[#3A3A3A] shadow-xl">
            <CardHeader className="border-b border-[#3A3A3A]">
              <div className="flex items-center justify-center mb-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#FAAA47] to-[#F97316] flex items-center justify-center">
                  <IconUser size={48} className="text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl text-center text-white">
                {user.username}
              </CardTitle>
              <CardDescription className="text-center text-[#CAC1C1]">
                {user.role || "Member"}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center space-x-3 text-[#CAC1C1]">
                <IconMail size={20} className="text-[#FAAA47]" />
                <span className="text-sm break-all">{user.email}</span>
              </div>
              <div className="flex items-center space-x-3 text-[#CAC1C1]">
                <IconPhone size={20} className="text-[#FAAA47]" />
                <span className="text-sm">{user.phone || "Not provided"}</span>
              </div>
              <div className="pt-4">
                <Button
                  className="w-full bg-gradient-to-r from-[#FAAA47] to-[#F97316] hover:from-[#F97316] hover:to-[#FAAA47] text-white font-semibold"
                  onClick={() => router.push("/")}
                >
                  Book New Ticket
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Booking History */}
        <div className="lg:col-span-2">
          <Card className="bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] border-[#3A3A3A] shadow-xl">
            <CardHeader className="border-b border-[#3A3A3A]">
              <CardTitle className="text-2xl text-white flex items-center">
                <IconTicket className="mr-2 text-[#FAAA47]" size={28} />
                Booking History
              </CardTitle>
              <CardDescription className="text-[#CAC1C1]">
                View all your movie bookings
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {loadingBookings ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#FAAA47]"></div>
                  <p className="text-[#CAC1C1] mt-4">Loading bookings...</p>
                </div>
              ) : bookings.length === 0 ? (
                <div className="text-center py-12">
                  <IconTicket size={64} className="mx-auto text-[#3A3A3A] mb-4" />
                  <p className="text-[#CAC1C1] text-lg mb-2">No bookings yet</p>
                  <p className="text-[#6A6A6A] text-sm mb-6">
                    Start booking your favorite movies now!
                  </p>
                  <Button
                    className="bg-gradient-to-r from-[#FAAA47] to-[#F97316] hover:from-[#F97316] hover:to-[#FAAA47] text-white font-semibold"
                    onClick={() => router.push("/")}
                  >
                    Browse Movies
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div
                      key={booking._id}
                      className="bg-[#1A1A1A] border border-[#3A3A3A] rounded-lg p-4 hover:border-[#FAAA47] transition-all duration-300 hover:shadow-lg hover:shadow-[#FAAA47]/10"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-white font-semibold text-lg mb-1">
                            {booking.movieTitle}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-[#CAC1C1]">
                            <div className="flex items-center">
                              <IconCalendar size={16} className="mr-1 text-[#FAAA47]" />
                              {new Date(booking.showtime).toLocaleDateString()}
                            </div>
                            <div className="flex items-center">
                              <IconClock size={16} className="mr-1 text-[#FAAA47]" />
                              {new Date(booking.showtime).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                          </div>
                        </div>
                        <span className={getStatusBadge(booking.status)}>
                          {booking.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-[#3A3A3A]">
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="text-[#CAC1C1]">
                            <IconMapPin size={16} className="inline mr-1 text-[#FAAA47]" />
                            Seats: <span className="text-white font-medium">{booking.seats.join(", ")}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-[#CAC1C1] text-xs">Total Amount</p>
                          <p className="text-[#FAAA47] font-bold text-lg">
                            ৳{booking.totalAmount.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
