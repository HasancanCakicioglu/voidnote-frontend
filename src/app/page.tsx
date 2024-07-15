import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to VoidNote</h1>
        <p className="text-lg mb-8">A modern note-taking application with various features to help you organize your thoughts and tasks.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-2">Normal Note</h2>
            <p className="text-gray-700 dark:text-gray-300">Create and manage your notes easily.</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-2">Tree Note</h2>
            <p className="text-gray-700 dark:text-gray-300">Organize your notes hierarchically.</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-2">To-do List</h2>
            <p className="text-gray-700 dark:text-gray-300">Keep track of your tasks and get things done.</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-2">Calendar Note</h2>
            <p className="text-gray-700 dark:text-gray-300">Schedule your notes and never miss a date.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
