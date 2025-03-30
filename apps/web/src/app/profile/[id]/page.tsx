"use client";
import { useParams } from "next/navigation";
import React from "react";

const Profile = ({}) => {
  const { id } = useParams();
  return <div>Profile of user {id}</div>;
};

export default Profile;
