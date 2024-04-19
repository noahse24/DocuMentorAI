import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
//import { Response } from './response';

@Injectable({
  providedIn: 'root'
})
export class LlmCommunicationService {

  //private replicateApiUrl = 'https://api.replicate.com/v1/predictions';
  private replicateApiUrl = '/v1/predictions';


  constructor(private http: HttpClient) { }

  sendPrompt(prompt: string): Observable<any> {
    
    const headers = new HttpHeaders({
      'Authorization': 'TOKEN r8_IuOMWBbLYBVLV12ZOGhBP0e2LOXsTLm0v2GZD',
      'Content-Type': 'application/json'
    });

    const body = {
      version: 'mistralai/mixtral-8x7b-instruct-v0.1',
      //input: { prompt: prompt },
      top_k: 50,  // Optional: Set your value or use the default
      top_p: 0.9, // Optional: Set your value or use the default
      prompt: prompt, // Required: The actual prompt from the user
      temperature: 0.6, // Optional: Set your value or use the default
      max_new_tokens: 512, // Optional: Set your value or use the default
      prompt_template: "<s>[INST] {prompt} [/INST] ", // Optional: Set your value or use the default
      presence_penalty: 0, // Optional: Set your value or use the default
      frequency_penalty: 0 // Optional: Set your value or use the default
    };

    console.log('Sending request with body:', body); // Log the request body to the console

    return this.http.post(this.replicateApiUrl, body, { headers })
      

  /* 
    let mockResponse = {};

  if (prompt.toLowerCase().includes("eiffel tower")) {
    mockResponse = {
      documentTitle: 'Eiffel Tower',
      documentSummary: 'The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France.'
    };
  } else {
    mockResponse = {
      documentTitle: 'Unknown Prompt',
      documentSummary: 'No summary available for this prompt.'
    };
  }

  return of(mockResponse);
  */
    
  }
}
