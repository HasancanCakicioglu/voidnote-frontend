'use client';

import { home } from '@/actions/main';
import { useState, useEffect } from 'react';
import { toast } from './ui/use-toast';
import { homeSuccessResponse } from '@/entities/home';
import { useTranslations } from "next-intl";



const formatNumber = (number: number) => {
  const units = ["", "K", "M", "B", "T", "P", "E", "Z", "Y", "B", "BB", "BBB"];
  let unitIndex = 0;

  while (number >= 1000 && unitIndex < units.length - 1) {
    number /= 1000;
    unitIndex++;
  }

  return number.toFixed(1) + units[unitIndex];
};


const formatSize = (size: number) => {
  const units = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB", "BB"];
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return size.toFixed(1) + units[unitIndex];
};


const AnimatedNumbers = () => {
  const [users, setUsers] = useState(0);
  const [notes, setNotes] = useState(0);
  const [savedData, setSavedData] = useState(0);
  const [loading, setLoading] = useState(true);

  const t = useTranslations("Home");

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        let response = await home();

        if (response.success === false) {
          toast({
            variant: "destructive",
            title: "Something went wrong.",
            description: response.message,
          });
        } else {
          response = response as homeSuccessResponse;
          const usersData = response.data.find(item => item.collection === 'voidnote.users')?.count || 0;
          const notesData = response.data.filter(item => item.collection !== 'voidnote.users').reduce((total, item) => total + item.count, 0);
          const savedDataSize = response.data.reduce((total, item) => total + item.storageSize, 0);

          setUsers(usersData);
          setNotes(notesData);
          setSavedData(savedDataSize);
          setLoading(false)
        }
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Something went wrong.",
          description: error.message || "Error fetching notes",
        });
        setLoading(false);
      }
    };

    fetchHomeData();
    
  }, []);

  useEffect(() => {
    const animateCount = (setter: (value: number) => void, finalValue: number) => {
      let count = 0;
      const increment = finalValue / 100; // Adjust the speed here
      const interval = setInterval(() => {
        count += increment;
        if (count >= finalValue) {
          count = finalValue;
          clearInterval(interval);
        }
        setter(Math.floor(count));
      }, 20); // Adjust the speed here
    };

    animateCount(setUsers, users);
    animateCount(setNotes, notes);
    animateCount(setSavedData, savedData);
  }, [loading,users, notes, savedData]);

  return (
    <div className="flex flex-col md:flex-row justify-around text-gray-700 dark:text-gray-300">
      <div className="mb-8 md:mb-0">
        <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-800 text-transparent bg-clip-text">
          {formatNumber(users)}+
        </h3>
        <p className="text-lg">{t("numberofusers")}</p>
      </div>
      <div className="mb-8 md:mb-0">
        <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-800 text-transparent bg-clip-text">
          {formatNumber(notes)}+
        </h3>
        <p className="text-lg">{t("creatednotes")}</p>
      </div>
      <div>
        <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-800 text-transparent bg-clip-text">
          {formatSize(savedData)}+
        </h3>
        <p className="text-lg">{t("saveddata")}</p>
      </div>
    </div>
  );
};

export default AnimatedNumbers;