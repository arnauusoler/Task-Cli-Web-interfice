# Task-Cli-Web-interfice
This project is a simple task manager with a web-based interface. It allows users to add, update, delete, and filter tasks through an easy-to-use browser interface. Tasks are stored locally in the browser's localStorage, ensuring persistence across sessions without any backend server.

Description
The Task Manager Web CLI lets you manage tasks with the following features:

Create tasks with a unique ID, description, status, and timestamps.

Update tasks’ descriptions and statuses.

Delete tasks.

Filter tasks by status: all, todo, in-progress, or done.

Persist tasks data locally using localStorage.

User-friendly interface with buttons for all commands and status updates.

Each task object contains these properties:

id: Unique identifier for the task.

description: Brief description of the task.

status: Current task status (todo, in-progress, done).

createdAt: Timestamp when the task was created.

updatedAt: Timestamp of the last update.

Installation & Usage
Prerequisites
Any modern web browser (Chrome, Firefox, Edge, Safari).

Optional: a simple local HTTP server like Live Server extension for VS Code or Python’s http.server module to run the project smoothly.

Setup
Download or clone the repository.

Open the index.html file directly in your browser or serve the project folder with a local HTTP server.

Use the form to add new tasks.

Use filter buttons to view tasks by status.

Update or delete tasks using the provided buttons next to each task.

Your tasks will be saved automatically in the browser’s local storage and reloaded on page refresh.

Features & Commands
Add Task: Enter a task name and click “Add Task” to create a new task with status “todo.”

Filter Tasks: Use the filter buttons (All, To Do, In Progress, Done) to view specific tasks.

Update Task: Click “Update” next to a task to edit its description.

Change Status: Mark tasks as “In Progress” or “Done” using the buttons.

Delete Task: Remove tasks using the “Delete” button.

Persistence: All tasks and their states are saved locally in your browser and persist between sessions.

Example Usage
Open the app in your browser, add tasks like “Finish homework,” change their status, update descriptions, and filter tasks to keep your work organized effortlessly.
