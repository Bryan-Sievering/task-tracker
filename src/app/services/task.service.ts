import { Injectable, WritableSignal, computed, signal } from '@angular/core';
import { Task } from '../models/task.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  
  private taskStore: WritableSignal<Task[]> = signal([
    {id: 1,
    title: 'Sample Task',
    description: 'Demo',
    completed: false,
    priority: 'medium',
    dueDate: new Date().toISOString()}
  ]);

  private taskSubject = new BehaviorSubject<Task[]>(this.taskStore());

  get tasks$(): Observable<Task[]> {
    return this.taskSubject.asObservable();
  }

  getTasksSignal(){
    return this.taskStore.asReadonly();
  }

  getTaskSignal(id: number){
    return computed(() => this.taskStore().find(task => task.id === id));
  }

  addTask(task: Task){
    this.taskStore.update(tasks => [...tasks, task]);
    this.taskSubject.next(this.taskStore());
  }

  updateTask(id: number, updated: Partial<Task>){
    this.taskStore.update(tasks => tasks.map(task => task.id === id ? {
      ...task, ...updated} : task));
    this.taskSubject.next(this.taskStore());
  }

  deleteTask(id: number){
    this.taskStore.update(tasks => tasks.filter(task => task.id !== id));
    this.taskSubject.next(this.taskStore());
  }

  toggleComplete(id:number){
    this.taskStore.update(tasks => tasks.map(task => task.id === id ? {
      ...task, completed: !task.completed} : task));
      this.taskSubject.next(this.taskStore());
  }
}
