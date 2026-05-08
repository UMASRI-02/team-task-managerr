const express = require("express");

const router = express.Router();

const Task = require("../models/Task");


// GET TASKS
router.get("/", async (req, res) => {

  const tasks = await Task.find();

  res.json(tasks);
});


// CREATE TASK
router.post("/create", async (req, res) => {

  const task = await Task.create({
    title: req.body.title,
    description: req.body.description,
    assignedTo: req.body.assignedTo,
    project: req.body.project,
    team: req.body.team,
    dueDate: req.body.dueDate,
    status: "pending"
  });

  res.json(task);
});


// COMPLETE TASK
router.put("/:id", async (req, res) => {

  const updatedTask =
    await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

  res.json(updatedTask);
});


// DELETE TASK
router.delete("/:id", async (req, res) => {

  await Task.findByIdAndDelete(
    req.params.id
  );

  res.json({
    message: "Deleted"
  });
});

module.exports = router;