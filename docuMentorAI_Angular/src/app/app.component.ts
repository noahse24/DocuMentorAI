import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

/*
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
*/

// For both AppComponent and LoginFormComponent
@Component({
  selector: 'app-root', // or respective selectors
  templateUrl: './app.component.html', // or respective templates
  styleUrls: ['./app.component.css'] // or respective styles
  // Remove the `standalone: true` and any direct imports if they were added
})


export class AppComponent {
  title = 'docuMentorAI_Angular';
}
