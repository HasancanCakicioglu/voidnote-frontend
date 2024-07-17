import React from 'react';
import { BookOpenIcon, Network, ClipboardListIcon, CalendarIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, } from '../../components/ui/card'

const FeaturesPage: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Note Feature */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="md:w-1/2 text-left text-lg text-gray-800 dark:text-gray-300">
                <CardTitle className="text-2xl font-bold">Note</CardTitle>
                <p>
                  A simple yet powerful way to jot down quick thoughts, ideas, or reminders.
                  All your notes are saved online and can be accessed from anywhere.
                </p>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <BookOpenIcon className="w-24 h-24 text-purple-600" />
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Tree Note Feature */}
        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="md:w-1/2 flex justify-center">
                <Network className="w-24 h-24 text-purple-600" />
              </div>
              <div className="md:w-1/2 text-right text-lg text-gray-800 dark:text-gray-300">
                <CardTitle className="text-2xl font-bold">Tree Note</CardTitle>
                <p>
                  Organize your notes hierarchically, creating structured outlines for complex ideas.
                  Tree notes help you manage and visualize your notes in a more organized manner.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* To-Do List Feature */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="md:w-1/2 text-left text-lg text-gray-800 dark:text-gray-300">
                <CardTitle className="text-2xl font-bold">To-Do List</CardTitle>
                <p>
                  Keep track of tasks and prioritize your day with a flexible to-do list feature.
                  Manage your daily tasks efficiently and never miss an important deadline.
                </p>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <ClipboardListIcon className="w-24 h-24 text-purple-600" />
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Calendar Note Feature */}
        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="md:w-1/2 flex justify-center">
                <CalendarIcon className="w-24 h-24 text-purple-600" />
              </div>
              <div className="md:w-1/2 text-right text-lg text-gray-800 dark:text-gray-300">
                <CardTitle className="text-2xl font-bold">Calendar Note</CardTitle>
                <p>
                  Schedule events, deadlines, and important dates with an integrated calendar view.
                  Add notes to specific dates and keep track of your schedule effortlessly.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FeaturesPage;
