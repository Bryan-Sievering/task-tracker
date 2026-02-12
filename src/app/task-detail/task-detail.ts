import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TaskService } from '../services/task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.css',
})
export class TaskDetail {
  private taskService = inject(TaskService);
  private route = inject(ActivatedRoute);

  taskId = Number(this.route.snapshot.params['id']);
  task = this.taskService.getTaskSignal(this.taskId);

  toggleTaskComplete() {
    this.taskService.toggleComplete(this.taskId);
  }
}
