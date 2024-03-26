import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LlmCommunicationService {

  private baseUrl: string = 'https://api.replicate.com/v1/predictions';

  constructor(private http: HttpClient) { }

  sendPrompt(promptText: string): Observable<any> {
    const body = {
      top_k: 50,
      top_p: 0.9,
      temperature: 0.6,
      max_new_tokens: 1024,
      prompt_template: "[[INST]]" + promptText + "[[/INST]]",
      presence_penalty: 0,
      frequency_penalty: 0
    };
    
      const headers = {
        'Authorization': `Token ${environment.replicateApiKey}`,
        'Content-Type': 'application/json'
      }

    return this.http.post(this.baseUrl, body, {headers});
  }
}
