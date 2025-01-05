import React, { useState, useEffect } from 'react';
import api from '../../api';
import Loading from '../../components/Loading';
const DEFAULT_PROFILE_PIC = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

const Account = () => {
  const [userDetails, setUserDetails] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    profile: {
      bio: '',
      profile_picture: null
    },
    profile_picture_url: DEFAULT_PROFILE_PIC,
  });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(DEFAULT_PROFILE_PIC);

  
  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await api.get('account/');
      console.log(response.data);
      setUserDetails(response.data);
      setPreviewUrl(response.data.profile.profile_picture_url  || DEFAULT_PROFILE_PIC);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch user details:', error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('profile.')) {
      const field = name.split('.')[1];
      setUserDetails(prev => ({
        ...prev,
        profile: { ...prev.profile, [field]: value }
      }));
    } else {
      setUserDetails(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserDetails(prev => ({
        ...prev,
        profile: { ...prev.profile, profile_picture: file }
      }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    const formData = new FormData();
    formData.append("first_name", userDetails.first_name);
    formData.append("last_name", userDetails.last_name);
    formData.append("email", userDetails.email);
    formData.append("profile.bio", userDetails.profile.bio);
    if (userDetails.profile.profile_picture instanceof File) {
      formData.append("profile.profile_picture", userDetails.profile.profile_picture);
    }

    try {
        const response = await api.put("account/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        
        setUserDetails(response.data);
        setPreviewUrl(response.data.profile.profile_picture_url || DEFAULT_PROFILE_PIC);
        setEditMode(false);
      } catch (error) {
        console.error("Failed to update profile:", error);
      } finally {
        setUploading(false);
      }
    };

  if (loading) {
    return <Loading/>
  }

  return (
    <div className="min-h-screen mt-6 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="absolute -bottom-16 left-8">
              <div className="relative group">
              <img
                src={previewUrl}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg transition-transform group-hover:scale-105"
                onError={(e) => {
                    e.target.src = DEFAULT_PROFILE_PIC;
                    console.error("Failed to load profile picture");
                }}
                />
                {editMode && (
                  <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-sm">Change Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setEditMode(!editMode)}
                className="px-6 py-2 text-sm font-medium text-white bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all duration-200 backdrop-blur-sm"
              >
                {editMode ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
          </div>

          <div className="px-8 pt-20 pb-8">
            {editMode ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">First Name</label>
                    <input
                      type="text"
                      name="first_name"
                      value={userDetails.first_name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Last Name</label>
                    <input
                      type="text"
                      name="last_name"
                      value={userDetails.last_name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={userDetails.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Bio</label>
                  <textarea
                    name="profile.bio"
                    value={userDetails.profile.bio}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={uploading}
                    className="px-8 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 focus:ring-4 focus:ring-blue-300 disabled:opacity-50 transition-all duration-200"
                  >
                    {uploading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </span>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {userDetails.first_name} {userDetails.last_name}
                  </h2>
                  <p className="text-gray-500">{userDetails.email}</p>
                </div>
                
                <div className="prose max-w-none">
                  <h3 className="text-lg font-medium text-gray-900">About</h3>
                  <p className="text-gray-600">
                    {userDetails.profile.bio || 'No bio added yet.'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;