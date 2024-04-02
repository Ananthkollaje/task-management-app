import { Injectable } from '@angular/core';
import { Task } from '../model/task.model'

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  getTasks(): Task[] {
    return JSON.parse(localStorage.getItem('tasks') || '[]');
  }

  getTaskById(id: number): Task | undefined {
    const tasks = this.getTasks();
    return tasks.find(task => task.id === id);
  }

  addTask(task: Task): void {
    const tasks = this.getTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  updateTask(updatedTask: Task): void {
    let tasks = this.getTasks();
    tasks = tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  deleteTask(id: number): void {
    const tasks = this.getTasks().filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

}
