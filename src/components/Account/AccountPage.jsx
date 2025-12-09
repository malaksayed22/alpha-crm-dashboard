import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import ProfileHeader from './ProfileHeader';
import ProfileDetailsCard from './ProfileDetailsCard';
import PasswordCard from './PasswordCard';
import LoginPage from '../Auth/LoginPage';
import { useSettings } from '../../context/SettingsContext';
import { translate } from '../../utils/translations';

const AccountPage = ({ onNavigate, currentPage }) => {
  const { settings } = useSettings();
  const t = (key) => translate(key, settings.language);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordCard, setShowPasswordCard] = useState(false);
  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [profileMessage, setProfileMessage] = useState({ text: '', type: '' });
  const [passwordMessage, setPasswordMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      setIsAuthenticated(true);
      const user = JSON.parse(currentUser);
      const userData = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone || '',
        bio: user.bio || '',
        avatar: user.avatar,
        jobTitle: user.jobTitle || 'User'
      };
      setProfileData(userData);
    }
  }, []);

  const handleLogin = (user) => {
    setIsAuthenticated(true);
    const userData = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone || '',
      bio: user.bio || '',
      avatar: user.avatar,
      jobTitle: user.jobTitle || 'User'
    };
    setProfileData(userData);
  };

  const handleToggleEdit = () => {
    setIsEditing(true);
    setShowPasswordCard(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Create an image to compress it
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 400;
          const MAX_HEIGHT = 400;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          // Convert to base64 with compression (0.7 quality)
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
          setProfileData(prev => ({ ...prev, avatar: compressedBase64 }));
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = () => {
    // Update user in localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    const updatedUser = { 
      ...currentUser, 
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      email: profileData.email,
      phone: profileData.phone,
      bio: profileData.bio,
      avatar: profileData.avatar
    };
    
    try {
      // Update in users array
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = users.findIndex(u => u.id === currentUser.id);
      if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        localStorage.setItem('users', JSON.stringify(users));
      }
      
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      setOriginalProfileData(profileData);
      setIsEditing(false);
      setShowPasswordCard(false);
      setProfileMessage({ text: t('Profile updated successfully!'), type: 'success' });
      setTimeout(() => setProfileMessage({ text: '', type: '' }), 5000);
    } catch {
      setProfileMessage({ text: t('Error: Image too large. Please choose a smaller image.'), type: 'error' });
      setTimeout(() => setProfileMessage({ text: '', type: '' }), 5000);
    }
  };

  const handleUpdatePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordMessage({ text: t('Passwords do not match!'), type: 'error' });
      setTimeout(() => setPasswordMessage({ text: '', type: '' }), 5000);
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordMessage({ text: t('Password must be at least 6 characters!'), type: 'error' });
      setTimeout(() => setPasswordMessage({ text: '', type: '' }), 5000);
      return;
    }

    // Update password in localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const updatedUser = { ...currentUser, password: passwordData.newPassword };
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem('users', JSON.stringify(users));
    }
    
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    setPasswordData({ newPassword: '', confirmPassword: '' });
    setPasswordMessage({ text: t('Password updated successfully!'), type: 'success' });
    setTimeout(() => setPasswordMessage({ text: '', type: '' }), 5000);
  };

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (!profileData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar onNavigate={onNavigate} currentPage={currentPage} />
      
      <main className="flex-1 overflow-y-auto bg-slate-50">
        <div className="mx-auto max-w-7xl p-4 pt-20 md:pt-6 md:p-6">
          <ProfileHeader />
          
          <div className="mt-6 space-y-6">
            <ProfileDetailsCard 
              profileData={profileData} 
              setProfileData={setProfileData}
              onUpdate={handleUpdateProfile}
              isEditing={isEditing}
              onToggleEdit={handleToggleEdit}
              message={profileMessage}
              onImageUpload={handleImageUpload}
            />

            {showPasswordCard && (
              <PasswordCard 
                passwordData={passwordData}
                setPasswordData={setPasswordData}
                onUpdate={handleUpdatePassword}
                message={passwordMessage}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccountPage;
