import { Component } from '@angular/core';
import { LlmCommunicationService } from '../../services/llm-communication.service';
import { DocumentService } from '../../services/document.service';
import { Model } from 'replicate';
import { AppDocument } from '../../model/AppDocument';

@Component({
  selector: 'app-document-retrieval',
  templateUrl: './document-retrieval.component.html',
  styleUrl: './document-retrieval.component.css'
})
export class DocumentRetrievalComponent {

  prompt: string = '';
  documents: AppDocument[] = []; // Adjust based on actual data structure
  response: string = '';

  constructor(private documentService: DocumentService) {}

  onSubmit(): void {
    this.documentService.searchDocuments(this.prompt).subscribe({
      next: (documents) => this.documents = documents,
      error: (error) => console.error('Error retrieving documents:', error)
    });
  }

  loadDocumentSummary(document: any): void {
    if (!document.summary) {
      this.documentService.getDocumentSummary(document.id).subscribe({
        next: (summary) => {
          document.summary = summary.text;  // Adjust depending on API response
          document.showSummary = true;  // Show summary upon fetching it
        },
        error: (err) => {
          console.error(`Failed to load summary for document ${document.id}`, err);
        }
      });
    } else {
      document.showSummary = !document.showSummary;  // Toggle summary visibility
    }
  }

  toggleDocument(document: AppDocument): void {
    document.showContent = !document.showContent;
    document.showSummary = false; // Ensure only one can be shown at a time
  }

  /*
  toggleSummary(document: AppDocument): void {
    document.showSummary = !document.showSummary;
    document.showContent = false; // Ensure only one can be shown at a time
  }
*/
  toggleSummary(document: AppDocument): void {
    if (!document.summary) { // Check if summary is already fetched
      this.documentService.summarizeDocument("Summarize this text: " + document.content1).subscribe({
        next: (response) => {
          document.summary = response.summary;
          document.showSummary = true;
        },
        error: (error) => console.error('Error generating summary:', error)
      });
    } else {
      document.showSummary = !document.showSummary; // Toggle visibility
    }
  }
}

  /*
  onSubmit(): void {
    this.llmCommunicationService.generateDocument(this.prompt).subscribe({
      next: (response) => {
        console.log('Received response:', response);
        this.response = response; // adjust based on API response structure
      },
      error: (err) => {
        console.error('Error retrieving documents:', err);
        //this.errorMessage = 'Failed to generate document: ' + err.message;
      }
    });
  }

  
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
  

  retrieveDocuments(): void {
    this.llmCommunicationService.generateDocument(this.prompt).subscribe({
        next: (data) => this.output = data,
        error: (err) => console.error('Error retrieving documents:', err)
    });
}
*/
