import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

private apiUrl = 'https://vocational-letizia-jeancolonia-d904627c.koyeb.app/api/pdf/generate';

  constructor(private http: HttpClient) { }

  generateReport(url:string):Observable<Blob>{
    const payload = { url }
    return this.http.post(this.apiUrl, payload, {
      headers: {'Content-Type': 'application/json'},
      responseType:'blob'
    })

  }
}
