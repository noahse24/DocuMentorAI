// app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { TestComponent } from './components/test-component/test-component.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DocumentDisplayComponent } from './components/document-display/document-display.component';
import { DocumentRetrievalComponent } from './components/document-retrieval/document-retrieval.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './material/material.module';

@NgModule({
    declarations: [
        AppComponent,
        LoginFormComponent,
        TestComponent,
        DocumentDisplayComponent,
        DocumentRetrievalComponent
    ],

imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MaterialModule
],
providers: [
    provideAnimationsAsync()
  ],
bootstrap: [AppComponent]
})

export class AppModule { }
