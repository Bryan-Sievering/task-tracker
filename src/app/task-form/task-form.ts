import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm {
  private fb = inject(FormBuilder);
  private taskService = inject(TaskService);
  private router = inject(Router);

  taskForm = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    priority: ['medium'],
    dueDate: ['', Validators.required],
  });

  submit(){
    if(this.taskForm.valid){
      const formValue = this.taskForm.value;
      this.taskService.addTask({
        id: Date.now(),
        title: formValue.title!,
        description: formValue.description!,
        completed: false,
        priority: formValue.priority! as 'low' | 'medium' | 'high',
        dueDate: formValue.dueDate!
      });
      this.router.navigate(['/tasks']);
    }
  }
}
