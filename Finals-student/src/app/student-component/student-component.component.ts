import { Component } from '@angular/core';
import { DataService } from '../data.service';

type College = {
  colID: number | string;
  colShortName: string;
  colFullName: string;
};

type Program = {
  progID: number | string;
  progShortName: string;
  progFullName: string;
  progCollege: number | string;
};

type Student = {
  studID: number | string;
  studFirstName: string;
  studLastName: string;
  studMidName?: string;
  studProgram: Program;
  studCollege: College;
  studYear: number | string;
};

@Component({
  selector: 'app-student-component',
  templateUrl: './student-component.component.html',
  styleUrls: ['./student-component.component.css']
})
export class StudentComponentComponent {

  colleges: Array<College> = [
    { colID: 100, colShortName: 'SCS', colFullName: 'School of Computer Studies' },
    { colID: 101, colShortName: 'SBM', colFullName: 'School of Business and Management' },
    { colID: 102, colShortName: 'SAS', colFullName: 'School of Arts and Sciences' },
    { colID: 103, colShortName: 'SOENG', colFullName: 'School of Engineering' },
    { colID: 104, colShortName: 'SED', colFullName: 'School of Education' },
    { colID: 105, colShortName: 'SAMS', colFullName: 'School of Allied Medical Sciences' }
  ];

  programs: Array<Program> = [
    { progID: 100001, progShortName: 'BSCS', progFullName: 'Bachelor of Science in Computer Science', progCollege: 100 },
    { progID: 100002, progShortName: 'BSIT', progFullName: 'Bachelor of Science in Information Technology', progCollege: 100 },
    { progID: 100003, progShortName: 'BSEMC', progFullName: 'Bachelor of Science in Entertainment and Multimedia Computing', progCollege: 100 },
    { progID: 100004, progShortName: 'BSIS', progFullName: 'Bachelor of Science in Information Systems', progCollege: 100 },
    { progID: 101001, progShortName: 'BSA', progFullName: 'Bachelor of Science in Accountancy', progCollege: 101 },
    { progID: 101002, progShortName: 'BSMA', progFullName: 'Bachelor of Science in Management Accounting', progCollege: 101 },
    { progID: 101003, progShortName: 'BSBA', progFullName: 'Bachelor of Science in Business Administration', progCollege: 101 },
    { progID: 101004, progShortName: 'BSFM', progFullName: 'Bachelor of Science in Financial Management', progCollege: 101 },
  ];

  studID: number | string = null;
  studFirstName: string = '';
  studLastName: string = '';
  studMidName: string = '';
  studYear: number | string = null;

  selectedCollege: College = null;
  selectedProgram: Program = null;

  studentCollection: Array<Student> = [];

  printable: boolean = false;

  constructor(private dataService: DataService) { }

  public saveStudentInfo(): void {
    if (this.selectedProgram && this.selectedCollege) {
      // Convert numeric values to strings if needed
      const studData: Student = {
        studID: this.studID,
        studFirstName: this.studFirstName,
        studLastName: this.studLastName,
        studMidName: this.studMidName,
        studProgram: {
          progID: this.selectedProgram.progID.toString(),
          progShortName: this.selectedProgram.progShortName,
          progFullName: this.selectedProgram.progFullName,
          progCollege: this.selectedProgram.progCollege.toString()
        },
        studCollege: {
          colID: this.selectedCollege.colID.toString(),
          colShortName: this.selectedCollege.colShortName,
          colFullName: this.selectedCollege.colFullName
        },
        studYear: this.studYear.toString(),
      };

      this.dataService.saveStud(studData).subscribe(
        (response) => {
          console.log('Student data saved successfully:', response);
          // Handle any success logic here
        },
        (error) => {
          console.error('Error saving student data:', error);
          // Handle any error logic here
        }
      );

      this.clearEntries();
    }
  }

  public getProgramName(progID: number, short: boolean = null): string {
    let foundName = this.programs.find(elemment =>
      elemment.progID === progID
    );

    short = short ?? true;
    return short ? foundName.progShortName : foundName.progFullName;
  }

  public getCollegeName(colID: number, short: boolean = null): string {
    let foundName = this.colleges.find(elemment =>
      elemment.colID === colID
    );
    short = short ?? true;
    return short ? foundName.colShortName : foundName.colFullName;
  }

  public clearEntries(): void {
    this.studID = null;
    this.studFirstName = '';
    this.studMidName = '';
    this.studLastName = '';
    this.selectedProgram = null;
    this.selectedCollege = null;
    this.studYear = null;
    this.printable = false;
  }

  public printStudentEntries(): void {
    this.printable = true;
  }

  public destroyCollection(): void {
    if (this.printable) {
      this.printable = false;
    }
    this.studentCollection = [];
  }
}
