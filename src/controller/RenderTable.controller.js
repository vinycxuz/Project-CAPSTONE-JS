import HabitTask from "../models/Habit.models.js";
import API from "./Api.controller.js";

export default class RenderTable {

  static async renderAll() {
    const table = document.querySelector('table');

    // remove todas as linhas da table, menos o header:
    while (table.children.length > 1) {
      table.removeChild(table.lastChild);
    }

    const allTasks = await API.getAllHabits();
    const habitTaskArray = allTasks.map(task => new HabitTask(task));
    habitTaskArray.forEach(habitTask => {
      const row = habitTask.renderTableRow();
      table.append(row);
    })
  }

  static async renderConcluded() {
    const table = document.querySelector('table');

    // remove todas as linhas da table, menos o header:
    while (table.children.length > 1) {
      table.removeChild(table.lastChild);
    }

    const allTasks = await API.getAllHabits();
    const completedTasks = allTasks.filter(task => task.habit_status);
    const habitTaskArray = completedTasks.map(task => new HabitTask(task));
    habitTaskArray.forEach(habitTask => {
      const row = habitTask.renderTableRow();
      table.append(row);
    })
  }
}