import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  public apiUrl = 'http://localhost:3000/api/documents';  // Adjust as necessary

  constructor(private http: HttpClient) { }

  getDocuments(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getDocumentSummary(documentId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${documentId}/summary`);
  }

  /*
  retrieveDocuments(type: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/documents/${type}`);
  }

  summarizeDocument(documentId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/summary/${documentId}`);
  }
  */
}
