import React from 'react';
import { useSettings } from '../../context/SettingsContext';
import { translate } from '../../utils/translations';

const ProfileDetailsCard = ({ profileData, setProfileData, onUpdate, isEditing, onToggleEdit, message, onImageUpload }) => {
  const { settings } = useSettings();
  const t = (key) => translate(key, settings.language);

  const handleChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoClick = () => {
    document.getElementById('avatarInput').click();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="flex items-center justify-between p-6 border-b border-slate-200">
        <h2 className="text-lg font-semibold text-slate-900">{t('Profile Details')}</h2>
        <div className="flex items-center gap-3">
          {message.text && (
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm ${
              message.type === 'success' 
                ? 'bg-green-50 text-green-800 border border-green-200' 
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              <i className={`fa-solid fa-${message.type === 'success' ? 'check-circle' : 'exclamation-circle'}`}></i>
              {message.text}
            </div>
          )}
          <button 
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              isEditing 
                ? 'bg-red-600 text-white hover:bg-red-700' 
                : 'text-white'
            }`}
            style={isEditing ? {} : {backgroundColor: '#256af4', transition: 'all 0.3s ease'}}
            onMouseEnter={isEditing ? undefined : (e) => {
              e.currentTarget.style.backgroundColor = '#1e4db8';
            }}
            onMouseLeave={isEditing ? undefined : (e) => {
              e.currentTarget.style.backgroundColor = '#256af4';
            }}
            onClick={(e) => {
              e.preventDefault();
              if (isEditing) {
                onUpdate();
              } else {
                onToggleEdit();
              }
            }}
            type="button"
          >
            {isEditing ? t('Update Info') : t('Change Info')}
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex gap-8">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img 
                src={profileData.avatar} 
                alt=""
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
              {isEditing && (
                <button 
                  className="absolute bottom-0 right-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg" 
                  onClick={(e) => {
                    e.preventDefault();
                    handlePhotoClick();
                  }}
                  type="button"
                >
                  <i className="fa-solid fa-pen text-sm"></i>
                </button>
              )}
            </div>
            <div className="text-center">
              <p className="font-semibold text-slate-900">{`${profileData.firstName} ${profileData.lastName}`}</p>
              <p className="text-sm text-slate-500">{profileData.bio || t('No bio added yet')}</p>
            </div>
            <input 
              type="file" 
              id="avatarInput" 
              accept="image/*" 
              style={{ display: 'none' }}
              onChange={onImageUpload}
            />
          </div>
          
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">{t('First Name')}</label>
                <input 
                  type="text"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500"
                  value={profileData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">{t('Last Name')}</label>
                <input 
                  type="text"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500"
                  value={profileData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">{t('Email')}</label>
                <input 
                  type="email"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500"
                  value={profileData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">{t('Phone')}</label>
                <input 
                  type="tel"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500"
                  placeholder={t('Enter your phone number')}
                  value={profileData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">{t('Bio')}</label>
                <textarea 
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500"
                  rows="5"
                  placeholder={t('Tell us a little about yourself...')}
                  value={profileData.bio}
                  onChange={(e) => handleChange('bio', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailsCard;
