# Kanban Task Manager

This is a full-stack application for managing tasks in the style of a Kanban board with drag-and-drop support.

## 1. Technologies used

### Frontend

* **React 19**: Use of `useState` and `useEffect` hooks for state and request management.
* **Vite**: Project builder for rapid development.
* **CSS3**: Modular component styling and use of CSS variables for themes.
* **Native Drag & Drop API**: Implementation of task movement between columns.

### Backend

* **Node.js & Express**: Processing API requests.
* **MongoDB & Mongoose**: Task data storage and schema validation.
* **Dotenv**: Configuration management via environment variables.
* **CORS**: Configuration of cross-domain requests for frontend and backend interaction.

---

## 2. Installation Procedure

### Prerequisites

* Node.js installed.
* Access to a MongoDB database (the connection string is specified in `.env`).

### Step 1: Backend configuration

1. Go to the `back` directory:
```bash
cd back

```


2. Install dependencies:
```bash
npm install

```


3. Check the `.env` file and make sure that `MONGODB_URI` contains the current link to your database.
4. Start the server in development mode:
```bash
npm run dev

```


*The server will start on port 3000 by default*.

### Step 2: Set up the frontend

1. Go to the `front` directory:
```bash
cd front

```


2. Install dependencies:
```bash
npm install

```


3. Run the application:
```bash
npm run dev

```


3. Check the `.env` file and make sure that `MONGODB_URI` contains the current link to your database.
4. Start the server in development mode:
```bash
npm run dev

```


*The server will start on port 3000 by default*.

### Step 2: Setting up the frontend

1. Go to the `front` directory:
```bash
cd front

```


2. Install dependencies:
```bash
npm install

```


3. Run the application:
```bash
npm run dev

```


*The application will be available at http://localhost:5173*.

---

## 3. User instructions

### Task management

* **Creating**: Click the **“+ ADD”** button in the first column (“To do”) to create a new card.
* **Editing text**: Click on the text inside the card to enter edit mode. Press **Enter** to save.
* **Setting a deadline**: Click on the deadline date at the bottom of the card to change the task completion time.
* **Deleting**: Click on the cross in the upper right corner of the card to delete the task.

### Moving (Kanban)

* You can drag and drop tasks between columns (“To do,” “In progress,” “In review,” “Done”) with your mouse.
* When dragging, use the red indicators (separators) to select the exact location where you want to insert the task in the column.
* The task status and order in the list are automatically saved in the database after the transfer is complete.
