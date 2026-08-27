import React, { useState, useEffect } from 'react';
import { HiOutlineBell, HiOutlineSun, HiOutlineMoon, HiOutlineCheckCircle, HiOutlineSparkles, HiOutlineXMark } from 'react-icons/hi2';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const DEFAULT_NOTIFICATIONS = [
  { id: 1, title: 'Welcome to SyncSpace Platform!', desc: 'Start your journey by completing your skill assessment.', time: 'Just now', unread: true },
  { id: 2, title: 'AI Mock Interview Ready', desc: 'Practice with our adaptive Gemini interviewer for your target role.', time: '10m ago', unread: true },
  { id: 3, title: 'Coding Arena Active', desc: 'Solve algorithm challenges to earn verified skill points.', time: '1h ago', unread: false }
];

const Navbar = () => {
  const { user, role } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  
  const storageKey = user?.id ? `syncspace_notifications_${user.id}` : 'syncspace_notifications_guest';
  
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : DEFAULT_NOTIFICATIONS;
    } catch {
      return DEFAULT_NOTIFICATIONS;
    }
  });

  // Keep notifications state synchronized with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(notifications));
    } catch (e) {}
  }, [notifications, storageKey]);

  const pageTitle = role 
    ? `${role.charAt(0).toUpperCase() + role.slice(1)} Dashboard` 
    : 'Dashboard';

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <div className="h-16 bg-white/90 dark:bg-gray-900/90 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 sticky top-0 z-40 backdrop-blur-xl transition-colors">
      <h1 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">{pageTitle}</h1>
      
      <div className="flex items-center space-x-5">
        {/* Dark/Light Toggle */}
        <button 
          onClick={toggleTheme} 
          className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <HiOutlineSun className="w-5 h-5 text-amber-400" /> : <HiOutlineMoon className="w-5 h-5" />}
        </button>

        {/* Notifications Bell */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all relative"
            aria-label="Notifications"
          >
            <HiOutlineBell className="w-5 h-5" />
            {unreadCount > 0 && (
              <>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full animate-ping"></span>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
              </>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 py-3 z-50 animate-slide-up">
              <div className="flex justify-between items-center px-4 pb-2 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                      {unreadCount} New
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button onClick={markAllRead} className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                      Mark read
                    </button>
                  )}
                  <button onClick={() => setShowNotifications(false)} className="text-gray-400 hover:text-gray-600">
                    <HiOutlineXMark className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-gray-50 dark:divide-gray-800/60">
                {notifications.length > 0 ? (
                  notifications.map(n => (
                    <div key={n.id} className={`p-3.5 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${n.unread ? 'bg-indigo-50/40 dark:bg-indigo-950/20' : ''}`}>
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-xs text-gray-900 dark:text-white flex items-center gap-1.5">
                          {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>}
                          {n.title}
                        </h4>
                        <span className="text-[10px] text-gray-400">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-gray-600 dark:text-gray-400 mt-1 leading-relaxed pl-3">{n.desc}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-400 text-center py-6">No new notifications</p>
                )}
              </div>

              {notifications.length > 0 && (
                <div className="pt-2 px-4 border-t border-gray-100 dark:border-gray-800 text-center">
                  <button onClick={clearNotifications} className="text-[11px] font-semibold text-gray-500 hover:text-rose-600">
                    Clear all notifications
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* User Profile Pill */}
        <div className="flex items-center space-x-3 pl-2 border-l border-gray-200 dark:border-gray-800">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-bold text-gray-900 dark:text-white leading-tight">{user?.name || 'User'}</div>
            <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold capitalize">{role || 'Student'}</div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-indigo-500/20 border border-indigo-700">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
