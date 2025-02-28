import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotebookComponent } from './components/notebook/notebook.component';
import { NotebookDetailsComponent } from './components/notebook-details/notebook-details.component';
import { NoteComponent } from './components/note/note.component';
import { AuthComponent } from './auth/auth.component';


export const routes: Routes = [
{path: '', redirectTo: 'authentification', pathMatch: 'full'},
{path: 'dashboard', component: DashboardComponent},
{path: 'notebook', component: NotebookComponent},
{path: 'notebooks/:id', component: NotebookDetailsComponent},
{path: 'note/:id', component: NoteComponent},
{path: 'authentification', component: AuthComponent},
{path: '**', redirectTo: 'dashboard'}
];
