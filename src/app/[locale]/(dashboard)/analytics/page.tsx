"use client"
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@components/ui/select';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { Menu, X } from 'lucide-react';
import { getUser } from '@/actions/user';
import { toast } from '@/components/ui/use-toast';
import { UserAnalysis } from '@/entities/user';
import { getCalendarVariables } from '@/actions/calendar';
import { getNoteVariables } from '@/actions/note';
import { getTreeNoteVariable } from '@/actions/tree';
// Import getTreeVariables if you have an endpoint for it
// import { getTreeVariables } from '@/actions/tree';

interface VariableData {
  date?: Date;
  variables: Map<string, number[]>;
}

const HomePage: React.FC = () => {
  const [analysisType, setAnalysisType] = useState<string>('note');
  const [noteID, setNoteID] = useState<string>('');
  const [selectedVariables, setSelectedVariables] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [variables, setVariables] = useState<VariableData[]>([]);
  const [notes, setNotes] = useState<UserAnalysis[]>([]);

  const colorPalette = [
    '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC'
  ];

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

  const getRandomColor = (usedColors: string[]) => {
    const availableColors = colorPalette.filter(color => !usedColors.includes(color));
    return availableColors[Math.floor(Math.random() * availableColors.length)];
  };


  const prepareChartData = () => {
    const chartData = {
      labels: [] as string[],
      datasets: selectedVariables.map((variable) => ({
        label: variable,
        data: [] as { x: number | Date; y: number; showDot?: boolean }[],
        fill: false,
        backgroundColor: '',
        borderColor: '',
        pointRadius: (ctx: any) => (ctx.raw && ctx.raw.showDot ? 3 : 0),
        pointHoverRadius: (ctx: any) => (ctx.raw && ctx.raw.showDot ? 5 : 0),
      })),
    };
  
    if (analysisType === 'calendar') {
      const allVariableData: { [key: string]: { date: Date; value: number }[] } = {};
  
      variables.forEach((vd) => {
        vd.variables.forEach((values, key) => {
          if (!allVariableData[key]) {
            allVariableData[key] = [];
          }
          values.forEach((value) => {
            allVariableData[key].push({ date: vd.date!, value });
          });
        });
      });
  
      selectedVariables.forEach((variable, idx) => {
        const usedColors = chartData.datasets.map((dataset) => dataset.backgroundColor);
        const color = getRandomColor(usedColors);
        chartData.datasets[idx].backgroundColor = color;
        chartData.datasets[idx].borderColor = color;
  
        const variableData = allVariableData[variable];
        if (variableData) {
          const sortedVariableData = variableData.sort((a, b) => a.date.getTime() - b.date.getTime());
  
          let allDates = sortedVariableData.map((dataPoint) => dataPoint.date);
          let minDate = new Date(Math.min(...allDates.map((d) => d.getTime())));
          let maxDate = new Date(Math.max(...allDates.map((d) => d.getTime())));
  
          for (let d = new Date(minDate); d <= maxDate; d.setDate(d.getDate() + 1)) {
            const existingDataPoint = sortedVariableData.find((dataPoint) => dataPoint.date.getTime() === d.getTime());
            if (existingDataPoint) {
              chartData.datasets[idx].data.push({ x: existingDataPoint.date, y: existingDataPoint.value, showDot: true });
            } else {
              const previousDataPoint = sortedVariableData.findLast((dataPoint) => dataPoint.date.getTime() < d.getTime());
              const nextDataPoint = sortedVariableData.find((dataPoint) => dataPoint.date.getTime() > d.getTime());
              if (previousDataPoint && nextDataPoint) {
                const daysBetween = (nextDataPoint.date.getTime() - previousDataPoint.date.getTime()) / (1000 * 60 * 60 * 24);
                const interpolatedValue =
                  previousDataPoint.value +
                  ((d.getTime() - previousDataPoint.date.getTime()) / (1000 * 60 * 60 * 24)) *
                    ((nextDataPoint.value - previousDataPoint.value) / daysBetween);
                chartData.datasets[idx].data.push({ x: new Date(d), y: interpolatedValue, showDot: false });
              }
            }
          }
        }
      });
  
      chartData.labels = Array.from(new Set(chartData.datasets.flatMap((dataset) => dataset.data.map((point) => (point.x as Date).toDateString()))));
    } else {
      const allVariableData: { [key: string]: { value: number }[] } = {};
  
      variables.forEach((vd) => {
        vd.variables.forEach((values, key) => {
          if (!allVariableData[key]) {
            allVariableData[key] = [];
          }
          values.forEach((value) => {
            allVariableData[key].push({ value });
          });
        });
      });
  
      selectedVariables.forEach((variable, idx) => {
        const usedColors = chartData.datasets.map((dataset) => dataset.backgroundColor);
        const color = getRandomColor(usedColors);
        chartData.datasets[idx].backgroundColor = color;
        chartData.datasets[idx].borderColor = color;
  
        const variableData = allVariableData[variable];
        if (variableData) {
          chartData.datasets[idx].data = variableData.map((dataPoint, index) => ({
            x: index,
            y: dataPoint.value,
            showDot: true,
          }));
        }
      });
  
      chartData.labels = Array.from(new Set(chartData.datasets.flatMap((dataset) => dataset.data.map((point) => point.x.toString()))));
    }
  
    return chartData;
  };
  
  
  

  const handleNoteTitleChange = async (e: string) => {
    setSelectedVariables([]);
    setNoteID(e);
    let response;
  
    if (analysisType === 'calendar') {
      response = await getCalendarVariables({ id: e });
    } else if (analysisType === 'note') {
      response = await getNoteVariables({ id: e });
    } else if (analysisType === 'tree') {
      // Uncomment the next line if you have a getTreeVariables function
       response = await getTreeNoteVariable({ id: e });
    }
  
    if (response?.success === false) {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: response.message,
      });
      return;
    }
  
    if (response?.success) {
      let formattedData: VariableData[] = [];
  
      if (analysisType === 'calendar' && Array.isArray(response.data)) {
        formattedData = response.data.map((item: { date?: string; variables: { [key: string]: number[]; }; }) => {
          const variablesMap = new Map<string, number[]>(
            Object.entries(item.variables)
          );
  
          return {
            date: item.date ? new Date(item.date) : undefined, // Only convert if date is provided
            variables: variablesMap
          };
        });
      } else {
        const item = response.data;
        const variablesMap = new Map<string, number[]>(
          Object.entries(item.variables)
        );
  
        formattedData = [{
          date: item.date ? new Date(item.date) : undefined, // Only convert if date is provided
          variables: variablesMap
        }];
      }
  
      setVariables(formattedData);
    } else {
      toast({
        variant: "destructive",
        title: "Unexpected data format.",
        description: "The data received is not in the expected format.",
      });
    }
  };
  
  

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
            <label className="block text-sm font-medium mb-1">Note Type</label>
            <Select value={analysisType} onValueChange={(e)=>{
              setNoteID("")
              setVariables([])
              setSelectedVariables([])
              setAnalysisType(e)
            }}>
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
            <label className="block text-sm font-medium mb-1">Title</label>
            <Select value={noteID} onValueChange={(e) => handleNoteTitleChange(e)}>
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
            <div className="relative w-full h-full max-h-[65vh]">
              <Line data={prepareChartData()} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
          <div
            className={`${isSidebarOpen ? 'block' : 'hidden'} lg:block w-full lg:w-1/4 border-l p-4`}
          >
            <h3 className="text-lg font-medium mb-2">Variables</h3>
            <div className="flex flex-wrap gap-4">
              {Array.from(new Set(variables.flatMap(vd => Array.from(vd.variables.keys())))).map((variable) => (
                <div key={variable} className="flex items-center">
                  <input
                    type="checkbox"
                    id={variable}
                    checked={selectedVariables.includes(variable)}
                    onChange={() => handleVariableChange(variable)}
                    className="mr-2"
                  />
                  <label htmlFor={variable}>{variable}</label>
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
