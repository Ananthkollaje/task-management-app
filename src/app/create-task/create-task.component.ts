import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgClass,
    NgFor,
    NgIf
  ],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss'
})
export class CreateTaskComponent {

  constructor(private taskService: TaskService, private router: Router) { }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const newTask = form.value;
      newTask.id = new Date().getTime(); // Simple ID generation
      newTask.completed = false; // Default to not completed
      this.taskService.addTask(newTask);
      this.router.navigate(['/tasks']);
    }
  }
}
