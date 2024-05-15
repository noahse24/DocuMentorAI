import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { TestComponent } from './components/test-component/test-component.component';
import { DocumentDisplayComponent } from './components/document-display/document-display.component';
import { DocumentRetrievalComponent } from './components/document-retrieval/document-retrieval.component';

export const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'test', component: TestComponent },
  { path: 'documents', component: DocumentDisplayComponent },
  { path: 'documentRetrieval', component: DocumentRetrievalComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }

];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
