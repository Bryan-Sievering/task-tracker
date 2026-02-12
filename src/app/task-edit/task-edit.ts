import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-edit',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './task-edit.html',
  styleUrl: './task-edit.css',
})
export class TaskEdit {
  private fb = inject(FormBuilder);
  private taskService = inject(TaskService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  taskId = Number(this.route.snapshot.params['id']);
  taskSignal = this.taskService.getTaskSignal(this.taskId);

  taskForm = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    priority: ['medium'],
    dueDate: ['', Validators.required]
  });

  constructor(){
    const task = this.taskSignal();
    if(task){
      this.taskForm.setValue({
        title: task.title,
        description: task.description,
        priority: task.priority,
        dueDate: task.dueDate.split('T')[0]
      });
    }
  }

  submit(){
    if(this.taskForm.valid){
      const formValue = this.taskForm.value;
      this.taskService.updateTask(this.taskId, {
        title: formValue.title!,
        description: formValue.description!,
        priority: formValue.priority! as 'low' | 'medium' | 'high',
        dueDate: formValue.dueDate!
      });
      this.router.navigate(['/tasks', this.taskId])
    }
  }
}
