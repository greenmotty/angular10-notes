import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardServiceGuard} from './features/authentication/guards/auth-guard-service.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./features/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'notes',
    loadChildren: () => import('./features/notes/notes.module').then(m => m.NotesModule),
    canActivate: [AuthGuardServiceGuard]
  },
  {path: '', redirectTo: '/notes', pathMatch: 'full'}, // redirect to `notes`
  {path: '**', redirectTo: '/notes', pathMatch: 'full'},  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
