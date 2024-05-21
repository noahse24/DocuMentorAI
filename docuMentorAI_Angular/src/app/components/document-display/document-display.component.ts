import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../../services/document.service';
import { AppDocument } from '../../model/AppDocument';

@Component({
  selector: 'app-document-display',
  templateUrl: './document-display.component.html',
  styleUrls: ['./document-display.component.css']
})
export class DocumentDisplayComponent implements OnInit {
  documents: AppDocument[] = [];

  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
    this.loadDocuments();
  }

  loadDocuments(): void {
    this.documentService.getDocuments().subscribe({
      next: (documents) => {
        this.documents = documents.map(doc => ({ ...doc, showContent: false, showSummary: false }));
      },
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
    document.showSummary = false;
  }

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
