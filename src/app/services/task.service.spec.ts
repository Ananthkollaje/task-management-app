import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';
import { Task } from '../model/task.model';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTasks', () => {
    it('should return empty array when there are no tasks in localStorage', () => {
      const tasks = service.getTasks();
      expect(tasks).toEqual([]);
    });

    it('should return tasks from localStorage', () => {
      const tasksData: Task[] = [
        { id: 1, title: 'Task 1', description: 'Description 1', dueDate: '2024-04-02', completed: false },
        { id: 2, title: 'Task 2', description: 'Description 2', dueDate: '2024-04-03', completed: true }
      ];
      localStorage.setItem('tasks', JSON.stringify(tasksData));

      const tasks = service.getTasks();
      expect(tasks).toEqual(tasksData);
    });
  });

  describe('getTaskById', () => {
    it('should return undefined when task with given id is not found', () => {
      const task = service.getTaskById(1);
      expect(task).toBeUndefined();
    });

    it('should return task with given id', () => {
      const tasksData: Task[] = [
        { id: 1, title: 'Task 1', description: 'Description 1', dueDate: '2024-04-02', completed: false },
        { id: 2, title: 'Task 2', description: 'Description 2', dueDate: '2024-04-03', completed: true }
      ];
      localStorage.setItem('tasks', JSON.stringify(tasksData));

      const task = service.getTaskById(2);
      expect(task).toEqual(tasksData[1]);
    });
  });

  describe('addTask', () => {
    it('should add task to localStorage', () => {
      const taskToAdd: Task = { id: 1, title: 'New Task', description: 'New Description', dueDate: '2024-04-04', completed: false };

      service.addTask(taskToAdd);

      const tasksFromStorage: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');
      expect(tasksFromStorage).toContain(taskToAdd);
    });
  });

  describe('updateTask', () => {
    it('should update task in localStorage', () => {
      const initialTasks: Task[] = [
        { id: 1, title: 'Task 1', description: 'Description 1', dueDate: '2024-04-02', completed: false },
        { id: 2, title: 'Task 2', description: 'Description 2', dueDate: '2024-04-03', completed: true }
      ];
      localStorage.setItem('tasks', JSON.stringify(initialTasks));

      const updatedTask: Task = { id: 2, title: 'Updated Task', description: 'Updated Description', dueDate: '2024-04-05', completed: false };

      service.updateTask(updatedTask);

      const tasksFromStorage: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');
      expect(tasksFromStorage.find(task => task.id === updatedTask.id)).toEqual(updatedTask);
    });
  });

  describe('deleteTask', () => {
    it('should delete task from localStorage', () => {
      const initialTasks: Task[] = [
        { id: 1, title: 'Task 1', description: 'Description 1', dueDate: '2024-04-02', completed: false },
        { id: 2, title: 'Task 2', description: 'Description 2', dueDate: '2024-04-03', completed: true }
      ];
      localStorage.setItem('tasks', JSON.stringify(initialTasks));

      service.deleteTask(1);

      const tasksFromStorage: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');
      expect(tasksFromStorage).not.toContain(initialTasks[0]);
    });
  });

});
