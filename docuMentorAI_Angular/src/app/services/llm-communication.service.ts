import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ApiResponse } from '../model/ApiResponse';
import { ApiRequest } from '../model/ApiRequest';

/*
interface Response {
  message: string;
}
*/
@Injectable({
  providedIn: 'root'
})
export class LlmCommunicationService {

  private apiUrl = 'http://localhost:3000/generate-document';
  //private apiUrl = '/api/generate-documents';

  constructor(private http: HttpClient) { }

  generateDocument(prompt: string): Observable<any> {
    const body: ApiRequest = {
      prompt: prompt,
      top_k: 50,
      top_p: 0.9,
      temperature: 0.6,
      max_new_tokens: 512,
      prompt_template: "<s>[INST] {prompt} [/INST] "
    };

    return this.http.post<ApiResponse>(this.apiUrl, body).pipe(
      map(response =>  response.message)
  );
}
}

