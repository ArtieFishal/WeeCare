import React from 'react';
import { ChapterList } from './components/ChapterList';
import { ChapterContent } from './components/ChapterContent';
import { ThemeProvider } from './components/theme-provider';
import { ModeToggle } from './components/mode-toggle';
import { useState, useEffect } from 'react';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');
  const [selectedChapter, setSelectedChapter] = useState(1);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | undefined || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <ThemeProvider defaultTheme={theme} storageKey="theme">
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <header className="bg-card shadow-md">
          <div className="container mx-auto px-4 py-6 flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl font-bold text-primary">
              <span className="mr-2">🏫</span>
              Child Care Center Guide
            </h1>
            <ModeToggle />
          </div>
        </header>
        
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1">
              <ChapterList 
                selectedChapter={selectedChapter} 
                onSelectChapter={setSelectedChapter} 
              />
            </aside>
            
            <div className="lg:col-span-3">
              <ChapterContent chapterId={selectedChapter} />
            </div>
          </div>
        </main>
        
        <footer className="bg-muted mt-12 py-8">
          <div className="container mx-auto px-4 text-center">
            <p className="text-muted-foreground">
              Essential Strategies for Running a Successful Child Care Center
            </p>
            <div className="mt-4 flex justify-center space-x-4">
              <a href="#" className="text-primary hover:underline">About</a>
              <a href="#" className="text-primary hover:underline">Resources</a>
              <a href="#" className="text-primary hover:underline">Contact</a>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              © {new Date().getFullYear()} Child Care Center Guide. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
