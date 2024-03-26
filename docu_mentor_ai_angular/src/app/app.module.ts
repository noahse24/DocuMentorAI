import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HttpClientModule } from '@angular/common/http'; // Ensure HttpClientModule is imported
import { CommonModule } from '@angular/common';


import { AppComponent } from './app.component';
import { LlmCommunicationService } from './services/llm-communication.service';

@NgModule({
//declarations: [
//    AppComponent
//],


imports: [
    BrowserModule,
    FormsModule, // Add FormsModule here
    HttpClientModule, // Add HttpClientModule here
    CommonModule
],
providers: [LlmCommunicationService]
//bootstrap: [AppComponent]
})
export class AppModule { }
