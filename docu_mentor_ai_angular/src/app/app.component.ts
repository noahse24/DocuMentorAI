import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LlmCommunicationService } from './services/llm-communication.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [LlmCommunicationService]
})
export class AppComponent {
  prompt: string = '';
  response: any = null;

  constructor(private llmService: LlmCommunicationService) {}

  sendPrompt(): void {
    console.log('Sending prompt:', this.prompt);
    this.llmService.sendPrompt(this.prompt).subscribe({
      next: (res) => {
        this.response = res; // Adjust based on the structure of your LLM response
        console.log('LLM response:', res);
      },
      error: (err) => console.error('Error:', err)
    });
  }
}


