"use client";

import React, { useState , useEffect} from "react";
import HeaderBox from "@/components/HeaderBox";

const SettingsPage = () => {
  // Replace these with actual user data fetched from your API or backend
  const username = "JohnDoe123";  // This should be pulled from the current user's data
  const email = "johndoe@email.com";  // Same as above

  const [password, setPassword] = useState("");
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState("Light");
  const [phone, setPhone] = useState("123-456-7890");

  const themes = ["Light", "Dark", "System Default"];

  // Handle changing checkboxes individually
  const [securityCheckbox, setSecurityCheckbox] = useState(false);
  const [themeCheckbox, setThemeCheckbox] = useState(false);
  const [accountSettingsCheckbox, setAccountSettingsCheckbox] = useState(false);

  useEffect(() => {
    if (theme === "Dark") {
      document.documentElement.classList.add("dark");
      document.body.classList.add("bg-gray-900", "text-white");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("bg-gray-900", "text-white");
    }
  }, [theme]);

  return (
    <section className="p-8 space-y-8">
      <HeaderBox title="Settings" subtext="Manage your account and preferences." />

      {/* Account Information Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Account Information</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Username</label>
            <input
              type="text"
              value={username}
              disabled  // Prevent the user from editing
              className="w-full border border-gray-300 rounded-md p-3 bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              disabled  // Prevent the user from editing
              className="w-full border border-gray-300 rounded-md p-3 bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Change Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-teal-300"
            />
          </div>
        </div>
      </div>

      {/* Personal Information Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Personal Information</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-teal-300"
            />
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Security</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Two-Factor Authentication</label>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={securityCheckbox}
                onChange={() => setSecurityCheckbox(!securityCheckbox)}
                className="w-5 h-5 text-teal-500"
              />
              <label className="text-sm font-medium text-gray-600">Enable 2FA</label>
            </div>
          </div>
        </div>
      </div>

      {/* Preferences Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Preferences</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Theme</label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-teal-300"
            >
              {themes.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>


          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              className="w-5 h-5 text-teal-500"
            />
            <label className="text-sm font-medium text-gray-600">Enable Notifications</label>
          </div>
        </div>
      </div>

      {/* Account Settings Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Account Settings</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Privacy Settings</label>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={accountSettingsCheckbox}
                onChange={() => setAccountSettingsCheckbox(!accountSettingsCheckbox)}
                className="w-5 h-5 text-teal-500"
              />
              <label className="text-sm font-medium text-gray-600">Show profile publicly</label>
            </div>
          </div>
        </div>
      </div>

      {/* Billing & Subscription Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Billing & Subscription</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Billing Address</label>
            <input
              type="text"
              placeholder="Enter billing address"
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-teal-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Subscription Plan</label>
            <select
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-teal-300"
            >
              <option>Free Plan</option>
              <option>Premium Plan</option>
              <option>VIP Plan</option>
            </select>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-center">
        <button
          onClick={() => alert("Settings saved successfully!")}
          className="bg-teal-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-teal-600 focus:ring-2 focus:ring-teal-300"
        >
          Save Settings
        </button>
      </div>
    </section>
  );
};

export default SettingsPage;