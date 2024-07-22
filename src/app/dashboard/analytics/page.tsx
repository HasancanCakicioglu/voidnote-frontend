"use client";
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@components/ui/select';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { Menu, X } from 'lucide-react';
import { getUser } from '@/actions/user';
import { toast } from '@/components/ui/use-toast';
import { UserAnalysis } from '@/entities/user';
import { getCalendarVariables } from '@/actions/calendar';

interface VariableData {
  date: string;
  variables: Map<string, number[]>;
}

const HomePage: React.FC = () => {
  const [analysisType, setAnalysisType] = useState<string>('note');
  const [noteID, setNoteID] = useState<string>('');
  const [selectedVariables, setSelectedVariables] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [variables, setVariables] = useState<VariableData[]>([]);

  const [notes, setNotes] = useState<UserAnalysis[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await getUser({ type: analysisType.toLowerCase() + 's' });

        if (response.success === false) {
          toast({
            variant: "destructive",
            title: "Something went wrong.",
            description: response.message,
          });
        } else {
          if (analysisType === 'note') {
            setNotes(response.data.notes);
          } else if (analysisType === 'tree') {
            setNotes(response.data.trees);
          } else {
            setNotes(response.data.calendars);
          }
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
  }, [analysisType]);

  const handleVariableChange = (variable: string) => {
    if (selectedVariables.includes(variable)) {
      setSelectedVariables(selectedVariables.filter((v) => v !== variable));
    } else {
      setSelectedVariables([...selectedVariables, variable]);
    }
  };

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: selectedVariables.map((variable) => ({
      label: variable,
      data: Array(5).fill(Math.random() * 100),
      fill: false,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
    })),
  };

  const handleNoteTitleChange = async (e: string) => {
    setNoteID(e);

    const response = await getCalendarVariables({ id: e });

    if (response.success === false) {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: response.message,
      });
      return;
    }
    if (response.success && response.data) {
      const formattedData: VariableData[] = response.data.map((item: { date: string; variables: { [key: string]: number[]; }; }) => {
          const variablesMap = new Map<string, number[]>(
              Object.entries(item.variables)
          );
          return {
              date: item.date,
              variables: variablesMap
          };
      });

      setVariables(formattedData);
  }
    
  }

  return (
    <div className="flex flex-grow w-full">
      <div className="flex flex-col p-4 w-full">
        <Head>
          <title>Analysis Page</title>
        </Head>
        <header className="mb-4 text-center">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">Analysis Page</h1>
        </header>
        <div className="flex flex-row justify-between items-center mb-4">
          <div className="mr-4 flex-1">
            <label className="block text-sm font-medium mb-1">
              Note Type
            </label>
            <Select value={analysisType} onValueChange={setAnalysisType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select analysis type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="note">Note</SelectItem>
                <SelectItem value="tree">Tree</SelectItem>
                <SelectItem value="calendar">Calendar</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mr-4 flex-1">
            <label className="block text-sm font-medium mb-1">
              Title
            </label>
            <Select value={noteID} onValueChange={(e)=>handleNoteTitleChange(e)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select note title" />
              </SelectTrigger>
              <SelectContent>
                {notes.map((note) => (
                  <SelectItem key={note._id} value={note._id}>
                    {note.title || 'Untitled'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <button
            className="lg:hidden p-2 border rounded"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <hr />
        <div className="flex flex-wrap flex-grow">
          <div className="flex-grow w-full lg:w-3/4 p-4">
            <div className="relative w-full h-full">
              <Line data={data} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
          <div
            className={`${
              isSidebarOpen ? 'block' : 'hidden'
            } lg:block w-full lg:w-1/4 border-l p-4 `}
          >
            <h3 className="text-lg font-medium mb-2">Variables</h3>
            <div className="flex flex-wrap gap-4">
            {variables.map((item, index) => (
                <div key={index}>
                    <p>Date: {item.date}</p>
                    {Array.from(item.variables.entries()).map(([key, values]) => (
                        <div key={key}>
                            <p>{key}: {values.join(', ')}</p>
                        </div>
                    ))}
                </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
