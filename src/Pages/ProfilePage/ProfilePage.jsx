import React from "react";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import userImg from "../../Assets/userTwo.png";

const ProfilePage = () => {
  const { user, updateUser, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-lg text-red-600">User not logged in.</p>
      </div>
    );
  }

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;

    const updatedData = {};
    if (name) updatedData.displayName = name;
    if (photo) updatedData.photoURL = photo;

    if (Object.keys(updatedData).length === 0) {
      Swal.fire("Info", "No changes detected.", "info");
      return;
    }
    updateUser(updatedData)
      .then(() => {
        console.log("Profile updated successfully!");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        Swal.fire(
          "Error",
          error.message || "Failed to update profile.",
          "error"
        );
      });
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen md:mt-30">
      <h1 className="text-4xl font-bold mb-8 text-center">Edit Profile</h1>
      <div className="divider my-10"></div>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Profile Info Section */}
        <div className="w-full md:w-1/3 flex flex-col items-center card bg-base-100 shadow-xl p-6">
          <div className="avatar mb-4">
            <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={user.photoURL || userImg} />
            </div>
          </div>

          <h2 className="text-2xl font-semibold mb-2">
            {user.displayName || "User"}
          </h2>

          <p className="text-gray-600 mb-4">{user.email}</p>

          {user.emailVerified === false && (
            <p className="text-red-500 text-sm text-center">
              Email not verified. Please check your inbox or spam folder for a
              verification email.
            </p>
          )}
        </div>

        {/*! Update section*/}
        <div className="w-full md:w-2/3 card bg-base-100 shadow-xl p-6">
          <h3 className="text-2xl font-semibold mb-4">Update Profile</h3>
          <form onSubmit={handleUpdateProfile}>
            <div className="mb-4">
              <label className="label">
                <span className="label-text">Display Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter new name"
                className="input input-bordered w-full"
                defaultValue={user.displayName || ""}
              />
            </div>
            <div className="mb-4">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                name="photo"
                placeholder="Enter new photo URL"
                className="input input-bordered w-full"
                defaultValue={user.photoURL || ""}
              />
            </div>
            <button type="submit" className="btn btn-primary mt-4">
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
