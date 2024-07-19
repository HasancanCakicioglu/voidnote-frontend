"use client"
import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import Image from 'next/image';
import { logout, updatePreferences } from '@/store/slice';
import {useState} from 'react'
import { RootState } from '@/store/store';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

  
  const ProfilePage: React.FC = () => {
    const dispatch = useDispatch();
    const account = useSelector((state: RootState) => state.account);
    const profileInitial = account.email ? account.email.charAt(0).toUpperCase() : '';
  
    const [theme, setTheme] = useState(account.preferences.theme);
    const [language, setLanguage] = useState(account.preferences.language);
  
    const handleSavePreferences = () => {
      dispatch(updatePreferences({ theme, language }));
    };
  
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Profile</h1>
            <button
              onClick={() => dispatch(logout())}
              className="text-red-500 hover:text-red-700 font-semibold"
            >
              Logout
            </button>
          </div>
          <div className="flex flex-col items-center mb-8">
            {account.profilePhotoUrl ? (
              <Image
                src={account.profilePhotoUrl}
                alt="Profile Picture"
                width={150}
                height={150}
                className="rounded-full border-4 border-gray-300 dark:border-gray-600 mb-4"
              />
            ) : (
              <div className="rounded-full bg-gray-500 dark:bg-gray-700 text-white w-24 h-24 flex items-center justify-center text-4xl mb-4">
                {profileInitial}
              </div>
            )}
            <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">{account.email}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-2">Notes</h2>
              <p>{account.notes.length} notes created</p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-2">To-Do Lists</h2>
              <p>{account.todos.length} to-do lists created</p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-2">Calendar Notes</h2>
              <p>{account.calendars.length} calendar notes created</p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-2">Tree Notes</h2>
              <p>{account.trees.length} tree notes created</p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">Preferences</h2>
            <div className="flex flex-col space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Theme
                </label>
                <Select value={theme} onValueChange={(value) => setTheme(value)}>
                  <SelectTrigger className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                    {theme.charAt(0).toUpperCase() + theme.slice(1)}
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Language
                </label>
                <Select value={language} onValueChange={(value) => setLanguage(value)}>
                  <SelectTrigger className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                    {language === 'en' ? 'English' : 'Turkish'}
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="tr">Turkish</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <button
                onClick={handleSavePreferences}
                className="self-end bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Save Preferences
              </button>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md mt-8">
            <h2 className="text-xl font-bold mb-2">Plan</h2>
            <p className="text-lg font-semibold text-blue-500 dark:text-blue-300">Free Plan</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default ProfilePage;
  
