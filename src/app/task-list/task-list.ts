import { Component, inject } from '@angular/core';
import { TaskService } from '../services/task.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, RouterLink, AsyncPipe],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList {
  private taskService = inject(TaskService);
  tasks$ = this.taskService.tasks$;

  toggleTask(id: number) {
    this.taskService.toggleComplete(id);
  }

    deleteTask(id: number) {
    this.taskService.deleteTask(id);
  }
}
