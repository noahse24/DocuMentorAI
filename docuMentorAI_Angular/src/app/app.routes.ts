import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { TestComponent } from './components/test-component/test-component.component';
import { DocumentDisplayComponent } from './components/document-display/document-display.component';
import { DocumentRetrievalComponent } from './components/document-retrieval/document-retrieval.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuardService } from './services/auth-guard.service';

export const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'test', component: TestComponent },
  { path: 'documents', component: DocumentDisplayComponent },
  { path: 'documentRetrieval', component: DocumentRetrievalComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }

];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
