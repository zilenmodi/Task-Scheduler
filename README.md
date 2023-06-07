# Task Scheduling Website

This is a task scheduling web application designed to help admins manage projects, employees, and tasks efficiently. It provides a user-friendly interface with various features such as project creation, employee management, task assignment, filtering and sorting projects, creating boards for projects, drag-and-drop functionality, and adding details to individual tasks.

## Features

1. **Project Management:**
   - Create new projects with a name, description, and other relevant details.
   - Assign employees to projects to track their involvement.
   - Filter and sort projects based on various parameters such as name, date, status, etc.
   - Update project details as needed.
   - Delete projects when they are no longer required.
2. **Employee Management:**
   - Add new employees to the system with their names, roles, and contact information.
   - Assign employees to specific projects.
   - Update employee information when necessary.
   - Remove employees from the system.
3. **Task Assignment and Tracking:**
   - Create individual boards within projects.
   - Utilise a Kanban board to manage tasks and their statuses (e.g., to-do, in progress, completed).
   - Assign projects to employees for accountability.
   - Add task details, such as name, description, due date, priority, etc.
   - Drag and drop tasks between different board columns to update their status.
4. **Data Manipulation:**
   - Update all data on the website, including projects, employees, and tasks.
   - Delete projects, employees, and tasks as needed.

## Technologies Used

The task scheduling web app is built using various technologies, including:

- Front-end:
  - React (a JavaScript library for building user interfaces)
  - Ant Design for UI
  - React Beautiful DnD
  - Local Storage

## Installation and Setup

To set up the task scheduling web app locally, follow these steps:

1. Project Link:

   ```jsx
   https://modernize-task-scheduler.netlify.app/admin/dashboard
   ```

2. Ensure you have Node.js and MongoDB installed on your machine.
3. Clone the repository:

   ```
   git clone https://github.com/zilenmodi/Task-Scheduler.git
   ```

4. Navigate to the project directory:

   ```
   cd task-scheduling-web-app
   ```

5. Install dependencies:

   ```
   npm install
   ```

6. Start the application:

   ```
   npm run dev
   ```

7. Access the web app in your browser at `http://localhost:5173`.

## Topic Cover

1. React Hooks like useState, useEffect, useContext.
2. Functional Component
3. Props drilling
4. Container vs. Presentation Component
5. App Layout
6. Configure Routing
7. Redux Toolkit
8. Redux Slice for object
9. Deploy on Netlify
