import { Component } from '@angular/core';
import { LlmCommunicationService } from '../../services/llm-communication.service';

@Component({
  selector: 'app-document-retrieval',
  templateUrl: './document-retrieval.component.html',
  styleUrl: './document-retrieval.component.css'
})
export class DocumentRetrievalComponent {

  prompt: string = '';
  documents: any = null; // Adjust based on actual data structure
  output: string = '';

  constructor(private llmCommunicationService: LlmCommunicationService) {}

  /*
  retrieveDocuments(): void {
    this.llmCommunicationService.generateDocument(this.userPrompt).subscribe({
      next: (response) => {
        console.log('Response:', response);
        this.documents = response; // Adjust based on response structure
      },
      error: (error) => {
        console.error('Error retrieving documents:', error);
        alert('Failed to retrieve documents: ' + error.message);
      }
    });
  }
  */

  retrieveDocuments(): void {
    this.llmCommunicationService.generateDocument(this.prompt).subscribe({
        next: (data) => this.output = data,
        error: (err) => console.error('Error retrieving documents:', err)
    });
}

}
