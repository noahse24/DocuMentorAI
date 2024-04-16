import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
//import { Response } from './response';

@Injectable({
  providedIn: 'root'
})
export class LlmCommunicationService {

  private replicateApiUrl = 'https://api.replicate.com/v1/predictions';

  private headers = {
    'Authorization': 'r8_S7gIv3kPzD4yccxXL7pajEcMGeZDQro1KgUYc',
    'Content-Type': 'application/json'
  };

  constructor(private http: HttpClient) { }

  sendPrompt(prompt: string): Observable<any> {
    const body = {
      //version: 'YOUR_MODEL_VERSION',
      input: { prompt: prompt }
    };

    return this.http.post(this.replicateApiUrl, body, { headers: this.headers });
  }
}
