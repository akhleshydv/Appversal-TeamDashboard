import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { assignTask } from '../redux/slices/membersSlice';

const TaskForm = ({ selectedMemberId, onClose }) => {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.members.members);
  const { darkMode } = useSelector((state) => state.settings);
  
  const [formData, setFormData] = useState({
    memberId: selectedMemberId || '',
    title: '',
    dueDate: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.memberId && formData.title && formData.dueDate) {
      dispatch(assignTask({
        memberId: formData.memberId,
        task: {
          title: formData.title,
          dueDate: formData.dueDate,
        },
      }));
      setFormData({ memberId: '', title: '', dueDate: '' });
      if (onClose) onClose();
    }
  };

  return (
    <div className={`rounded-lg shadow-lg p-6 border transition-colors ${
      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Assign New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Team Member
          </label>
          <select
            value={formData.memberId}
            onChange={(e) => setFormData({ ...formData, memberId: e.target.value })}
            className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'border border-gray-300 bg-white'
            }`}
            required
          >
            <option value="">Select a member</option>
            {members.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Task Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'border border-gray-300 bg-white'
            }`}
            placeholder="Enter task title"
            required
          />
        </div>
        
        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Due Date
          </label>
          <input
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'border border-gray-300 bg-white'
            }`}
            required
          />
        </div>
        
        <div className="flex space-x-3">
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            Assign Task
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-lg transition-colors font-medium ${
                darkMode
                  ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;

