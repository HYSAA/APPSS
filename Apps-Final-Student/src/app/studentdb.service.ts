import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 import { Student } from './Models/students';

@Injectable({
  providedIn: 'root'
})
export class StudentdbService {

  constructor(private http: HttpClient) { }
  baseURL: string = 'http://localhost:8000/usjr-app/api/'; 

  saveStudent(studData: Student) : Observable<any> {
    return this.http.post(this.baseURL + 'savestudent.php' , studData)
  }


  removeStudent(studData : Student) : Observable <any>{
    return this.http.post(this.baseURL + 'removestudent.php' , studData);
  }

 getStudentInfo(studData : Student) : Observable<any>{
  return this.http.post(this.baseURL + 'getstudentinfo.php' , studData);

 }

 updateStudentInfo(studData : Student) : Observable<any> {
  return this.http.post(this.baseURL + 'poststudentinfo.php' , studData);

 }
  getStudents() : Observable<any> {
    return  this.http.get(this.baseURL +'getstudents.php')
  }

  
}
