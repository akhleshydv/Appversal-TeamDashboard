import React, { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import StatusSelector from '../components/StatusSelector';
import TaskList from '../components/TaskList';
import MemberCard from '../components/MemberCard';
import TaskForm from '../components/TaskForm';
import LineChart from '../components/LineChart';
import DonutChart from '../components/DonutChart';
import StatusPieChart from '../components/StatusPieChart';

const Dashboard = () => {
  const { currentRole } = useSelector((state) => state.role);
  const members = useSelector((state) => state.members.members);
  const { darkMode } = useSelector((state) => state.settings);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [chartData, setChartData] = useState([
    { label: '0 Jan', value: 50 },
    { label: '31 Jan', value: 120 },
    { label: '22 Feb', value: 180 },
    { label: '15 Mar', value: 250 },
    { label: '05 Apr', value: 320 },
    { label: '26 Apr', value: 380 },
    { label: '17 May', value: 420 },
    { label: '08 Jun', value: 450 },
    { label: '29 Jun', value: 480 },
    { label: '20 Jul', value: 500 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData((prevData) => {
        const newData = [...prevData];
        newData.shift();
        
        const lastValue = newData.at(-1).value;
        const newValue = Math.max(50, Math.min(600, lastValue + Math.floor(Math.random() * 60) - 20));
        
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const lastLabel = newData.at(-1).label;
        const [day, month] = lastLabel.split(' ');
        const monthIndex = months.indexOf(month);
        const newDay = Number.parseInt(day) + 10;
        const newMonth = newDay > 31 ? months[(monthIndex + 1) % 12] : month;
        const finalDay = newDay > 31 ? newDay - 31 : newDay;
        
        newData.push({
          label: `${finalDay} ${newMonth}`,
          value: newValue,
        });
        
        return newData;
      });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const statusSummary = useMemo(() => {
    const summary = {
      Working: 0,
      Break: 0,
      Meeting: 0,
      Offline: 0,
    };
    for (const member of members) {
      summary[member.status] = (summary[member.status] || 0) + 1;
    }
    return summary;
  }, [members]);

  const totalEmployees = 423;
  const womenCount = Math.floor(totalEmployees * 0.55);
  const menCount = totalEmployees - womenCount;

  const upcomingInterviews = [
    { name: 'Natalie Gibson', role: 'UI/UX Designer', time: '1.30 - 1:30', avatar: '👩' },
    { name: 'Peter Piperg', role: 'Web Design', time: '9.00 - 1:30', avatar: '👨' },
  ];

  const filteredAndSortedMembers = useMemo(() => {
    let filtered = members;
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter((m) => m.status === statusFilter);
    }
    
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'tasks') {
        const aTasks = a.tasks.filter((t) => !t.completed).length;
        const bTasks = b.tasks.filter((t) => !t.completed).length;
        return bTasks - aTasks;
      }
      return 0;
    });
    
    return sorted;
  }, [members, statusFilter, sortBy]);

  const handleAssignTask = (memberId) => {
    setSelectedMemberId(memberId);
    setShowTaskForm(true);
  };

  // Team Member View
  if (currentRole === 'member') {
    return (
      <div className={`ml-64 min-h-screen p-6 transition-colors ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto space-y-6">
          <StatusSelector />
          <TaskList />
        </div>
      </div>
    );
  }

  // Team Lead View - Exact Dashboard Layout
  return (
    <div className={`ml-64 min-h-screen p-6 transition-colors ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Row: Employees Info and Applications */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Employees Info Chart */}
          <div className={`lg:col-span-2 rounded-lg shadow-md p-6 border transition-colors ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Employees Info</h2>
            <LineChart data={chartData} />
          </div>

          {/* Applications Card */}
          <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg shadow-lg p-6 text-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📄</span>
                </div>
              </div>
              <p className="text-6xl font-bold mb-2">1546</p>
              <p className="text-lg font-medium">Applications</p>
            </div>
            <div className="absolute bottom-0 right-0 opacity-20 transform translate-x-4 translate-y-4">
              <div className="text-8xl">👨‍💼</div>
            </div>
          </div>
        </div>

        {/* Second Row: Interviews and Hired Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Interviews Card */}
          <div className={`rounded-lg shadow-md p-6 border transition-colors ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
                  darkMode ? 'bg-green-900' : 'bg-green-100'
                }`}>
                  <span className="text-2xl">👥</span>
                </div>
                <div>
                  <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>246</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Interviews</p>
                </div>
              </div>
              <div className={darkMode ? 'text-gray-600' : 'text-gray-300'}>
                <span className="text-4xl">📈</span>
              </div>
            </div>
          </div>

          {/* Hired Card */}
          <div className={`rounded-lg shadow-md p-6 border transition-colors ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
                  darkMode ? 'bg-green-900' : 'bg-green-100'
                }`}>
                  <span className="text-2xl">✓</span>
                </div>
                <div>
                  <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>101</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Hired</p>
                </div>
              </div>
              <div className={darkMode ? 'text-gray-600' : 'text-gray-300'}>
                <span className="text-4xl">📈</span>
              </div>
            </div>
          </div>
        </div>

        {/* Status Distribution Chart */}
        <div className={`rounded-lg shadow-md p-6 border transition-colors ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Team Status Distribution
          </h2>
          <div className="flex items-center justify-between mb-4">
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <span className="font-semibold">{statusSummary.Working} Working</span>
              {' · '}
              <span className="font-semibold">{statusSummary.Meeting} Meeting</span>
              {' · '}
              <span className="font-semibold">{statusSummary.Break} Break</span>
              {' · '}
              <span className="font-semibold">{statusSummary.Offline} Offline</span>
            </p>
          </div>
          <StatusPieChart statusSummary={statusSummary} />
        </div>

        {/* Bottom Row: Availability, Total Employees, Upcoming Interviews */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Employees Availability */}
          <div className={`rounded-lg shadow-md p-6 border transition-colors ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Employees Availability</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className={`rounded-lg p-4 border transition-colors ${
                darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-2xl">✓</span>
                  <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Attendance</span>
                </div>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>400</p>
              </div>
              
              <div className={`rounded-lg p-4 border transition-colors ${
                darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-2xl">🕐</span>
                  <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Late Coming</span>
                </div>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>17</p>
              </div>
              
              <div className={`rounded-lg p-4 border transition-colors ${
                darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-2xl">○</span>
                  <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Absent</span>
                </div>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>06</p>
              </div>
              
              <div className={`rounded-lg p-4 border transition-colors ${
                darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-2xl">🏖️</span>
                  <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Leave Apply</span>
                </div>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>14</p>
              </div>
            </div>
          </div>

          {/* Total Employees */}
          <div className={`rounded-lg shadow-md p-6 border transition-colors ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Total Employees</h2>
              <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{totalEmployees}</span>
            </div>
            <DonutChart women={womenCount} men={menCount} total={totalEmployees} />
          </div>

          {/* Upcoming Interviews */}
          <div className={`rounded-lg shadow-md p-6 border transition-colors ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Upcoming Interviews</h2>
            <div className="space-y-4">
              {upcomingInterviews.map((interview) => (
                <div key={interview.name} className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xl">
                    {interview.avatar}
                  </div>
                  <div className="flex-1">
                    <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{interview.name}</p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{interview.role}</p>
                  </div>
                  <div className={`flex items-center space-x-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <span>🕐</span>
                    <span className="text-sm">{interview.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Management Section (for functionality) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-1">
            {showTaskForm ? (
              <TaskForm
                selectedMemberId={selectedMemberId}
                onClose={() => {
                  setShowTaskForm(false);
                  setSelectedMemberId(null);
                }}
              />
            ) : (
              <div className={`rounded-lg shadow-md p-6 border transition-colors ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Assign Tasks</h2>
                <button
                  onClick={() => setShowTaskForm(true)}
                  className="w-full px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  + Create New Task
                </button>
              </div>
            )}
          </div>

          <div className={`lg:col-span-2 rounded-lg shadow-md p-6 border transition-colors ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 space-y-3 md:space-y-0">
              <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Team Members</h2>
              
              <div className="flex flex-wrap gap-3">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className={`px-3 py-2 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm transition-colors ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'border border-gray-300 bg-white'
                  }`}
                >
                  <option value="all">All Statuses</option>
                  <option value="Working">Working</option>
                  <option value="Break">Break</option>
                  <option value="Meeting">Meeting</option>
                  <option value="Offline">Offline</option>
                </select>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={`px-3 py-2 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm transition-colors ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'border border-gray-300 bg-white'
                  }`}
                >
                  <option value="name">Sort by Name</option>
                  <option value="tasks">Sort by Active Tasks</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredAndSortedMembers.map((member) => (
                <MemberCard
                  key={member.id}
                  member={member}
                  onAssignTask={handleAssignTask}
                />
              ))}
            </div>
            
            {filteredAndSortedMembers.length === 0 && (
              <p className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                No members found with the selected filter.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

