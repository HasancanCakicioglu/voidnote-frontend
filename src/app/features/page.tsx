import React from 'react';

const FeaturesPage: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Note Feature */}
        <div className="flex items-center justify-center md:justify-between">
          <div className="md:w-1/2 text-lg text-gray-800 dark:text-gray-300">
            <h3 className="font-semibold">Note</h3>
            <p>
              A simple yet powerful way to jot down quick thoughts, ideas, or reminders.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            
          </div>
        </div>

        {/* Tree Note Feature */}
        <div className="flex items-center justify-center md:justify-between">
          <div className="md:w-1/2 text-lg text-gray-800 dark:text-gray-300">
            <h3 className="font-semibold">Tree Note</h3>
            <p>
              Organize your notes hierarchically, creating structured outlines for complex ideas.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            
          </div>
        </div>

        {/* To-Do List Feature */}
        <div className="flex items-center justify-center md:justify-between">
          <div className="md:w-1/2 text-lg text-gray-800 dark:text-gray-300">
            <h3 className="font-semibold">To-Do List</h3>
            <p>
              Keep track of tasks and prioritize your day with a flexible to-do list feature.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            
          </div>
        </div>

        {/* Calendar Note Feature */}
        <div className="flex items-center justify-center md:justify-between">
          <div className="md:w-1/2 text-lg text-gray-800 dark:text-gray-300">
            <h3 className="font-semibold">Calendar Note</h3>
            <p>
              Schedule events, deadlines, and important dates with an integrated calendar view.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
