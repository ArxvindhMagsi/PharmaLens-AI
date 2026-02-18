import React, { useState } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Analyze from './pages/Analyze';
import Search from './pages/Search';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'analyze' | 'search'>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'analyze':
        return <Analyze />;
      case 'search':
        return <Search />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-primary-200">
      <Header onNavigate={setCurrentPage} currentPage={currentPage} />
      <main>
        {renderPage()}
      </main>
      <footer className="bg-white border-t border-slate-200 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} PharmaLens AI. All rights reserved.
          </p>
          <p className="text-slate-400 text-xs mt-2">
            Warning: This tool is for informational purposes only and does not Complete provide medical advice.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
