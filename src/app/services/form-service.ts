import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, map, Observable, switchMap, takeWhile } from 'rxjs';

type PdfJobStatus = 'PENDING' | 'DONE' | 'FAILED' | 'NOT_FOUND';

@Injectable({
  providedIn: 'root'
})
export class FormService {

private baseUrl = 'https://vocational-letizia-jeancolonia-d904627c.koyeb.app/api/pdf';

  constructor(private http: HttpClient) {}

  generatePdf(url: string): Observable<string> {
    return this.http.post(this.baseUrl + '/generate', { url }, { responseType: 'text' });
  }

  getStatus(jobId: string): Observable<PdfJobStatus> {
    return this.http.get<PdfJobStatus>(`${this.baseUrl}/status/${jobId}`, { responseType: 'text' as 'json' });
  }

  downloadPdf(jobId: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${jobId}`, { responseType: 'blob' });
  }

  waitUntilReady(jobId: string): Observable<boolean> {
    return interval(3000).pipe(
      switchMap(() => this.getStatus(jobId)),
      map(status => status === 'DONE'),
      takeWhile(done => !done, true)
    );
  }
}
