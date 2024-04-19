import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Summary } from '../../../model/summary';

@Component({
  selector: 'app-summary-display',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './summary-display.component.html',
  styleUrl: './summary-display.component.css'
})
export class SummaryDisplayComponent {
  @Input() summary?: Summary;;

  constructor() { }

}
