"use client";
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import { logout } from '@/store/slice';
import { RootState } from '@/store/store';
import { getUser } from '@/actions/user';
import { toast } from '@/components/ui/use-toast';
import LocaleSwitcher from '@/components/localeSwitcher';


interface LenNotes {
  notes: number;
  trees: number;
  todos: number;
  calendars: number;
}

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const account = useSelector((state: RootState) => state.account);
  const profileInitial = account.email ? account.email.charAt(0).toUpperCase() : '';
  const [lenNotes, setLenNotes] = useState<LenNotes>({ notes: 0, trees: 0, todos: 0, calendars: 0 });

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await getUser({ type: "all" });
        if (!response.success) {
          toast({
            variant: "destructive",
            title: "Something went wrong.",
            description: response.message,
          });
        } else {
          setLenNotes({
            notes: response.data.notes.length,
            trees: response.data.trees.length,
            todos: response.data.todos.length,
            calendars: response.data.calendars.length,
          });
        }
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Something went wrong.",
          description: error.message || "Error fetching notes",
        });
      }
    };

    fetchNotes();
  }, []);

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
            <p>{lenNotes.notes} notes created</p>
          </div>
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">To-Do Lists</h2>
            <p>{lenNotes.todos} to-do lists created</p>
          </div>
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">Calendar Notes</h2>
            <p>{lenNotes.calendars} calendar notes created</p>
          </div>
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">Tree Notes</h2>
            <p>{lenNotes.trees} tree notes created</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md mt-8">
          <h2 className="text-xl font-bold mb-2">Plan</h2>
          <p className="text-lg font-semibold text-blue-500 dark:text-blue-300">Free Plan</p>
        </div>
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md mt-8">
          <h2 className="text-xl font-bold mb-2">Preferences</h2>
          <LocaleSwitcher />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
