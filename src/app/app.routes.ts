import { Routes } from '@angular/router';
import { CreateTaskComponent } from './create-task/create-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { TaskListComponent } from './task-list/task-list.component';

export const routes: Routes = [
    { 
        path: '', 
        redirectTo: '/tasks', 
        pathMatch: 'full' 
    },
    { 
        path: 'tasks', 
        component: TaskListComponent 
    },
    { 
        path: 'task/:id', 
        component: TaskDetailsComponent 
    },
    { 
        path: 'create-task', 
        component: CreateTaskComponent 
    },
    { 
        path: 'edit-task/:id', 
        component: EditTaskComponent 
    },
];
