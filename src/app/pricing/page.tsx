import Head from 'next/head'
import NavBar from '@/components/Navbar';
export default function Pricing() {
  return (
    <div>
      <Head>
        <title>Pricing - VoidNote</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto py-8 text-center">
        <h1 className="text-4xl font-bold mb-8">Pricing</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white text-black p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Free</h2>
            <p className="text-xl mb-4">$0/month</p>
            <ul className="list-disc list-inside text-left mb-4">
              <li>Basic Notes</li>
              <li>Tree Notes</li>
              <li>To-Do List</li>
              <li>Calendar Notes</li>
            </ul>
            <button className="bg-black text-white py-2 px-4 rounded">Get Started</button>
          </div>
          <div className="bg-white text-black p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Starter</h2>
            <p className="text-xl mb-4">$5/month</p>
            <ul className="list-disc list-inside text-left mb-4">
              <li>All Free Features</li>
              <li>Priority Support</li>
              <li>More Storage</li>
            </ul>
            <button className="bg-black text-white py-2 px-4 rounded">Get Started</button>
          </div>
          <div className="bg-white text-black p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Pro</h2>
            <p className="text-xl mb-4">$15/month</p>
            <ul className="list-disc list-inside text-left mb-4">
              <li>All Starter Features</li>
              <li>Unlimited Notes</li>
              <li>Advanced Security</li>
              <li>Team Collaboration</li>
            </ul>
            <button className="bg-black text-white py-2 px-4 rounded">Get Started</button>
          </div>
        </div>
      </main>
    </div>
  )
}
