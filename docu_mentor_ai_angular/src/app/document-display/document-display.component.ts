import { Component, OnInit, Input, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Document } from '../../../model/document';
import { MaterialModule } from '../material.module';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-document-display',
  standalone: true,
  imports: [FormsModule, CommonModule, MaterialModule, MatButtonModule, MatInputModule, MatFormFieldModule],
  templateUrl: './document-display.component.html',
  styleUrl: './document-display.component.css'
})
export class DocumentDisplayComponent implements OnInit {
  @Input() documents: Document[] = [];
  promptText: string = '';

  constructor() {}

  ngOnInit(): void {
    // For now, you can mock some documents to see the layout
    this.documents = [
      { title: 'Document 1', summary: 'Summary of document 1' },
      { title: 'Document 2', summary: 'Summary of document 2' },
    ];
  }

  sendPrompt(): void {
    console.log('Prompt sent:', this.promptText);
    // Implement the logic to process the prompt text here
  }

}
