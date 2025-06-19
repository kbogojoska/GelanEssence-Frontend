import { Routes, Route, Link } from 'react-router-dom';
import MoodSelector from "./components/MoodSelector";
import MoodGraph from "./components/MoodGraph";


function App() {

  let newDate = new Date();
  
  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-tr from-purple-100 via-purple-200 to-indigo-100 font-sans text-zinc-800">
    <header className="sticky top-0 left-0 z-50 w-full bg-white/70 backdrop-blur-md shadow-md transition-all duration-300 ease-in-out">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 
                      flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
        <Link
          to="/"
          className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-purple-400 rounded"
          aria-label="Home - GelanEssence"
        >
          <h1 className="text-base sm:text-lg font-medium text-purple-700 tracking-tight drop-shadow-sm">
      GelanEssence
      <span
        className="inline-block ml-1 animate-bounce-slow"
        role="img"
        aria-hidden="true"
      >
        ✨
      </span>
    </h1>

    </Link>

    <nav className="flex flex-wrap justify-center gap-3 sm:gap-4 text-base sm:text-lg font-medium">
      <Link
        to="/"
        className="px-4 py-2 rounded-full bg-purple-100 text-purple-800 hover:bg-purple-200 
                   transition-colors duration-200 shadow-sm hover:shadow-md
                   focus:outline-none focus:ring-2 focus:ring-purple-400"
      >
        Today’s Mood
      </Link>
      <Link
        to="/progress"
        className="px-4 py-2 rounded-full bg-purple-100 text-purple-800 hover:bg-purple-200 
                   transition-colors duration-200 shadow-sm hover:shadow-md
                   focus:outline-none focus:ring-2 focus:ring-purple-400"
      >
        Weekly Report
      </Link>
    </nav>
  </div>
</header>



  <main className="flex-1 w-full max-w-7xl mx-auto px-4 mb-10">
    <Routes>
      <Route path="/" element={<MoodSelector />} />
      <Route path="/progress" element={<MoodGraph />} />
    </Routes>
  </main>

  <footer className="w-full max-w-7xl mx-auto mt-8 text-right text-purple-600 py-4">
    <span className="text-indigo-500"><b>@GelanEssence {newDate.getFullYear()}</b></span>
  </footer>
</div>

  );
}

export default App;