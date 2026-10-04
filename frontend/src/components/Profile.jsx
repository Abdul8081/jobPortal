import React, { useRef, useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Contact,
  Mail,
  Pen,
  Camera,
  Loader2,
  Briefcase,
  Building2,
  PlusCircle,
  UserCheck,
  FileText,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useDispatch, useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import Footer from "./shared/Footer";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const Profile = () => {
  // Only fetch applied jobs if user is a student
  const { user } = useSelector((store) => store.auth);
  if (user?.role === "student") {
    useGetAppliedJobs();
  }

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [photoUploading, setPhotoUploading] = useState(false);
  const photoInputRef = useRef(null);

  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate image file type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!validTypes.includes(file.type)) {
      toast.error("Please select an image file (JPG, PNG, WEBP, or GIF).");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setPhotoUploading(true);
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/photo`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        },
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(
          res.data.message || "Profile photo updated successfully!",
        );
      }
    } catch (error) {
      console.error("Photo upload error:", error);
      toast.error(
        error?.response?.data?.message || "Failed to update profile photo.",
      );
    } finally {
      setPhotoUploading(false);
      if (photoInputRef.current) {
        photoInputRef.current.value = "";
      }
    }
  };

  return (
    <div
      className="min-h-screen w-full overflow-x-hidden flex flex-col justify-between"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div>
        <Navbar />

        <div className="w-full px-3 xs:px-4 sm:px-6 lg:px-8 py-6">
          {/* Profile Header Card */}
          <div
            className="max-w-4xl mx-auto rounded-2xl border p-5 sm:p-7 md:p-8 shadow-sm transition-all"
            style={{
              backgroundColor: "var(--bg-secondary)",
              borderColor: "var(--border-color)",
            }}
          >
            {/* Profile Top: Avatar + Names + Pencil Button */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-5">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 flex-1 text-center sm:text-left">
                {/* Avatar with Hover to Edit Photo */}
                <div className="relative group flex-shrink-0">
                  <div
                    onClick={() =>
                      !photoUploading && photoInputRef.current?.click()
                    }
                    className="relative cursor-pointer rounded-full overflow-hidden transition-all duration-300 ring-2 ring-purple-600/30 group-hover:ring-purple-600 group-hover:shadow-lg"
                    title="Click to update profile photo"
                  >
                    <Avatar className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32">
                      <AvatarImage
                        src={
                          user?.profile?.profilePhoto ||
                          "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                        }
                        alt={user?.fullname}
                        className="object-cover w-full h-full"
                      />
                    </Avatar>

                    {/* Hover Overlay */}
                    <div
                      className={`absolute inset-0 bg-black/60 flex flex-col items-center justify-center transition-opacity duration-200 ${photoUploading ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                    >
                      {photoUploading ? (
                        <div className="flex flex-col items-center gap-1">
                          <Loader2 className="h-6 w-6 text-white animate-spin" />
                          <span className="text-[10px] text-white font-medium">
                            Uploading...
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-1">
                          <Camera className="h-6 w-6 text-white" />
                          <span className="text-[11px] text-white font-semibold tracking-wide">
                            Change
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Camera icon badge */}
                  <button
                    type="button"
                    onClick={() =>
                      !photoUploading && photoInputRef.current?.click()
                    }
                    className="absolute bottom-0 right-0 p-2 rounded-full bg-purple-600 text-white shadow-md border-2 border-background hover:bg-purple-700 transition-all hover:scale-110 active:scale-95"
                    title="Upload photo"
                    disabled={photoUploading}
                  >
                    <Camera className="h-4 w-4" />
                  </button>

                  {/* Hidden File Input */}
                  <input
                    ref={photoInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                    disabled={photoUploading}
                  />
                </div>

                {/* User Details Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <h1
                      className="font-bold text-xl sm:text-2xl md:text-3xl truncate"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {user?.fullname}
                    </h1>

                    {/* Role Badge */}
                    <Badge
                      className={`text-xs capitalize px-2.5 py-0.5 font-semibold ${
                        user?.role === "recruiter"
                          ? "bg-blue-600/10 text-blue-500 border border-blue-500/20"
                          : "bg-purple-600/10 text-purple-500 border border-purple-500/20"
                      }`}
                    >
                      <UserCheck className="h-3 w-3 mr-1 inline" />
                      {user?.role}
                    </Badge>

                    {user?.provider === "google" && (
                      <Badge className="text-[10px] bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                        Google Verified
                      </Badge>
                    )}
                  </div>

                  <p
                    className="text-sm sm:text-base mt-2"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {user?.profile?.bio || (
                      <span className="italic opacity-60">
                        No bio added yet. Click the edit button to add your bio.
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* Edit Profile Button */}
              <Button
                onClick={() => setOpen(true)}
                variant="outline"
                size="sm"
                className="self-center sm:self-start flex items-center gap-2 px-3 py-2 border rounded-lg transition-all hover:bg-purple-600/10"
                title="Edit profile information"
              >
                <Pen className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium">Edit Profile</span>
              </Button>
            </div>

            {/* Contact Information Bar */}
            <div
              className="my-6 pt-5 border-t grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm sm:text-base"
              style={{ borderColor: "var(--border-color)" }}
            >
              <div
                className="flex items-center gap-3 px-3 py-2 rounded-lg"
                style={{ backgroundColor: "var(--bg-primary)" }}
              >
                <Mail className="h-4 w-4 text-purple-600 flex-shrink-0" />
                <span
                  className="truncate"
                  style={{ color: "var(--text-primary)" }}
                >
                  {user?.email}
                </span>
              </div>
              <div
                className="flex items-center gap-3 px-3 py-2 rounded-lg"
                style={{ backgroundColor: "var(--bg-primary)" }}
              >
                <Contact className="h-4 w-4 text-purple-600 flex-shrink-0" />
                <span style={{ color: "var(--text-primary)" }}>
                  {user?.phoneNumber || "No phone number added"}
                </span>
              </div>
            </div>

            {/* Student-specific Skills Section */}
            {user?.role === "student" && (
              <div className="my-5">
                <h2
                  className="font-bold mb-2.5 text-base sm:text-lg"
                  style={{ color: "var(--text-primary)" }}
                >
                  Skills
                </h2>
                <div className="flex flex-wrap items-center gap-2">
                  {user?.profile?.skills && user?.profile?.skills.length > 0 ? (
                    user.profile.skills.map((item, index) => (
                      <Badge
                        key={index}
                        className="text-xs sm:text-sm px-3 py-1 font-medium bg-purple-600/15 text-purple-400 border border-purple-500/30"
                      >
                        {item}
                      </Badge>
                    ))
                  ) : (
                    <span
                      className="text-sm italic"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      No skills listed. Click "Edit Profile" to add skills.
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Student-specific Resume Section */}
            {user?.role === "student" && (
              <div
                className="pt-4 border-t"
                style={{ borderColor: "var(--border-color)" }}
              >
                <h2
                  className="text-base sm:text-lg font-bold mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  Resume
                </h2>
                {user?.profile?.resume ? (
                  <div
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 rounded-lg border"
                    style={{
                      backgroundColor: "var(--bg-primary)",
                      borderColor: "var(--border-color)",
                    }}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <FileText className="h-5 w-5 text-purple-500 flex-shrink-0" />
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={user?.profile?.resume}
                        className="hover:underline font-medium truncate text-sm sm:text-base text-purple-500"
                      >
                        {user?.profile?.resumeOriginalName || "Resume.pdf"}
                      </a>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          window.open(user?.profile?.resume, "_blank")
                        }
                        className="flex-1 sm:flex-none text-xs sm:text-sm px-3 py-1.5"
                        style={{ borderColor: "var(--border-color)" }}
                      >
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={async () => {
                          try {
                            const response = await fetch(user?.profile?.resume);
                            const blob = await response.blob();
                            const blobUrl = window.URL.createObjectURL(blob);
                            const link = document.createElement("a");
                            link.href = blobUrl;
                            let filename =
                              user?.profile?.resumeOriginalName || "Resume.pdf";
                            if (!filename.toLowerCase().endsWith(".pdf")) {
                              filename = filename + ".pdf";
                            }
                            link.download = filename;
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                            window.URL.revokeObjectURL(blobUrl);
                          } catch (error) {
                            console.error("Download error:", error);
                            window.open(user?.profile?.resume, "_blank");
                          }
                        }}
                        className="flex-1 sm:flex-none text-xs sm:text-sm px-3 py-1.5"
                        style={{ borderColor: "var(--border-color)" }}
                      >
                        Download
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p
                    className="text-sm italic"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    No resume uploaded yet. Click "Edit Profile" to upload your
                    PDF resume.
                  </p>
                )}
              </div>
            )}

            {/* Recruiter Quick Actions Section */}
            {user?.role === "recruiter" && (
              <div
                className="pt-5 border-t mt-4"
                style={{ borderColor: "var(--border-color)" }}
              >
                <h2
                  className="text-base sm:text-lg font-bold mb-3"
                  style={{ color: "var(--text-primary)" }}
                >
                  Recruiter Workspace
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Link to="/admin/companies">
                    <div
                      className="p-4 rounded-xl border flex items-center gap-3 transition-all hover:border-purple-500 hover:shadow-sm"
                      style={{
                        backgroundColor: "var(--bg-primary)",
                        borderColor: "var(--border-color)",
                      }}
                    >
                      <Building2 className="h-6 w-6 text-purple-600 flex-shrink-0" />
                      <div>
                        <h4
                          className="font-semibold text-sm"
                          style={{ color: "var(--text-primary)" }}
                        >
                          Companies
                        </h4>
                        <p
                          className="text-xs"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          Manage your companies
                        </p>
                      </div>
                    </div>
                  </Link>
                  <Link to="/admin/jobs">
                    <div
                      className="p-4 rounded-xl border flex items-center gap-3 transition-all hover:border-purple-500 hover:shadow-sm"
                      style={{
                        backgroundColor: "var(--bg-primary)",
                        borderColor: "var(--border-color)",
                      }}
                    >
                      <Briefcase className="h-6 w-6 text-purple-600 flex-shrink-0" />
                      <div>
                        <h4
                          className="font-semibold text-sm"
                          style={{ color: "var(--text-primary)" }}
                        >
                          Posted Jobs
                        </h4>
                        <p
                          className="text-xs"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          View & track applicants
                        </p>
                      </div>
                    </div>
                  </Link>
                  <Link to="/admin/jobs/create">
                    <div
                      className="p-4 rounded-xl border flex items-center gap-3 transition-all hover:border-purple-500 hover:shadow-sm"
                      style={{
                        backgroundColor: "var(--bg-primary)",
                        borderColor: "var(--border-color)",
                      }}
                    >
                      <PlusCircle className="h-6 w-6 text-purple-600 flex-shrink-0" />
                      <div>
                        <h4
                          className="font-semibold text-sm"
                          style={{ color: "var(--text-primary)" }}
                        >
                          Post New Job
                        </h4>
                        <p
                          className="text-xs"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          Create a new vacancy
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Applied Jobs Section (Students only) */}
          {user?.role === "student" && (
            <div
              className="max-w-4xl mx-auto rounded-2xl border p-5 sm:p-7 md:p-8 mt-6"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderColor: "var(--border-color)",
              }}
            >
              <h2
                className="font-bold text-lg sm:text-xl md:text-2xl mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                Applied Jobs
              </h2>
              <AppliedJobTable />
            </div>
          )}
        </div>
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
      <Footer />
    </div>
  );
};

export default Profile;
