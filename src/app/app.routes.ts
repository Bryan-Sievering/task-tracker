import { Routes } from '@angular/router';
import { TaskList } from './task-list/task-list';
import { TaskDetail } from './task-detail/task-detail';
import { TaskForm } from './task-form/task-form';
import { TaskEdit } from './task-edit/task-edit';

export const routes: Routes = [
    {path: '', redirectTo: 'tasks', pathMatch: 'full'},
    {path: 'tasks', component: TaskList},
    {path: 'tasks/:id', component: TaskDetail},
    {path: 'tasks/:id/edit', component: TaskEdit},
    {path: 'add-task', component: TaskForm},
    {path: '**', redirectTo: 'tasks'}
];
