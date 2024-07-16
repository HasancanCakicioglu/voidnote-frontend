import Head from 'next/head'
import NavBar from '@/components/Navbar';

export default function Features() {
  return (
    <div>
      <main className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Features</h1>
        <div className="space-y-8">
          <div className="bg-white text-black p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Basic Notes</h2>
            <p>Effortlessly jot down your thoughts and ideas. Our basic note-taking feature is designed to be simple yet effective.</p>
          </div>
          <div className="bg-white text-black p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Tree Notes</h2>
            <p>Organize your notes in a hierarchical structure. Perfect for breaking down complex information into manageable sections.</p>
          </div>
          <div className="bg-white text-black p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">To-Do List</h2>
            <p>Keep track of your tasks and to-dos with our integrated to-do list. Stay organized and never miss a deadline.</p>
          </div>
          <div className="bg-white text-black p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Calendar Notes</h2>
            <p>Plan your days and weeks with our calendar notes. Schedule your tasks and appointments directly within your notes.</p>
          </div>
        </div>
      </main>
    </div>
  )
}
