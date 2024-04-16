import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-document-display',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './document-display.component.html',
  styleUrl: './document-display.component.css'
})
export class DocumentDisplayComponent implements OnInit {
  documents: any[] = [];

  constructor() {}

  ngOnInit(): void {
    // For now, you can mock some documents to see the layout
    this.documents = [
      { title: 'Document 1', summary: 'Summary of document 1' },
      { title: 'Document 2', summary: 'Summary of document 2' },
    ];
  }

}
