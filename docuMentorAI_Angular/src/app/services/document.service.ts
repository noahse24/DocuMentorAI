import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { AppDocument } from '../model/AppDocument';
import { ApiRequest } from '../model/ApiRequest';
import { ApiResponse } from '../model/ApiResponse';
import { DocumentDisplayComponent } from '../components/document-display/document-display.component';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  public apiUrl = 'http://localhost:3000/documents';  // Adjust as necessary

  constructor(private http: HttpClient) { }

  searchDocuments(query: string): Observable<any[]> {
    return this.http.post<any[]>('http://localhost:3000/api/search-documents', { prompt: query });
  }

  getDocuments(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  
  getDocumentSummary(documentId: number): Observable<any> {
    return this.http.post<ApiResponse>('http://localhost:3000/generate-summary', { documentId })
    .pipe(map(response => response.summary));
  }

  retrieveDocuments(type: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/documents/${type}`);
  }


  /*
  summarizeDocument(content: string): Observable<any> {
    return this.http.post<any>('http://localhost:3000/generate-summary', { content });
  }
*/
  summarizeDocument(prompt: string): Observable<any> {
    const body: ApiRequest = {
      prompt: prompt,
      top_k: 50,
      top_p: 0.9,
      temperature: 0.6,
      max_new_tokens: 512,
      prompt_template: "<s>[INST] {prompt} [/INST] "
    };

    return this.http.post<ApiResponse>('http://localhost:3000/generate-summary', body).pipe(
      map(response =>  response.summary)
  );
}
  
}
