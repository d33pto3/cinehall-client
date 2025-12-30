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
  IconSettings,
  IconHistory,
  IconCreditCard,
  IconLogout,
} from "@tabler/icons-react";
import axiosInstance from "@/lib/axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { logoutUser } from "@/lib/auth-actions";
import Image from "next/image";

interface PopulatedBooking {
  _id: string;
  movieId: {
    title: string;
    imageUrl: string;
  };
  showId: {
    startTime: string;
    endTime: string;
  };
  seats: {
    seatNumber: string;
  }[];
  totalPrice: number;
  paymentStatus: string;
  createdAt: string;
}

export default function ProfilePage() {
  const { id } = useParams();
  const { user, refreshUser, loading: authLoading } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<PopulatedBooking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  const formatTime = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return dateStr;
    }
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoadingBookings(true);
        const response = await axiosInstance.get(`/booking/user/${id}`);
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
    } else if (user && user._id !== id) {
       router.push(`/profile/${user._id}`);
    }
  }, [user, id, router]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      await refreshUser();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1A1A1A]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#FAAA47]"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-semibold";
    switch (status.toLowerCase()) {
      case "paid":
      case "confirmed":
        return `${baseClasses} bg-green-500/20 text-green-400 border border-green-500/30`;
      case "pending":
        return `${baseClasses} bg-yellow-500/20 text-yellow-400 border border-yellow-500/30`;
      case "failed":
      case "cancelled":
        return `${baseClasses} bg-red-500/20 text-red-400 border border-red-500/30`;
      default:
        return `${baseClasses} bg-gray-500/20 text-gray-400 border border-gray-500/30`;
    }
  };

  const upcomingBookings = bookings.filter(
    (b) => new Date(b.showId.startTime) >= new Date()
  );

  return (
    <div className="min-h-screen bg-transparent pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Profile Header */}
        <div className="relative mb-12">
          <div className="h-48 w-full bg-gradient-to-r from-[#FAAA47] to-[#F97316] rounded-3xl opacity-20 absolute top-0 left-0 blur-3xl"></div>
          <div className="relative flex flex-col md:flex-row items-center md:items-end gap-6 p-8">
            <div className="w-32 h-32 rounded-2xl bg-[#2A2A2A] border-4 border-[#3A3A3A] flex items-center justify-center text-[#FAAA47] shadow-2xl">
              <IconUser size={64} />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold text-white mb-2">{user.username}</h1>
              <p className="text-[#CAC1C1] flex items-center justify-center md:justify-start gap-2">
                <IconMail size={18} className="text-[#FAAA47]" />
                {user.email}
              </p>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="border-[#3A3A3A] text-white hover:bg-[#3A3A3A]"
                onClick={() => router.push("/")}
              >
                Browse Movies
              </Button>
              <Button 
                className="bg-gradient-to-r from-[#FAAA47] to-[#F97316] text-white hover:opacity-90"
                onClick={handleLogout}
              >
                <IconLogout size={18} className="mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="bookings" className="space-y-8">
          <TabsList className="bg-[#2A2A2A]/50 border border-[#3A3A3A] p-1 h-auto gap-2">
            <TabsTrigger 
              value="bookings" 
              className="data-[state=active]:bg-[#FAAA47] data-[state=active]:text-white px-6 py-2.5 rounded-lg transition-all"
            >
              <IconTicket size={18} className="mr-2" />
              My Bookings
            </TabsTrigger>
            <TabsTrigger 
              value="settings" 
              className="data-[state=active]:bg-[#FAAA47] data-[state=active]:text-white px-6 py-2.5 rounded-lg transition-all"
            >
              <IconSettings size={18} className="mr-2" />
              Account Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {loadingBookings ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FAAA47]"></div>
                  <p className="text-[#CAC1C1] mt-4">Gathering your cinema history...</p>
                </div>
              ) : bookings.length === 0 ? (
                <Card className="bg-[#2A2A2A]/40 border-[#3A3A3A] text-center py-16">
                  <CardContent>
                    <div className="w-20 h-20 bg-[#3A3A3A] rounded-full flex items-center justify-center mx-auto mb-6">
                      <IconTicket size={40} className="text-[#6A6A6A]" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">No Bookings Yet</h3>
                    <p className="text-[#CAC1C1] mb-8 max-w-sm mx-auto">
                      You haven't booked any movies yet. Ready to experience the magic of cinema?
                    </p>
                    <Button 
                      className="bg-[#FAAA47] text-white hover:bg-[#F97316]"
                      onClick={() => router.push("/")}
                    >
                      Explore Trending Movies
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-8">
                  {/* Stats Row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-[#2A2A2A]/40 border-[#3A3A3A]">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[#CAC1C1] text-sm">Total Bookings</p>
                            <h4 className="text-2xl font-bold text-white">{bookings.length}</h4>
                          </div>
                          <div className="w-12 h-12 bg-[#FAAA47]/10 rounded-xl flex items-center justify-center text-[#FAAA47]">
                            <IconHistory size={24} />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-[#2A2A2A]/40 border-[#3A3A3A]">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[#CAC1C1] text-sm">Active Tickets</p>
                            <h4 className="text-2xl font-bold text-white">{upcomingBookings.length}</h4>
                          </div>
                          <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500">
                            <IconTicket size={24} />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-[#2A2A2A]/40 border-[#3A3A3A]">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[#CAC1C1] text-sm">Total Spent</p>
                            <h4 className="text-2xl font-bold text-white">৳{bookings.reduce((acc, curr) => acc + curr.totalPrice, 0).toFixed(2)}</h4>
                          </div>
                          <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">
                            <IconCreditCard size={24} />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Bookings List */}
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white mb-4">Your Cinema Journey</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {bookings.map((booking) => (
                        <div
                          key={booking._id}
                          className="group relative bg-[#2A2A2A]/40 border border-[#3A3A3A] rounded-2xl overflow-hidden hover:border-[#FAAA47]/50 transition-all duration-300"
                        >
                          <div className="flex gap-4 p-4">
                            <div className="relative w-24 h-36 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={booking.movieId?.imageUrl || "/placeholder-movie.jpg"}
                                alt={booking.movieId?.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 flex flex-col justify-between">
                              <div>
                                <div className="flex justify-between items-start">
                                  <h3 className="text-lg font-bold text-white group-hover:text-[#FAAA47] transition-colors line-clamp-1">
                                    {booking.movieId?.title}
                                  </h3>
                                  <span className={getStatusBadge(booking.paymentStatus)}>
                                    {booking.paymentStatus.toUpperCase()}
                                  </span>
                                </div>
                                <div className="mt-2 space-y-1">
                                  <div className="flex items-center text-sm text-[#CAC1C1]">
                                    <IconCalendar size={14} className="mr-2 text-[#FAAA47]" />
                                    {new Date(booking.showId.startTime).toLocaleDateString(undefined, {
                                      weekday: 'short',
                                      month: 'short',
                                      day: 'numeric'
                                    })}
                                  </div>
                                  <div className="flex items-center text-sm text-[#CAC1C1]">
                                    <IconClock size={14} className="mr-2 text-[#FAAA47]" />
                                    {formatTime(booking.showId.startTime)} - {formatTime(booking.showId.endTime)}
                                  </div>
                                  <div className="flex items-center text-sm text-[#CAC1C1]">
                                    <IconMapPin size={14} className="mr-2 text-[#FAAA47]" />
                                    Seats: {booking.seats.map(s => s.seatNumber).join(", ")}
                                  </div>
                                </div>
                              </div>
                              <div className="flex justify-between items-end mt-2 pt-2 border-t border-[#3A3A3A]">
                                <span className="text-xs text-[#6A6A6A]">
                                  ID: {booking._id.slice(-8).toUpperCase()}
                                </span>
                                <span className="text-[#FAAA47] font-bold">
                                  ৳{booking.totalPrice.toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="bg-[#2A2A2A]/40 border-[#3A3A3A]">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Profile Information</CardTitle>
                <CardDescription className="text-[#CAC1C1]">
                  Update your account details and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-[#CAC1C1]">Username</label>
                    <div className="w-full bg-[#1A1A1A] border border-[#3A3A3A] rounded-lg p-3 text-white">
                      {user.username}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-[#CAC1C1]">Email Address</label>
                    <div className="w-full bg-[#1A1A1A] border border-[#3A3A3A] rounded-lg p-3 text-white">
                      {user.email}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-[#CAC1C1]">Phone Number</label>
                    <div className="w-full bg-[#1A1A1A] border border-[#3A3A3A] rounded-lg p-3 text-white">
                      {user.phone || "Not provided"}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-[#CAC1C1]">Account Role</label>
                    <div className="w-full bg-[#1A1A1A] border border-[#3A3A3A] rounded-lg p-3 text-[#FAAA47] font-semibold capitalize">
                      {user.role || "Member"}
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-[#3A3A3A] flex justify-end">
                  <Button className="bg-[#FAAA47] text-white hover:bg-[#F97316]">
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
