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
import { Loader } from "@/components/shared/Loader";
import { Skeleton } from "@/components/ui/skeleton";

interface PopulatedBooking {
  _id: string;
  movieId: {
    title: string;
    imageUrl: string;
    releaseDate?: string;
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
        <Loader />
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
                className="border-[#3A3A3A] text-black hover:bg-[#3A3A3A] hover:text-white hover:cursor-pointer"
                onClick={() => router.push("/")}
              >
                Browse Movies
              </Button>
              <Button 
                className="bg-gradient-to-r from-[#FAAA47] to-[#F97316] text-white hover:opacity-90 hover:cursor-pointer"
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-[#2A2A2A]/40 border border-[#3A3A3A] rounded-2xl p-4 flex gap-4">
                      <Skeleton className="w-24 h-36 rounded-lg shrink-0" />
                      <div className="flex-1 space-y-4">
                        <Skeleton className="h-6 w-3/4" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-1/2" />
                          <Skeleton className="h-4 w-2/3" />
                        </div>
                      </div>
                    </div>
                  ))}
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
                          className="relative flex flex-col items-center group transition-all duration-500"
                        >
                          {/* Background Stack */}
                          <div className="absolute left-1/2 -translate-x-1/2 bottom-[-6px] h-[50%] w-[85%] bg-[url('/images/ticket-bg-bottom-3.png')] bg-contain bg-center bg-no-repeat transition-all duration-500"></div>
                          <div className="absolute left-1/2 -translate-x-1/2 bottom-[-8px] h-[70%] w-[75%] bg-[url('/images/ticket-bg-bottom-2.png')] bg-contain bg-center bg-no-repeat transition-all duration-500"></div>
                          <div className="absolute left-1/2 -translate-x-1/2 bottom-[-18px] h-[90%] w-[85%] bg-[url('/images/ticket-bg-bottom-1.png')] bg-contain bg-center bg-no-repeat transition-all duration-500"></div>
                          
                          {/* Main Ticket */}
                          <div className="relative w-full aspect-[16/9] bg-[url('/images/ticket-top.png')] bg-contain mx-auto bg-center bg-no-repeat p-8 flex flex-col mt-2">
                            {/* Top Section: Poster & Info */}
                            <div className="flex justify-center items-center gap-6 items-start">
                              <div className="relative w-20 h-28 rounded-md overflow-hidden shadow-xl border border-white/10 shrink-0">
                                <Image
                                  src={booking.movieId?.imageUrl || "/images/no_poster.png"}
                                  alt={booking.movieId?.title || "unknown"}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="space-y-1">
                                <h3 className="text-xl font-bold text-[#D0021B] drop-shadow-sm leading-tight">
                                  {booking.movieId?.title}({new Date(booking.movieId?.releaseDate || Date.now()).getFullYear()})
                                </h3>
                                <p className="text-[10px] text-gray-700 font-medium leading-relaxed max-w-[200px]">
                                  Bashundhara Shopping Mall<br />
                                  Level 8, Bashundhara City 13/3 Ka, Panthapath, Tejgaon, Dhaka 1205, Bangladesh
                                </p>
                                <p className="text-[11px] text-gray-600 font-semibold pt-1"> {formatTime(booking.showId.startTime)},{" "}
                                  {new Date(booking.showId.startTime).toLocaleDateString(undefined, {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric'
                                  })}({new Date(booking.showId.startTime).toLocaleDateString(undefined, { weekday: 'long' })})
                                </p>
                              </div>
                            </div>

                            {/* Middle Section: Seats & Amount */}
                            <div className="flex-1 flex flex-col justify-center items-center -mt-1">
                              <h2 className="text-2xl font-black text-[#333] tracking-wider">
                                {booking.seats.map(s => s.seatNumber).join(", ")}
                              </h2>
                              <p className="text-sm font-bold text-gray-600">
                                Total Amount: BDT {booking.totalPrice}
                              </p>
                            </div>

                            {/* Separator */}
                            <div className="w-full border-t-2 border-dashed border-gray-300 opacity-50 my-2"></div>

                            {/* Bottom Section: Action */}
                            <div className="flex justify-center pb-2">
                              {booking.paymentStatus.toLowerCase() !== 'paid' ? (
                                <button className="bg-[#8B0000] text-white px-10 py-2 rounded-lg font-bold text-lg hover:bg-[#A00000] transition-colors shadow-lg active:scale-95">
                                  Pay Now
                                </button>
                              ) : (
                                <button className="bg-green-700 text-white px-10 py-2 rounded-lg font-bold text-lg hover:bg-green-800 transition-colors shadow-lg">
                                  Paid
                                </button>
                              )}
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
