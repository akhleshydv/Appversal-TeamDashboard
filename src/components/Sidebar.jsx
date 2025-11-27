import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDarkMode, toggleRtlMode } from '../redux/slices/settingsSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { darkMode, rtlMode } = useSelector((state) => state.settings);

  const menuItems = [
    { icon: '🏠', label: 'Dashboard' },
    { icon: '💼', label: 'Projects' },
    { icon: '🎫', label: 'Tickets' },
    { icon: '👥', label: 'Our Clients' },
    { icon: '👨‍👩‍👧', label: 'Employees' },
    { icon: '🏢', label: 'Accounts' },
    { icon: '💰', label: 'Payroll' },
    { icon: '📱', label: 'App' },
    { icon: '📄', label: 'Other Pages' },
    { icon: '✨', label: 'UI Components' },
  ];

  return (
    <aside className="w-64 bg-gradient-to-b from-primary-600 to-primary-800 min-h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <span className="text-primary-600 text-2xl font-bold">📊</span>
          </div>
          <h1 className="text-white text-xl font-bold">My-Task</h1>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between p-3 text-white hover:bg-primary-700 rounded-lg cursor-pointer transition-colors"
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </div>
              <span className="text-xs">▼</span>
            </div>
          ))}
        </nav>

        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-between p-3 bg-primary-700 rounded-lg">
            <span className="text-white text-sm">Enable Dark Mode!</span>
            <button
              onClick={() => dispatch(toggleDarkMode())}
              className={`w-12 h-6 rounded-full transition-colors ${
                darkMode ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  darkMode ? 'transform translate-x-6' : 'transform translate-x-0.5'
                }`}
              ></div>
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-primary-700 rounded-lg">
            <span className="text-white text-sm">Enable RTL Mode!</span>
            <button
              onClick={() => dispatch(toggleRtlMode())}
              className={`w-12 h-6 rounded-full transition-colors ${
                rtlMode ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  rtlMode ? 'transform translate-x-6' : 'transform translate-x-0.5'
                }`}
              ></div>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

