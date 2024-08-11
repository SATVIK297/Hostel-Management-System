import  { useState } from 'react';
import Avatar from 'react-avatar';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {  signOutSuccess } from '../redux/user/userSlice';

const Profile = () => {
  const dispatch=useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
    const [profilePic, setProfilePic] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  // const handleDeleteUser = async () => {
  //   setShowModal(false);
  //   console.log("here i am")
  //   try {
  //     dispatch(deleteUserStart());
  //     console.log("here i am2")
  //     // const res = await fetch(`http://localhost:5000/api/v1/user/delete/${currentUser._id}}`, {
  //     //   method: "DELETE",
  //     // });

  //     const res = await axios.delete(`http://localhost:5000/api/v1/user/delete/${currentUser._id}`);

      
  //     console.log("here i am3")
  //     const data =  res.data.message;
  //     // if (!res.ok) {
  //     //   console.log("erorr")
  //     //   dispatch(deleteUserFailure(data));
  //     // } 
  //     //else {
  //       dispatch(deleteUserSuccess(data));
  //     //}
  //   } catch (error) {
  //     dispatch(deleteUserFailure(error.message));
  //   }
  // };

  



  const handleSignOut = async () => {
    try {
      await axios.post('http://localhost:5000/api/v1/user/signout');
      dispatch(signOutSuccess());

      navigate('/'); // Redirect to login page after sign out
    } catch (err) {
      console.error('Failed to sign out', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-600 p-8">
      <div className="container mx-auto max-w-lg bg-white p-6 rounded-lg shadow-xl">
        <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-800">{currentUser.name}</h1>
        <div className="flex justify-center mb-6">
          <div className="relative">
            <input
              type="file"
              id="profile-pic"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleProfilePicChange}
            />
            <Avatar
              name={currentUser.name}
              src={profilePic || currentUser.profilePic} // Use stored profile picture or the default one
              size="100"
              round={true}
              className="cursor-pointer shadow-lg"
            />
          </div>
        </div>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-1">Name</label>
            <input
              type="text"
              id="name"
              value={currentUser.name}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="rollNo" className="block text-gray-700 text-sm font-semibold mb-1">Roll Number</label>
            <input
              type="text"
              id="rollNo"
              value={currentUser.registrationNumber}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="block" className="block text-gray-700 text-sm font-semibold mb-1">Block</label>
            <input
              type="text"
              id="block"
              value={currentUser.block}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="room" className="block text-gray-700 text-sm font-semibold mb-1">Room</label>
            <input
              type="text"
              id="room"
              value={currentUser.roomNumber}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
            />
          </div>
          <div className="flex  justify-evenly">
          
            <button
              type="button"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              onClick={() => setShowModal(true)}
            >
              Sign Out
            </button>
          </div>
        </form>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Are you sure you want to delete your account?</h2>
            <div className="flex justify-between">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                // onClick={handleDeleteUser}
                onClick={handleSignOut}
              >
                Yes, signOut
              </button>
              <button
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
