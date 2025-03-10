"use client";

import React, { useState } from 'react';
import HeaderBox from '@/components/HeaderBox';

const SettingsPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState('Light');

  const themes = ['Light', 'Dark', 'System Default'];

  return (
    <section className='p-8 space-y-6'>
      <HeaderBox 
        title='Settings' 
        subtext='Manage your account and preferences.'
      />

      <div className='border-2 border-blue-200 rounded-2xl p-6 space-y-6 shadow-lg'>
        <div>
          <label className='block font-bold mb-2'>Username:</label>
          <input 
            type='text' 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Enter your username' 
            className='w-full border-b-2 p-3 focus:outline-none focus:border-teal-300'
          />
        </div>

        <div>
          <label className='block font-bold mb-2'>Email:</label>
          <input 
            type='email' 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email' 
            className='w-full border-b-2 p-3 focus:outline-none focus:border-teal-300'
          />
        </div>

        <div>
          <label className='block font-bold mb-2'>Change Password:</label>
          <input 
            type='password' 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter new password' 
            className='w-full border-b-2 p-3 focus:outline-none focus:border-teal-300'
          />
        </div>

        <div>
          <label className='block font-bold mb-2'>Theme:</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className='w-full border rounded-lg p-3 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-300'
          >
            {themes.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className='flex items-center space-x-3'>
          <input
            type='checkbox'
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
            className='w-5 h-5 accent-teal-500'
          />
          <label className='font-bold'>Enable Notifications</label>
        </div>

        <button 
          onClick={() => alert('Settings saved successfully!')} 
          className='w-full bg-teal-500 text-white font-bold py-2 rounded-lg hover:bg-teal-600'>
          Save Settings
        </button>
      </div>
    </section>
  );
};

export default SettingsPage;



