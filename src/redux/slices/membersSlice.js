import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const formatDate = (date) => {
  return date.toISOString().split('T')[0];
};

export const fetchMembers = createAsyncThunk(
  'members/fetchMembers',
  async (count = 6) => {
    try {
      const response = await fetch(`https://randomuser.me/api/?results=${count}&nat=us,gb,ca,au`);
      const data = await response.json();
      
      const statuses = ['Working', 'Break', 'Meeting', 'Offline'];
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const nextWeek = new Date(today);
      nextWeek.setDate(nextWeek.getDate() + 7);
      
      const members = data.results.map((user, index) => {
        const fullName = `${user.name.first} ${user.name.last}`;
        
        const tasks = index === 0 ? [
          {
            id: `task-${Date.now()}-1`,
            title: 'Complete Dashboard UI Design',
            dueDate: formatDate(tomorrow),
            progress: 60,
            completed: false,
          },
          {
            id: `task-${Date.now()}-2`,
            title: 'Review Team Member Reports',
            dueDate: formatDate(nextWeek),
            progress: 30,
            completed: false,
          },
          {
            id: `task-${Date.now()}-3`,
            title: 'Update Project Documentation',
            dueDate: formatDate(today),
            progress: 100,
            completed: true,
          },
        ] : [];
        
        return {
          id: `member-${user.login.uuid}`,
          name: fullName,
          email: user.email,
          avatar: user.picture.medium,
          status: statuses[index % statuses.length],
          tasks,
        };
      });
      
      const lastActivityTime = {};
      for (const member of members) {
        lastActivityTime[member.id] = Date.now();
      }
      
      return { members, lastActivityTime };
    } catch (error) {
      console.error('Error fetching members:', error);
      throw error;
    }
  }
);

const membersSlice = createSlice({
  name: 'members',
  initialState: {
    members: [],
    lastActivityTime: {},
    loading: false,
    error: null,
  },
  reducers: {
    updateMemberStatus: (state, action) => {
      const { memberId, status } = action.payload;
      const member = state.members.find((m) => m.id === memberId);
      if (member) {
        member.status = status;
        state.lastActivityTime[memberId] = Date.now();
      }
    },
    updateLastActivity: (state, action) => {
      const { memberId } = action.payload;
      state.lastActivityTime[memberId] = Date.now();
    },
    resetInactiveMembers: (state) => {
      const tenMinutesAgo = Date.now() - 10 * 60 * 1000;
      for (const member of state.members) {
        const lastActivity = state.lastActivityTime[member.id] || 0;
        if (lastActivity < tenMinutesAgo && member.status !== 'Offline') {
          member.status = 'Offline';
        }
      }
    },
    assignTask: (state, action) => {
      const { memberId, task } = action.payload;
      const member = state.members.find((m) => m.id === memberId);
      if (member) {
        member.tasks.push({
          id: `task-${Date.now()}-${Math.random()}`,
          ...task,
          progress: 0,
          completed: false,
        });
      }
    },
    updateTaskProgress: (state, action) => {
      const { memberId, taskId, progress } = action.payload;
      const member = state.members.find((m) => m.id === memberId);
      if (member) {
        const task = member.tasks.find((t) => t.id === taskId);
        if (task) {
          task.progress = Math.max(0, Math.min(100, progress));
          if (task.progress === 100) {
            task.completed = true;
          } else {
            task.completed = false;
          }
        }
      }
    },
    setMembers: (state, action) => {
      state.members = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMembers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.members = action.payload.members;
        state.lastActivityTime = action.payload.lastActivityTime;
        state.error = null;
      })
      .addCase(fetchMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.members = [];
        state.lastActivityTime = {};
      });
  },
});

export const {
  updateMemberStatus,
  assignTask,
  updateTaskProgress,
  setMembers,
  updateLastActivity,
  resetInactiveMembers,
} = membersSlice.actions;
export default membersSlice.reducer;

