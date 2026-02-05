import process from 'node:process';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from "mongoose";
import cors from 'cors';
import { asyncHandler, notFound, errorHandler } from './middleware/error.js';
dotenv.config({ quiet: true });
const { API_PORT = 3000, MONGODB_URI } = process.env;

const app = express(); // Перенесено вверх

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));





// check if MongoDB address is available via .env
if (!MONGODB_URI) {
    console.error('❌ Check MONGODB_URI in .env');
    process.exit(1);
}



mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log("Ⓜ️  MongoDB connection established");
        // Запускаем единый HTTP-сервер, который держит и Express, и Socket.io
        const server = app.listen(API_PORT, () => {
            console.log(`🐝 Server running on port ${API_PORT}`);
            console.log(`💖 Health check with http://localhost:${API_PORT}/api/health`);
        });
    })
    .catch((err) => {
        console.error("⛔ MongoDB connection error", err.message);
        process.exit(1);
    });
// MODELS -------------------------------------------------



const TasksSchema = new mongoose.Schema({
    values: {
        order: { type: Number },
        state: { type: Number, default: 0 },
        message: { type: String, default: 'new task' },
        deadline: { type: Date },
        lastUpdated: { type: Date, default: Date.now }
    }
}, {
    timestamps: true // Это автоматически добавит поля createdAt и updatedAt [cite: 140]
});
const TaskModel = mongoose.model("tasks", TasksSchema);


const formatTask = (task) => {
    if (!task) return null;

    // Если это объект Mongoose, переводим в обычный JS-объект
    const obj = task.toObject ? task.toObject() : task;

    return {
        id: obj._id,
        ...obj.values,
        createdAt: obj.createdAt,
        updatedAt: obj.updatedAt
    };
};
// ROUTES -------------------------------------------------



app.get('/api/health', asyncHandler(async (req, res) => {
    res.status(200).json({ status: 'ok' });
}));

// TASK List
app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await TaskModel.find();

        const formattedTasks = tasks.map(formatTask);
        res.json(formattedTasks);
    } catch (error) {
        res.status(500).json({ message: "cannot read todos list", error });
    }
});

// CREATE TASK
app.post('/api/tasks', async (req, res) => {
    try {
        const newTask = new TaskModel({
            values: req.body
        });
        const savedTask = await newTask.save();
        res.status(201).json(formatTask(savedTask));
    } catch (error) {
        res.status(500).json({ message: "Error creating todo", error });
    }
});

// DELETE todo
app.delete('/api/tasks', async (req, res) => {
    try {
        const taskId = req.body.taskId;
        if (!taskId) {
            return res.status(400).json({ message: "todoId not specified" });
        }
        const deletedTask = await TaskModel.findByIdAndDelete(taskId);
        if (!deletedTask) {
            return res.status(404).json({ message: "Комната уже удалена или не существует" });
        }
        res.status(200).json(formatTask(deletedTask));
    } catch (error) {
        res.status(500).json({ message: "Ошибка на сервере при удалении", error });
    }
});
app.patch('/api/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body; // Например: { message: "новый текст" }

        // Обновляем поля внутри объекта values
        // Используем синтаксис 'values.field', чтобы не затереть весь объект values
        const updateData = {};
        for (let key in updates) {
            updateData[`values.${key}`] = updates[key];
        }

        // Добавляем дату последнего обновления
        updateData['values.lastUpdated'] = Date.now();

        const updatedTask = await TaskModel.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true } // Возвращает документ ПОСЛЕ обновления
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Задача не найдена" });
        }

        res.json(formatTask(updatedTask));
    } catch (error) {
        res.status(500).json({ message: "Ошибка обновления", error });
    }
});

app.use(notFound);
app.use(errorHandler);



