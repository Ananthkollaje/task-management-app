import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Task } from '../model/task.model';
import { TaskService } from '../services/task.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgClass,
    NgFor,
    NgIf,
    MatTableModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'dueDate', 'completed', 'actions'];

  tasks: Task[] = [];

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
  }

  markCompleted(task: Task): void {
    task.completed = !task.completed;
    this.taskService.updateTask(task);
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId);
    this.tasks = this.tasks.filter(task => task.id !== taskId);
  }

  viewDetails(taskId: number): void {
    this.router.navigate(['/task', taskId]); // Corrected line
  }

  navigateToAddTask(): void {
    this.router.navigate(['/create-task']); // Added method for navigation
  }

}
