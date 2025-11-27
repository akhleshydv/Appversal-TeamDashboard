import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { switchRole } from '../redux/slices/roleSlice';

const Header = () => {
  const dispatch = useDispatch();
  const { currentRole, currentUser } = useSelector((state) => state.role);
  const { darkMode } = useSelector((state) => state.settings);
  const members = useSelector((state) => state.members.members);
  
  const currentMember = members.find((m) => m.name === currentUser);

  const getLeadTextColor = () => {
    if (currentRole === 'lead' && !darkMode) return 'text-primary-600';
    if (currentRole === 'lead' && darkMode) return 'text-primary-400';
    return darkMode ? 'text-gray-400' : 'text-gray-500';
  };

  const getMemberTextColor = () => {
    if (currentRole === 'member' && !darkMode) return 'text-primary-600';
    if (currentRole === 'member' && darkMode) return 'text-primary-400';
    return darkMode ? 'text-gray-400' : 'text-gray-500';
  };

  const handleRoleSwitch = () => {
    const newRole = currentRole === 'lead' ? 'member' : 'lead';
    dispatch(switchRole(newRole));
  };

  return (
    <header className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm border-b px-6 py-4 ml-64 transition-colors`}>
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <span className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              🔍
            </span>
            <input
              type="text"
              placeholder="Search"
              className={`w-full pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'border border-gray-300 bg-white'
              }`}
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
            darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
          }`}>
            <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>ℹ️</span>
          </button>
          
          <div className="flex -space-x-2">
            {members.slice(0, 3).map((member) => (
              member.avatar ? (
                <img
                  key={member.id}
                  src={member.avatar}
                  alt={member.name}
                  className="w-8 h-8 rounded-full object-cover border-2 border-white hover:z-10 transition-transform hover:scale-110"
                  title={member.name}
                />
              ) : (
                <div
                  key={member.id}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 border-2 border-white flex items-center justify-center text-white text-xs font-semibold hover:z-10 transition-transform hover:scale-110"
                  title={member.name}
                >
                  {member.name.charAt(0)}
                </div>
              )
            ))}
          </div>

          <button className="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 transition-colors">
            <span className="text-xl">+</span>
          </button>

          <button className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors relative ${
            darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
          }`}>
            <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>🔔</span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className={`flex items-center space-x-3 pl-4 border-l ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="text-right">
              <p className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{currentUser}</p>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {currentRole === 'lead' ? 'Team Lead' : 'Team Member'}
              </p>
            </div>
            {currentMember?.avatar ? (
              <img 
                src={currentMember.avatar} 
                alt={currentUser}
                className="w-10 h-10 rounded-full object-cover border-2 border-primary-200"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                {currentUser.charAt(0)}
              </div>
            )}
          </div>

          <div className={`flex items-center space-x-3 px-4 py-2 rounded-xl transition-all duration-300 ${
            darkMode 
              ? 'bg-gradient-to-r from-gray-700 to-gray-800 border border-gray-600 shadow-lg' 
              : 'bg-gradient-to-r from-gray-50 to-white border border-gray-200 shadow-md'
          } hover:shadow-xl`}>
            <div className="flex items-center space-x-2">
              <span className={`text-lg transition-all duration-300 ${
                currentRole === 'lead' 
                  ? 'text-primary-600 scale-110' 
                  : 'text-gray-400 scale-100'
              }`}>
                👔
              </span>
              <span className={`text-xs font-semibold transition-all duration-300 ${getLeadTextColor()}`}>
                Lead
              </span>
            </div>
            
            <button
              onClick={handleRoleSwitch}
              className={`relative w-14 h-7 rounded-full transition-all duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                currentRole === 'lead' 
                  ? 'bg-gradient-to-r from-primary-600 to-primary-700 shadow-lg shadow-primary-500/50' 
                  : 'bg-gradient-to-r from-gray-400 to-gray-500 shadow-md'
              } hover:scale-105 active:scale-95`}
              aria-label="Toggle role"
            >
              <div
                className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-lg transition-all duration-500 ease-in-out transform ${
                  currentRole === 'lead' 
                    ? 'translate-x-7 scale-100' 
                    : 'translate-x-0 scale-100'
                }`}
              >
                <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
                  currentRole === 'lead'
                    ? 'bg-gradient-to-br from-primary-400 to-primary-600 opacity-20'
                    : 'bg-gradient-to-br from-gray-300 to-gray-400 opacity-20'
                }`}></div>
              </div>
            </button>
            
            <div className="flex items-center space-x-2">
              <span className={`text-xs font-semibold transition-all duration-300 ${getMemberTextColor()}`}>
                Member
              </span>
              <span className={`text-lg transition-all duration-300 ${
                currentRole === 'member' 
                  ? 'text-primary-600 scale-110' 
                  : 'text-gray-400 scale-100'
              }`}>
                👤
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
