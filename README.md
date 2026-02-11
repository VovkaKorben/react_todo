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
























# Kanban Task Manager

Это Fullstack-приложение для управления задачами в стиле Kanban-доски с поддержкой Drag & Drop.

## 1. Используемые технологии

### Frontend

* **React 19**: Использование хуков `useState` и `useEffect` для управления состоянием и запросами.
* **Vite**: Сборщик проекта для быстрой разработки.
* **CSS3**: Модульная стилизация компонентов и использование CSS-переменных для тем оформления.
* **Native Drag & Drop API**: Реализация перемещения задач между колонками.

### Backend

* **Node.js & Express**: Обработка API-запросов.
* **MongoDB & Mongoose**: Хранение данных задач и схемная валидация.
* **Dotenv**: Управление конфигурацией через переменные окружения.
* **CORS**: Настройка кросс-доменных запросов для взаимодействия фронтенда и бэкенда.

---

## 2. Порядок установки

### Предварительные требования

* Установленный Node.js.
* Доступ к базе данных MongoDB (строка подключения указывается в `.env`).

### Шаг 1: Настройка бэкенда

1. Перейдите в директорию `back`:
```bash
cd back

```


2. Установите зависимости:
```bash
npm install

```


3. Проверьте файл `.env` и убедитесь, что `MONGODB_URI` содержит актуальную ссылку на вашу базу данных.
4. Запустите сервер в режиме разработки:
```bash
npm run dev

```


*Сервер запустится на порту 3000 по умолчанию*.

### Шаг 2: Настройка фронтенда

1. Перейдите в директорию `front`:
```bash
cd front

```


2. Установите зависимости:
```bash
npm install

```


3. Запустите приложение:
```bash
npm run dev

```


*Приложение будет доступно по адресу http://localhost:5173*.

---

## 3. Инструкция пользователя

### Управление задачами

* **Создание**: Нажмите кнопку **«+ ADD»** в первой колонке («To do»), чтобы создать новую карточку.
* **Редактирование текста**: Кликните по тексту внутри карточки, чтобы войти в режим редактирования. Нажмите **Enter** для сохранения.
* **Установка дедлайна**: Кликните по дате дедлайна в нижней части карточки, чтобы изменить время завершения задачи.
* **Удаление**: Нажмите на крестик в верхнем правом углу карточки, чтобы удалить задачу.

### Перемещение (Kanban)

* Вы можете перетаскивать задачи между колонками («To do», «In progress», «In review», «Done») с помощью мыши.
* При перетаскивании используйте красные индикаторы (сепараторы) для выбора точного места вставки задачи в колонке.
* Состояние задачи (её статус) и порядок в списке сохраняются в базе данных автоматически после завершения переноса.