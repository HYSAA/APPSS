import { Component } from '@angular/core';
import { College } from '../Models/colleges';
import { Program } from '../Models/programs';
import { Student } from '../Models/students';

@Component({
  selector: 'app-student-update',
  templateUrl: './student-update.component.html',
  styleUrls: ['./student-update.component.css']
})
export class StudentUpdateComponent {

  ollegesdb: Array<College> = [];
  programsdb: Array<Program> = [];
  studentdb : Array<Student> = [];



}
