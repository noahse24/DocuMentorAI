import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-document-retrieval',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './document-retrieval.component.html',
  styleUrl: './document-retrieval.component.css'
})

export class DocumentRetrievalComponent {
  userPrompt: string;

  constructor() {
    this.userPrompt = '';
  }

  onSubmit() {
    console.log(this.userPrompt);
    // Implement the retrieval logic here
  }
}
