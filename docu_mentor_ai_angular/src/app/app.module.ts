import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule
import { HttpClientModule } from '@angular/common/http'; // Ensure HttpClientModule is imported
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app.routes';
import { RouterOutlet } from '@angular/router';

import { AppComponent } from './app.component';
import { LlmCommunicationService } from './services/llm-communication.service';
import { DocumentRetrievalComponent } from './document-retrieval/document-retrieval.component';
import { DocumentDisplayComponent } from './document-display/document-display.component';

@NgModule({
declarations: [
    //AppComponent
    //DocumentRetrievalComponent
    //DocumentDisplayComponent
],


imports: [
    BrowserModule,
    FormsModule, // Add FormsModule here
    HttpClientModule, // Add HttpClientModule here
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterOutlet
],
providers: [LlmCommunicationService]
//bootstrap: [AppComponent]
})
export class AppModule { }
