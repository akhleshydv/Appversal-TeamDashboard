# Team Pulse Dashboard

Hey there! Welcome to Team Pulse – a simple yet powerful dashboard designed to help teams stay in sync and get work done. Whether you're managing a team or just keeping track of your own tasks, this app has you covered.

Built with React, Redux Toolkit, and Tailwind CSS, it's fast, responsive, and easy to use.

## What Does It Do?

Team Pulse gives you two different perspectives depending on your role:

**If you're a Team Lead**, you get a bird's-eye view of your team. See who's working, who's on break, and who's in a meeting. You can assign tasks, filter team members by their status, and sort them by workload – basically everything you need to keep things running smoothly.

**If you're a Team Member**, you get a personal workspace where you can update your status (working, on break, in a meeting, or offline) and manage your assigned tasks. Update progress as you go, and watch tasks automatically complete when you hit 100%.

### What's Inside?

- Switch between Team Lead and Team Member views instantly
- Real-time status updates (Working, Break, Meeting, Offline)
- Create and assign tasks with due dates
- Track task progress from 0% to 100% in 10% increments
- Filter and sort team members based on status and active tasks
- All state managed cleanly with Redux Toolkit
- Visual analytics with charts powered by Recharts

## Tech Stack

We kept things modern and practical:

- **React** 18.2.0 – Because hooks make life easier
- **Redux Toolkit** 2.0.1 – State management without the headache
- **React Redux** 9.0.4 – Connecting it all together
- **Tailwind CSS** 3.3.6 – Fast styling without writing custom CSS
- **Recharts** 2.15.4 – Beautiful charts with minimal effort

## Getting Started

Ready to run it locally? It's super straightforward.

First, grab the dependencies:

```bash
npm install
```

Then fire up the dev server:

```bash
npm start
```

Your browser should automatically open to [http://localhost:3000](http://localhost:3000). If not, just navigate there manually.

## How It's Organized

Here's a quick tour of the codebase:

```
src/
├── components/
│   ├── Header.jsx           # Top bar with the role switcher
│   ├── Sidebar.jsx          # Navigation sidebar
│   ├── StatusSelector.jsx   # Status buttons for team members
│   ├── MemberCard.jsx       # Individual team member cards
│   ├── TaskForm.jsx         # Form for creating/assigning tasks
│   ├── TaskList.jsx         # Lists tasks with progress controls
│   ├── DonutChart.jsx       # Donut chart visualization
│   ├── LineChart.jsx        # Line chart for trends
│   └── StatusPieChart.jsx   # Pie chart showing status distribution
├── pages/
│   └── Dashboard.jsx        # Main dashboard that switches views
├── redux/
│   ├── store.js             # Redux store setup
│   └── slices/
│       ├── roleSlice.js     # Handles current role and user
│       ├── membersSlice.js  # Team members, statuses, and tasks
│       └── settingsSlice.js # App settings and preferences
├── hooks/
│   └── useAutoReset.js      # Custom hook for auto-reset functionality
├── App.jsx                  # Root component with providers
├── AppContent.jsx           # Main app content wrapper
├── index.js                 # Entry point
└── index.css                # Tailwind imports and global styles
```

Everything is nicely separated, so it's easy to find what you need.

## How the State Works

We're using Redux Toolkit to keep everything organized. Here's what's being tracked:

**Role Slice** – Who you are and what you're doing
- `currentRole`: Either 'lead' or 'member'
- `currentUser`: Your name

**Members Slice** – All the team data
- `members`: An array where each member has:
  - `id`: Unique identifier
  - `name`: Team member's name
  - `status`: Current status (Working, Break, Meeting, or Offline)
  - `tasks`: An array of tasks with:
    - `id`: Task identifier
    - `title`: What the task is about
    - `dueDate`: When it's due
    - `progress`: Percentage complete (0-100)
    - `completed`: Whether it's done or not

**Settings Slice** – App configuration and preferences

## Using the App

### As a Team Lead

1. Click the role switcher in the header to enter **Lead View**
2. You'll see cards for each team member showing their current status
3. Use the filter dropdown to see only specific statuses (like everyone who's in a meeting)
4. Sort team members by how many active tasks they have
5. Want to assign a task? Click **"Create New Task"** or hit **"Assign Task"** on someone's card
6. Fill in the task title, due date, and pick who should do it
7. Check out the charts to see team status distribution and trends

### As a Team Member

1. Switch to **Member View** using the header toggle
2. Update your status anytime – just click the button that matches what you're doing
3. Your assigned tasks show up in a list below
4. As you make progress, use the **+10%** and **-10%** buttons to update each task
5. When you hit 100%, the task automatically marks itself complete
6. Keep an eye on your personal stats and progress charts

## What's Next?

We've got some ideas for future improvements:

- **Persistent storage** – Save state with Redux Persist or localStorage so nothing gets lost on refresh
- **Better notifications** – Get alerts when new tasks are assigned
- **More chart types** – Additional visualizations for productivity insights
- **Team analytics** – Deeper insights into team performance over time
- **Customizable themes** – Let users personalize the look and feel

## Contributing

Found a bug? Have an idea? Feel free to open an issue or submit a pull request. We'd love to make this better together.

## License

This project is open source and available for personal and educational use.

---

Made with ☕ and React
- Dark mode toggle
- Integration with external APIs for team member data

