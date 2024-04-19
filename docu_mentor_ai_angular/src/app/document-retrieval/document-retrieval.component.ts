import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LlmCommunicationService } from '../services/llm-communication.service';

@Component({
  selector: 'app-document-retrieval',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './document-retrieval.component.html',
  styleUrl: './document-retrieval.component.css'
})

export class DocumentRetrievalComponent {
  prompt: string = '';

  constructor(private llmService: LlmCommunicationService) {}

  onSubmit() {
    this.llmService.sendPrompt(this.prompt).subscribe({
      next: (response) => {
        // Handle the successful response here
        console.log("Successful prompt");
      },
      error: (error) => {
        // Handle any error here
        console.log("Unsuccessful prompt");
      }
    });  
  }
}
