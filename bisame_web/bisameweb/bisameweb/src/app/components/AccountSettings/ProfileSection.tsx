"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { TbUserEdit } from "react-icons/tb";
import BlobRing from "./BlobRing";
import ProfileImagePreviewModal from "./ProfileImagePreviewModal";
import toast from "react-hot-toast";
import { useAccountData } from "./useAccountData";
import { useChangeProfileImage } from "./useChangeProfileImage";

interface ProfileData {
  userName: string;
  phoneNumber: string | undefined;
  profileImage: string;
  email?: string | undefined;
}

interface ProfileSectionProps {
  profileData: ProfileData;
  onEdit?: () => void;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ profileData }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [userName, setUserName] = useState(profileData.userName);
  const [contactInfo, setContactInfo] = useState(
    profileData.phoneNumber ?? profileData.email ?? ""
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { changeProfileImage, response, loading } = useChangeProfileImage();
  const { mutate } = useAccountData();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
        "image/svg+xml",
      ];
      if (!validTypes.includes(file.type)) {
        toast.error(
          "Please select a valid image file (JPEG, PNG, WebP, or SVG)"
        );
        return;
      }

      // Validate file size (e.g., 5MB max)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        toast.error("File size must be less than 5MB");
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setShowModal(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("No file selected.");
      return;
    }

    try {
      const response = await changeProfileImage(selectedFile);

      if (response?.code === 200 || response?.message) {
        toast.success(
          response.message || "Profile image updated successfully!"
        );
        setShowModal(false);
        setPreview(null);
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";

        // Refresh profile data after upload
        await mutate();
      } else {
        throw new Error("Upload failed");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      toast.error(message || "Failed to update profile image.");
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setPreview(null);
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <>
      <ProfileImagePreviewModal
        isOpen={showModal}
        imageUrl={preview || ""}
        onUpload={handleUpload}
        onCancel={handleCancel}
        loading={loading}
      />

      {/* Account Setting Header */}
      <div className="border-b border-gray-200 py-3">
        <h2 className="text-base font-bold uppercase text-gray-700">
          Account Setting
        </h2>
      </div>

      {/* Account Setting Content */}
      <div className="flex gap-6 px-6 py-8 border-gray-200">
        <div className="flex flex-col items-center">
          <BlobRing>
            {preview ? (
              <Image
                src={preview}
                alt="Preview"
                className="rounded-full w-full h-full object-cover"
                height={100}
                width={100}
              />
            ) : (
              <Image
                alt="Profile picture"
                className="rounded-full h-full w-full object-cover"
                height={100}
                src={profileData.profileImage}
                width={100}
              />
            )}
          </BlobRing>

          <input
            id="profile-photo-input"
            type="file"
            accept="image/jpeg, image/jpg, image/png, image/webp, image/svg+xml"
            className="hidden"
            onChange={handleFileChange}
            ref={fileInputRef}
          />

          <button
            className="mt-3 text-sm font-semibold text-blue-500 border border-blue-300 rounded px-3 py-1 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            type="button"
            onClick={() =>
              document.getElementById("profile-photo-input")?.click()
            }
            disabled={loading}
          >
            <TbUserEdit className="text-sm" />
            <span>{loading ? "Uploading..." : "Change Profile"}</span>
          </button>
        </div>

        <div className="flex flex-col justify-center text-sm text-gray-800 space-y-4 flex-1">
          <div>
            <label
              htmlFor="userName"
              className="font-semibold text-base mb-1 block"
            >
              User name
            </label>
            <span>{userName}</span>
            {/* <input
              id="userName"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              placeholder="Enter your username"
            /> */}
          </div>

          <div>
            <label
              htmlFor="contactInfo"
              className="font-semibold text-base mb-1 block"
            >
              {profileData.email ? "Email" : "Phone Number"}
            </label>
            <span>{contactInfo}</span>
            {/* <input
              id="contactInfo"
              type={profileData.email ? "email" : "tel"}
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              placeholder={
                profileData.email
                  ? "Enter your email"
                  : "Enter your phone number"
              }
            /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSection;
