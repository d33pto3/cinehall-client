import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  addTheater,
  fetchTheaters,
} from "../../features/theaters/theaterSlice";

function Theater() {
  const dispatch = useDispatch();
  const { theaters } = useSelector((state) => state.theaters);
  console.log(theaters);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [capacity, setCapacity] = useState("");

  useEffect(() => {
    dispatch(fetchTheaters());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(
        addTheater({ name, address, capacity })
      );
      unwrapResult(resultAction);
      setName("");
      setAddress("");
      setCapacity("");
    } catch (err) {
      console.error("Failed to save the theater: ", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Theaters</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-400 p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-gray-700 font-bold mb-2"
          >
            Address
          </label>
          <textarea
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border border-gray-400 p-2 rounded-md"
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="capacity"
            className="block text-gray-700 font-bold mb-2"
          >
            Capacity
          </label>
          <input
            type="number"
            name="capacity"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            className="w-full border border-gray-400 p-2 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Theater
        </button>
      </form>
      <hr className="my-6" />
      <h2 className="text-2xl font-bold mb-4">All Theaters</h2>
      {theaters.map((theater) => (
        <div key={theater.id}>
          <h3 className="text-xl font-bold mb-2">{theater.name}</h3>
          <p className="mb-4">{theater.address}</p>
          {theater.capacity} seats
          <hr className="my-4" />
        </div>
      ))}
    </div>
  );
}

export default Theater;
