import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgramdbService {
  

  constructor(private http: HttpClient) { };
  baseURL: string = 'http://localhost:8000/usjr-app/api/'; 


  getPrograms() : Observable<any> {
    return  this.http.get(this.baseURL +'getprograms.php')
  }
}
