import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { Task } from '../model/task.model';
import { TaskService } from '../services/task.service';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgClass,
    NgFor,
    NgIf
  ],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss'
})
export class EditTaskComponent implements OnInit {

  task: Task | undefined;

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const taskId = +this.route.snapshot.paramMap.get('id')!;
    this.task = this.taskService.getTaskById(taskId);
  }

  onSubmit(form: NgForm): void {
    if (form.valid && this.task) {
      const updatedTask = { ...this.task, ...form.value };
      this.taskService.updateTask(updatedTask);
      this.router.navigate(['/tasks']);
    }
  }

}
