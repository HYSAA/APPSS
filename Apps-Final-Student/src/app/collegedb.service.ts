import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollegedbService {
  constructor(private http: HttpClient) { }
  baseURL: string = 'http://localhost:8000/usjr-app/api/'; 

 
  getColleges() : Observable<any> {
    return  this.http.get(this.baseURL +'getcolleges.php')
    
  }

}
