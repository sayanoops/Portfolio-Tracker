import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { Auth } from './components/Auth';
import { Dashboard } from './components/Dashboard';
import { StockForm } from './components/StockForm';
import { StockList } from './components/StockList';
import { Stock } from './types';
import { LogOut,Linkedin } from 'lucide-react';
import { FaGithub } from "react-icons/fa";
import { Session } from '@supabase/supabase-js';
import Lofi from './Lofi';

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [userFullName, setUserFullName] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        setUserFullName(session.user.user_metadata.full_name || '');
      }
      setLoading(false);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        setUserFullName(session.user.user_metadata.full_name || '');
      }
    });
  }, []);

  useEffect(() => {
    if (session) {
      fetchStocks();
    }
  }, [session]);

  const fetchStocks = async () => {
    const { data } = await supabase
      .from('stocks')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) {
      setStocks(data);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!session) {
    return <Auth />;
  }

  return (
    <div className="min-h-screen bg-hexa bg-no-repeat bg-cover">
      <nav>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-3xl font-extrabold text-gray-50">Welcome to my Portfolio Tracker, <span className='text-green-400'>{userFullName}</span></h1>
            </div>
            <div className="relative top-3 left-48"><Lofi/></div>
            <div className="flex items-center">
              <button
                onClick={handleSignOut}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-indigo-500"
              >
                <LogOut className="h-5 w-5 mr-2"/>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <Dashboard stocks={stocks} />
          <StockForm onStockAdded={fetchStocks} />
          <StockList stocks={stocks} onStockDeleted={fetchStocks} />
        </div>
      </main>
      <footer className='flex justify-center text-zinc-300 font-extrabold'>
        <span className='mr-96'>Made with ❤️ by Sayan</span>
        <span className='ml-96 mr-5'>contact me</span>
        <a href='https://www.linkedin.com/in/sayan-bag-17867a258/'><Linkedin className='h-5 w-5'/></a>
        <a href='https://github.com/sayanoops'><FaGithub className='h-5 w-5 ml-3'/></a>
      </footer>
    </div>
  );
}

export default App;