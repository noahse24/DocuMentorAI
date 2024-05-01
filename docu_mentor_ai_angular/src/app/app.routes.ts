import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProductDocumentsComponent } from './product-documents/product-documents.component';
import { LegalDocumentsComponent } from './legal-documents/legal-documents.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    //{ path: 'product-documents', component: ProductDocumentsComponent },
    { path: 'legal-documents', component: LegalDocumentsComponent },
   //{ path: '', redirectTo: '/product-documents', pathMatch: 'full' },
    { path: 'login', component: LoginFormComponent },
    { path: 'register', component: RegistrationFormComponent },
    //{ path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
