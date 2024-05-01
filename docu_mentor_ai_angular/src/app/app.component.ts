import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LlmCommunicationService } from './services/llm-communication.service';
import { DocumentRetrievalComponent } from './document-retrieval/document-retrieval.component';
import { SummaryDisplayComponent } from './summary-display/summary-display.component';
import { DocumentDisplayComponent } from './document-display/document-display.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Response } from './response';
import { Document } from '../../model/document';
import { Summary } from '../../model/summary';
import { MaterialModule } from './material.module';
//import { AppRoutingModule } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, ReactiveFormsModule, HttpClientModule, DocumentRetrievalComponent, DocumentDisplayComponent, SummaryDisplayComponent, MaterialModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [LlmCommunicationService]
})
export class AppComponent {
  prompt: string = '';
  response: any = null;
  selectedDocumentSummary?: Summary;;
  documents: Document[]= [];

  constructor(private llmService: LlmCommunicationService) {}

  sendPrompt(): void {
    console.log('Sending prompt:', this.prompt);
    this.llmService.sendPrompt(this.prompt).subscribe({
      next: (response: Response) => {
        this.response = response; // Adjust based on the structure of your LLM response
        console.log('LLM response:', response.content);
      },
      error: (err) => console.error('Error:', err)
    });
  }
  ngOnInit() {
    // Temporary mock data for testing
    this.documents = [
      { title: 'Document 1', summary: 'Summary of document 1' },
      { title: 'Document 2', summary: 'Summary of document 2' },
      // ... more documents
    ];
  
    this.selectedDocumentSummary = { text: 'Detailed summary of a selected document' };
  }

}


