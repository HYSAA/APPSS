import { Component, OnInit } from '@angular/core';
import { StudentdbService } from '../studentdb.service';
import { registerLocaleData } from '@angular/common';

import { Student } from '../Models/students';
import { College } from '../Models/colleges';
import { Program } from '../Models/programs';
import { CollegedbService } from '../collegedb.service';
import { ProgramdbService } from '../programdb.service';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

    collegesdb: Array<College> = [];
    programsdb: Array<Program> = [];
    studentdb : Array<Student> = [];

    studID: number = null;
    studFirstName: string = '';
    studLastName: string = '';
    studMidName: string = '';
    studYear: number = null;


    selectedCollege: College = null;
    selectedProgram: Program = null;
    selectedStudent: Student = null;


    
    printable: boolean = false;
    clicked: boolean = false;

  constructor (
    private studentsService : StudentdbService,
    private collegesService : CollegedbService,
    private programsService : ProgramdbService
  ) {}

  public saveStudentInfo(): void {
    let studData: Student = {
      studid: this.studID,
      studfirstname: this.studFirstName,
      studlastname: this.studLastName,
      studmidname: this.studMidName,
      // studcollid: this.selectedCollege.collid,
      // studprogid: this.selectedProgram.progid,
      studprogid: this.selectedProgram , 
      studcollid: this.selectedCollege,
      studyear: this.studYear,
      
    };

  //   let studData: Student = {
  //     studid: Number(this.studID),
  //     studfirstname: this.studFirstName,
  //     studlastname: this.studLastName,
  //     studmidname: this.studMidName,
  //     studprogid: this.selectedProgram.progid,
  //     studcollid: this.selectedCollege.collid,
  //     studyear: Number(this.studYear),
  // }
  
    this.studentsService.saveStudent(studData).subscribe(
      (data) => {
        console.log('Student data saved:', data);
        this.studentdb.push(studData);
        this.clearEntries();
      },
      (error) => {
        console.error('Error saving student data:', error);
      }
    );
  }


  
  public getCollegesListing() {
    this.collegesService.getColleges().subscribe(
      (data: College[]) => {
        this.collegesdb = data;
        console.log(this.collegesdb); 
      },
      (error) => {
        console.error('Error fetching programs:', error);
      }
    );
  }
  

  public getProgramsListing() {
    this.programsService.getPrograms().subscribe(
      (data: Program[]) => {
        this.programsdb = data;
        console.log(this.programsdb);
      },
      (error) => {
        console.error('Error fetching programs:', error);
      }
    );
  }

     filteredPrograms: Program[] = [];


     public filterPrograms(): void {
      if (this.selectedCollege) {
        if (this.programsdb.length === 0) {
          this.programsService.getPrograms().subscribe((programs: Program[]) => {
            this.programsdb = programs;
            this.filterProgramsByCollege();
          });
        } else {
          this.filterProgramsByCollege();
        }
      } else {
        this.filteredPrograms = [];
      }
    }
    
    private filterProgramsByCollege(): void {
      this.filteredPrograms = this.programsdb.filter(program => program.progcollid === this.selectedCollege.collid);
      console.log('Filtered Programs:', this.filteredPrograms);
      this.selectedProgram = null;
    }



  public clearEntries(): void {
    this.studID = null;
    this.studFirstName = '';
    this.studLastName = '';
    this.studMidName = '';
    this.studYear = null;
    this.selectedProgram = null;
    this.selectedCollege = null;
}


public getProgramName(progid: number, short: boolean = null): string{
  let foundName = this.programsdb.find(element =>
      element.progid === progid
  );
  short = short ?? true;
  return short ? foundName.progshortname : foundName.progfullname;
}

public getCollegeName(collid: number, short: boolean = null): string{
  let foundName = this.collegesdb.find(element => 
      element.collid === collid
      );

      short = short ?? true;
      return short ? foundName.collshortname : foundName.collfullname;
}


public printStudentEntries(): void {
  this.getStudentsListing(); 
  this.printable = true;
}
  
 private getStudentsListing() {
  this.studentsService.getStudents().subscribe(
    (data: Student[]) => {
      this.studentdb.push(...data);
      this.studentdb = data;  
      console.log(this.studentdb); 
    },
    (error) => {
      console.error('Error fetching student entries:', error);
    }
  );
}

public removeStudent(studid: Student):void{
  this.studentsService.removeStudent(studid).subscribe(data => {
    console.log(data);
  });
}

public getStudentInfo(studid: Student): void{
  this.studentsService.getStudentInfo(studid).subscribe(data=>{
    this.selectedStudent = data;
    this.populateFormFields();
    console.log('Retrieved student data:', this.selectedStudent);
    console.log(data);
  })
}

private populateFormFields(): void {
  if (this.selectedStudent) {
    this.studID = this.selectedStudent.studid;
    this.studFirstName = this.selectedStudent.studfirstname;
    this.studMidName = this.selectedStudent.studmidname;
    this.studLastName = this.selectedStudent.studlastname;
    // this.selectedCollege = this.collegesdb.find(college => college.collid === this.selectedStudent.studcollid);
    // this.selectedProgram = this.programsdb.find(program => program.progid === this.selectedStudent.studprogid);
    this.studYear = this.selectedStudent.studyear;
    // this.clicked = true;
  }
}

// public updateStudentInfo(): void {
//   let studData: Student = {
//     studid: this.studID,
//     studfirstname: this.studFirstName,
//     studlastname: this.studLastName,
//     studmidname: this.studMidName,
//     studcollid: this.selectedCollege.collid,
//     studprogid: this.selectedProgram.progid,
//     studyear: this.studYear,
//   };

//   this.studentsService.updateStudentInfo(studData).subscribe(
//     (data) => {
//       console.log('Student data updated:', data);
//       this.clearEntries(); 
//     },
//     (error) => {
//       console.error('Error updating student data:', error);
//     }
//   );
// }

  ngOnInit(): void {    
    this.getCollegesListing();
    this.getProgramsListing();
    this.getStudentsListing();
  }  
}
 