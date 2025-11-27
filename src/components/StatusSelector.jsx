import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateMemberStatus, updateLastActivity } from '../redux/slices/membersSlice';

const StatusSelector = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.role);
  const members = useSelector((state) => state.members.members);
  const { darkMode } = useSelector((state) => state.settings);
  
  // Find current user's member data
  const currentMember = members.find(
    (m) => m.name === currentUser
  ) || members[0]; // Fallback to first member if not found

  // Track activity when component mounts or user changes
  useEffect(() => {
    if (currentMember) {
      dispatch(updateLastActivity({ memberId: currentMember.id }));
    }
  }, [currentMember, dispatch]);

  const statuses = [
    { 
      value: 'Working', 
      label: 'Working', 
      color: 'bg-green-500',
      borderColor: 'border-green-600',
      bgActive: 'bg-green-500'
    },
    { 
      value: 'Break', 
      label: 'Break', 
      color: 'bg-yellow-500',
      borderColor: 'border-yellow-600',
      bgActive: 'bg-yellow-500'
    },
    { 
      value: 'Meeting', 
      label: 'Meeting', 
      color: 'bg-blue-500',
      borderColor: 'border-blue-600',
      bgActive: 'bg-blue-500'
    },
    { 
      value: 'Offline', 
      label: 'Offline', 
      color: 'bg-gray-500',
      borderColor: 'border-gray-600',
      bgActive: 'bg-gray-500'
    },
  ];

  const handleStatusChange = (status) => {
    if (currentMember) {
      dispatch(updateMemberStatus({
        memberId: currentMember.id,
        status,
      }));
      // Update activity time when status changes (updateMemberStatus already does this, but we ensure it)
      dispatch(updateLastActivity({ memberId: currentMember.id }));
    }
  };

  return (
    <div className={`rounded-lg shadow-md p-6 transition-colors ${
      darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
    }`}>
      <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Update Your Status</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statuses.map((statusItem) => {
          const isActive = currentMember?.status === statusItem.value;
          return (
            <button
              key={statusItem.value}
              onClick={() => handleStatusChange(statusItem.value)}
              className={`p-4 rounded-lg border-2 transition-all ${
                isActive
                  ? `${statusItem.borderColor} ${statusItem.bgActive} text-white`
                  : darkMode
                    ? 'border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500'
                    : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className={`w-4 h-4 rounded-full ${statusItem.color} ${
                  isActive ? 'ring-2 ring-white' : ''
                }`}></div>
                <span className="font-medium">{statusItem.label}</span>
              </div>
            </button>
          );
        })}
      </div>
      <div className={`mt-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        Current Status: <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-700'}`}>{currentMember?.status || 'Offline'}</span>
      </div>
    </div>
  );
};

export default StatusSelector;

