import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, map, Observable, switchMap, takeWhile } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

private baseUrl = 'https://vocational-letizia-jeancolonia-d904627c.koyeb.app/api/pdf';

   constructor(private http: HttpClient) {}

  generatePdf(url: string): Observable<string> {
    return this.http.post(this.baseUrl + '/generate', { url }, { responseType: 'text' });
  }

  getStatus(jobId: string): Observable<string> {
    return this.http.get(this.baseUrl + `/status/${jobId}`, { responseType: 'text' });
  }

  downloadPdf(jobId: string): Observable<Blob> {
    return this.http.get(this.baseUrl + `/${jobId}`, { responseType: 'blob' });
  }

  // Helper: polling hasta que esté listo
  waitUntilReady(jobId: string): Observable<boolean> {
    return interval(3000).pipe(
      switchMap(() => this.getStatus(jobId)),
      map(status => status === 'READY'),
      takeWhile(ready => !ready, true)
    );
  }
}
