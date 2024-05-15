import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'app-document-display',
  templateUrl: './document-display.component.html',
  styleUrls: ['./document-display.component.css']
})
export class DocumentDisplayComponent implements OnInit {
  documents: any[] = [];

  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
    this.loadDocuments();
  }

  loadDocuments(): void {
    this.documentService.getDocuments().subscribe({
      next: (data) => {
        this.documents = data;
      },
      error: (err) => {
        console.error('Failed to load documents', err);
      }
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
}

