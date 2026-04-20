import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './lib/firebase';
import { getUserProfile, saveUserProfile } from './services/userService';
import Home from './components/Home';
import Survey from './components/Survey';
import Dashboard from './components/Dashboard';
import Education from './components/Education';
import { UserData } from './types';
import { Loader2 } from 'lucide-react';

type View = 'home' | 'survey' | 'dashboard' | 'education';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        try {
          const profile = await getUserProfile(firebaseUser.uid);
          if (profile) {
            setUserData(profile);
            setCurrentView('dashboard');
          } else {
            setCurrentView('survey');
          }
        } catch (e) {
          console.error(e);
          setCurrentView('home');
        }
      } else {
        setUserData(null);
        setCurrentView('home');
      }
      setLoadingComplete(true);
    });
    return () => unsubscribe();
  }, []);

  const handleSurveyComplete = async (data: UserData) => {
    setUserData(data);
    if (user) {
      await saveUserProfile(user.uid, data);
    }
    setCurrentView('dashboard');
  };

  const handleNavigate = (view: View) => {
    setCurrentView(view);
  };

  if (!loadingComplete) {
    return (
      <div className="min-h-screen bg-teal-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-teal-50 text-gray-900 font-sans selection:bg-teal-200">
      <AnimatePresence mode="wait">
        {currentView === 'home' && (
          <motion.div key="home" className="h-full">
            <Home />
          </motion.div>
        )}
        {currentView === 'survey' && (
          <motion.div key="survey" className="h-full">
            <Survey onComplete={handleSurveyComplete} />
          </motion.div>
        )}
        {currentView === 'dashboard' && userData && (
          <motion.div key="dashboard" className="h-full">
            <Dashboard
              data={userData}
              onNavigate={handleNavigate}
            />
          </motion.div>
        )}
        {currentView === 'education' && (
          <motion.div key="education" className="h-full">
            <Education onBack={() => handleNavigate('dashboard')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

