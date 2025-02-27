import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotebookComponent } from './notebook/notebook.component';
import { NotebookDetailsComponent } from './notebook-details/notebook-details.component';
import { NoteComponent } from './note/note.component';


export const routes: Routes = [
{path: '', redirectTo: 'dashboard', pathMatch: 'full'},
{path: 'dashboard', component: DashboardComponent},
{path: 'notebook', component: NotebookComponent},
{path: 'notebooks/:id', component: NotebookDetailsComponent},
{path: 'note/:id', component: NoteComponent},
{path: '**', redirectTo: 'dashboard'}
];
