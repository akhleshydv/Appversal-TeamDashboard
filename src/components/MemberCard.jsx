import React from 'react';
import { useSelector } from 'react-redux';

const MemberCard = ({ member, onAssignTask }) => {
  const { darkMode } = useSelector((state) => state.settings);
  
  const statusColors = {
    Working: darkMode 
      ? 'bg-green-900 text-green-300 border-green-700'
      : 'bg-green-100 text-green-800 border-green-300',
    Break: darkMode
      ? 'bg-yellow-900 text-yellow-300 border-yellow-700'
      : 'bg-yellow-100 text-yellow-800 border-yellow-300',
    Meeting: darkMode
      ? 'bg-blue-900 text-blue-300 border-blue-700'
      : 'bg-blue-100 text-blue-800 border-blue-300',
    Offline: darkMode
      ? 'bg-gray-700 text-gray-300 border-gray-600'
      : 'bg-gray-100 text-gray-800 border-gray-300',
  };

  const activeTasks = member.tasks.filter((task) => !task.completed).length;

  return (
    <div className={`rounded-lg shadow-md p-5 border hover:shadow-lg transition-all ${
      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          {member.avatar ? (
            <img 
              src={member.avatar} 
              alt={member.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-primary-200"
            />
          ) : (
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold ${
              darkMode ? 'bg-primary-700 text-primary-200' : 'bg-primary-200 text-primary-700'
            }`}>
              {member.name.charAt(0)}
            </div>
          )}
          <div>
            <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{member.name}</h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Active Tasks: {activeTasks}</p>
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold border ${
            statusColors[member.status] || statusColors.Offline
          }`}
        >
          {member.status}
        </span>
      </div>
      
      {member.tasks.length > 0 && (
        <div className={`mt-3 pt-3 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <p className={`text-xs mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Recent Tasks:</p>
          <div className="space-y-1">
            {member.tasks.slice(0, 2).map((task) => (
              <div key={task.id} className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <span className={task.completed ? `line-through ${darkMode ? 'text-gray-500' : 'text-gray-400'}` : ''}>
                  {task.title}
                </span>
                {!task.completed && (
                  <span className={`ml-2 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    ({task.progress}%)
                  </span>
                )}
              </div>
            ))}
            {member.tasks.length > 2 && (
              <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>+{member.tasks.length - 2} more</p>
            )}
          </div>
        </div>
      )}
      
      {onAssignTask && (
        <button
          onClick={() => onAssignTask(member.id)}
          className="mt-3 w-full px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
        >
          Assign Task
        </button>
      )}
    </div>
  );
};

export default MemberCard;
