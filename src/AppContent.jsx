import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import useAutoReset from './hooks/useAutoReset';
import { fetchMembers } from './redux/slices/membersSlice';
import { setUser } from './redux/slices/roleSlice';

const AppContent = () => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.settings);
  const { members, loading } = useSelector((state) => state.members);
  
  // Initialize auto-reset functionality
  useAutoReset();

  // Fetch members from API on component mount
  useEffect(() => {
    if (members.length === 0 && !loading) {
      dispatch(fetchMembers(6)).then((result) => {
        // Set the first member as the current user
        if (result.payload && result.payload.members.length > 0) {
          dispatch(setUser(result.payload.members[0].name));
        }
      });
    }
  }, [dispatch, members.length, loading]);

  // Show loading state
  if (loading && members.length === 0) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Loading team members...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Sidebar />
      <Header />
      <Dashboard />
    </div>
  );
};

export default AppContent;

