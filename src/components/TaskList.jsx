import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateTaskProgress } from '../redux/slices/membersSlice';

const TaskList = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.role);
  const members = useSelector((state) => state.members.members);
  const { darkMode } = useSelector((state) => state.settings);
  
  // Find current user's member data
  const currentMember = members.find(
    (m) => m.name === currentUser
  ) || members[0]; // Fallback to first member if not found

  const handleProgressChange = (taskId, delta) => {
    if (currentMember) {
      const task = currentMember.tasks.find((t) => t.id === taskId);
      if (task) {
        const newProgress = Math.max(0, Math.min(100, task.progress + delta));
        dispatch(updateTaskProgress({
          memberId: currentMember.id,
          taskId,
          progress: newProgress,
        }));
      }
    }
  };

  if (!currentMember || currentMember.tasks.length === 0) {
    return (
      <div className={`rounded-lg shadow-md p-6 transition-colors ${
        darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
      }`}>
        <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Your Tasks</h2>
        <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>No tasks assigned yet.</p>
      </div>
    );
  }

  return (
    <div className={`rounded-lg shadow-md p-6 transition-colors ${
      darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
    }`}>
      <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Your Tasks</h2>
      <div className="space-y-4">
        {currentMember.tasks.map((task) => (
          <div
            key={task.id}
            className={`p-4 rounded-lg border-2 transition-colors ${
              task.completed
                ? darkMode
                  ? 'border-green-800 bg-green-900 bg-opacity-30'
                  : 'border-green-200 bg-green-50'
                : darkMode
                  ? 'border-gray-600 bg-gray-700'
                  : 'border-gray-200 bg-gray-50'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3
                  className={`font-semibold ${
                    task.completed 
                      ? darkMode ? 'text-gray-500 line-through' : 'text-gray-500 line-through'
                      : darkMode ? 'text-white' : 'text-gray-800'
                  }`}
                >
                  {task.title}
                </h3>
                <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </p>
              </div>
              {task.completed && (
                <span className="px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded">
                  Completed
                </span>
              )}
            </div>
            
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Progress</span>
                <span className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{task.progress}%</span>
              </div>
              <div className={`w-full rounded-full h-3 ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                <div
                  className={`h-3 rounded-full transition-all ${
                    task.completed ? 'bg-green-500' : 'bg-primary-600'
                  }`}
                  style={{ width: `${task.progress}%` }}
                ></div>
              </div>
            </div>
            
            {!task.completed && (
              <div className="flex space-x-2">
                <button
                  onClick={() => handleProgressChange(task.id, -10)}
                  disabled={task.progress === 0}
                  className={`px-3 py-1 rounded transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed ${
                    darkMode
                      ? 'bg-gray-600 text-gray-200 hover:bg-gray-500'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  -10%
                </button>
                <button
                  onClick={() => handleProgressChange(task.id, 10)}
                  disabled={task.progress === 100}
                  className="px-3 py-1 bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  +10%
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;

