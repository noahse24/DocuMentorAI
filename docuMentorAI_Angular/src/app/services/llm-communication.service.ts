import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LlmCommunicationService {

  //private apiUrl = '/api/v1/predictions';
  private apiUrl = '/api/generate-documents';

  constructor(private http: HttpClient) { }

  /*
  generateDocument(prompt: string): Observable<any> {
    const body = {
      version: 'mistralai/mixtral-8x7b-instruct-v0.1',
      input: {
        prompt: prompt,
        top_k: 50,
        top_p: 0.9,
        temperature: 0.6,
        max_new_tokens: 512,
        prompt_template: "<s>[INST] {prompt} [/INST] ",
        presence_penalty: 0,
        frequency_penalty: 0
      }
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token r8_XE8CKITthDTiJopWYjaWCd3UbdLDzqm1kE2Qi' // Replace with your actual API token
    });
    return this.http.post('/api/v1/predictions', body, { headers });
  }
  */

  generateDocument(prompt: string): Observable<any> {
    return this.http.post(this.apiUrl, { prompt });
}
}
