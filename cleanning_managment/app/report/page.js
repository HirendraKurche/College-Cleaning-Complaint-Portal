"use client";
import React, { useState, useEffect } from "react";
import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore";
import app from "../../firebase/config";
import { FaCamera } from "react-icons/fa";
import { getAuth } from "firebase/auth";

const locations = [
  "Hostel Block A",
  "Hostel Block B",
  "Cafeteria",
  "Library",
  "Classroom",
  "Other"
];

const CLOUDINARY_CLOUD_NAME = "dr48lrxhp";
const CLOUDINARY_UPLOAD_PRESET = "cleanning"; // <-- Set to your unsigned upload preset

export default function ReportPage() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const db = getFirestore(app);
  const auth = getAuth(app);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!image || !location || !description) {
      setError("Please fill all fields and select an image.");
      return;
    }
    setLoading(true);
    try {
      // 1. Upload image to Cloudinary
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      if (!data.secure_url) throw new Error("Image upload failed");

      // Get current user
      const user = auth.currentUser;
      // 2. Save report to Firestore (use data.secure_url)
    await addDoc(collection(db, "dashboardWeb"), {
        image: data.secure_url,
        location,
        description,
        status: "Pending",
        timestamp: Timestamp.now(),
        userId: user ? user.uid : null,
      });

      setSuccess("Complaint submitted successfully!");
      setImage(null);
      setImageUrl("");
      setLocation("");
      setDescription("");
    } catch (err) {
      setError("Failed to submit complaint. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFBF1] text-[#0E2517] p-8">
      <h1 className="text-3xl font-bold mb-6">Upload Cleaning Complaint</h1>
      {isClient && (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 flex flex-col items-center"
        >
          {/* Image Upload */}
          <label className="flex flex-col items-center cursor-pointer mb-6">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-2 overflow-hidden">
              {imageUrl ? (
                <img src={imageUrl} alt="Preview" className="object-cover w-full h-full" />
              ) : (
                <FaCamera className="text-3xl text-purple-400" />
              )}
            </div>
            <span className="text-purple-400 font-semibold">Capture / Select Image</span>
          </label>
          {/* Location Select */}
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border-b border-gray-400 py-2 mb-6 bg-transparent focus:outline-none"
          >
            <option value="">Select Location</option>
            {locations.map((loc) => (
              <option key={loc} value={loc} className="text-[#0E2517]">
                {loc}
              </option>
            ))}
          </select>
          {/* Description */}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Description - Nearby landmark"
            className="w-full border border-gray-400 rounded p-3 mb-6 min-h-[80px]"
          />
          {/* Error/Success */}
          {error && <div className="text-red-500 mb-2">{error}</div>}
          {success && <div className="text-green-500 mb-2">{success}</div>}
          {/* Submit Button */}
          <button
            type="submit"
            className="bg-orange-400 text-white px-8 py-2 rounded-full font-semibold mt-2 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Complaint"}
          </button>
        </form>
      )}
    </div>
  );
} 