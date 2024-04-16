import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LlmCommunicationService } from './services/llm-communication.service';
import { DocumentRetrievalComponent } from './document-retrieval/document-retrieval.component';
import { SummaryDisplayComponent } from './summary-display/summary-display.component';
import { DocumentDisplayComponent } from './document-display/document-display.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Response } from './response';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, HttpClientModule, DocumentRetrievalComponent, DocumentDisplayComponent, SummaryDisplayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [LlmCommunicationService]
})
export class AppComponent {
  prompt: string = '';
  response: any = null;
  selectedDocumentSummary: string = '';

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
}


