const router = require('express').Router();
const verify = require('./verifyToken');
const Task = require('../model/Task');

// Get All Task by user ID
router.get('/task',verify, async (req, res) => {
    const tasks = await Task.find({ user_id: req.query.user_id });
    if (!tasks) return res.status(400).send('Can not fetch tasks');
    res.status(200).send(tasks);
})

// Create new Task
router.post('/task', verify, async (req, res) => {

    const task = new Task({
        user_id: req.body.user_id,
        title: req.body.title,
        completed: false
    });

    try {
        const savedTask = await task.save();
        res.send({ task_id: savedTask._id });
    } catch (err) {
        res.status(400).send(err);
    }
})

// Update task status
router.put('/task', verify, async (req, res) => {
    
    Task.findByIdAndUpdate(
        { _id: req.body.task_id },
        { $set: { completed: req.body.completed } },
        { new: false },
        (err, result) => {
            if (err) {
                res.status(400).send(err)
            }
            res.status(200).send(result);
        })
})

// Delete task by ID
router.delete('/task', verify, async (req, res) => {
    Task.findByIdAndDelete({ _id: req.query.taskId }, (err, result) => {
        if (err) {
            res.status(400).send(err)
        }
        res.status(200).send(result);
    })
})

module.exports = router;