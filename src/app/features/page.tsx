import { BookOpenIcon, Network, ClipboardListIcon, CalendarIcon } from 'lucide-react';
import Image from 'next/image';

const features = [
  {
    title: 'Note',
    description: 'A simple yet powerful way to jot down quick thoughts, ideas, or reminders. All your notes are saved online and can be accessed from anywhere.',
    imageSrc: '/note.jpg',
    align: 'left'
  },
  {
    title: 'Tree Note',
    description: 'Organize your notes hierarchically, creating structured outlines for complex ideas. Tree notes help you manage and visualize your notes in a more organized manner.',
    imageSrc: '/tree.jpg',
    align: 'right'
  },
  {
    title: 'To-Do List',
    description: 'Keep track of tasks and prioritize your day with a flexible to-do list feature. Manage your daily tasks efficiently and never miss an important deadline.',
    imageSrc: '/todo.jpg',
    align: 'left'
  },
  {
    title: 'Calendar Note',
    description: 'Schedule events, deadlines, and important dates with an integrated calendar view. Add notes to specific dates and keep track of your schedule effortlessly.',
    imageSrc: '/calendar.jpg',
    align: 'right'
  },
];

const FeaturesPage: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">VoidNote</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">An online note-taking application with various features to help you stay organized.</p>
        <div className="flex justify-center space-x-4 text-gray-800 dark:text-gray-300">
          <BookOpenIcon className="w-8 h-8" />
          <Network className="w-8 h-8" />
          <ClipboardListIcon className="w-8 h-8" />
          <CalendarIcon className="w-8 h-8" />
        </div>
      </div>
      <div className="max-w-6xl mx-auto space-y-12">
        {features.map((feature, index) => (
          <div key={index} className={`flex flex-col md:flex-row ${feature.align === 'left' ? '' : 'md:flex-row-reverse'} items-center justify-between space-y-6 md:space-y-0`}>
            <div className="flex justify-center md:justify-start">
              <Image src={feature.imageSrc} alt={feature.title} width={400} height={300} className="rounded-lg border-8 border-gray-300 dark:border-gray-600" />
            </div>
            <div className={`md:w-1/2 p-6 ${feature.align === 'left' ? 'text-left' : 'text-right'} text-lg text-gray-800 dark:text-gray-300 bg-white dark:bg-gray-800 rounded-lg shadow-lg`}>
              <h2 className="text-2xl font-bold">{feature.title}</h2>
              <p className="mt-2">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesPage;
