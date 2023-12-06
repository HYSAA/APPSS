import { Component } from '@angular/core';
import { DataService } from '../data.service';

type College = {
    colID: number;
    colShortName: string;
    colFullName: string;
}

type Program = {
    progID: number;
    progShortName: string;
    progFullName: string;
    progCollege: number;
}

type Student = {
    studID: number;
    studFirstName: string;
    studLastName: string;
    studMidName?: string;
    studProgram: Program;
    studCollege: College;
    studYear: number;
}

@Component({
    selector: 'app-student-component',
    templateUrl: './student-component.component.html',
    styleUrls: ['./student-component.component.css']
})
export class StudentComponentComponent {




    colleges: Array<College> = [
        { colID: 5, colShortName: 'SCS', colFullName: 'School of Computer Studies' },
        { colID: 1, colShortName: 'SBM', colFullName: 'School of Business and Management' },
        { colID: 2, colShortName: 'SAS', colFullName: 'School of Arts and Sciences' },
        { colID: 3, colShortName: 'SOENG', colFullName: 'School of Engineering' },
        { colID: 4, colShortName: 'SED', colFullName: 'School of Education' },
        { colID: 6, colShortName: 'SAMS', colFullName: 'School of Allied Medical Sciences' }
    ];

    programs: Array<Program> = [
        { progID: 100001, progShortName: 'BSCS', progFullName: 'Bachelor of Science in Computer Science', progCollege: 100 },
        { progID: 100002, progShortName: 'BSIT', progFullName: 'Bachelor of Science in Information Technology', progCollege: 100 },
        { progID: 100003, progShortName: 'BSEMC', progFullName: 'Bachelor of Science in Entertainment and Multimedia Computing', progCollege: 100 },
        { progID: 100004, progShortName: 'BSIS', progFullName: 'Bachelor of Science in Information Systems', progCollege: 100 },
        { progID: 101001, progShortName: 'BSA', progFullName: 'Bachelor of Science in Accountance', progCollege: 101 },
        { progID: 101002, progShortName: 'BSMA', progFullName: 'Bachelor of Science in Management Accounting', progCollege: 101 },
        { progID: 101003, progShortName: 'BSBA', progFullName: 'Bachelor of Science in Business Administration', progCollege: 101 },
        { progID: 101004, progShortName: 'BSFM', progFullName: 'Bachelor of Science in Financial Management', progCollege: 101 },
    ]
    message: string = '';

    studID: number = null;
    studFirstName: string = '';
    studLastName: string = '';
    studMidName: string = '';
    studYear: number = null;

    selectedCollege: College = null;
    selectedProgram: Program = null;

    studentCollection: Array<Student> = [];

    printable: boolean = false;

    constructor(private dataService: DataService) { }

    public saveStudentInfo(): void {
        let studData: Student;

        studData = {
            studID: Number(this.studID),
            studFirstName: this.studFirstName,
            studLastName: this.studLastName,
            studMidName: this.studMidName,
            studProgram: this.selectedProgram,
            studCollege: this.selectedCollege,
            studYear: Number(this.studYear),
        }

        console.log(studData)


        //added coded
        //changed all studData To studData



        this.dataService.saveStud(studData).subscribe(

            (response) => {
                if (response.startsWith('Connected')) {
                    // Handle the non-JSON response here (if it starts with 'Connected' or other unexpected content)
                    console.log('Non-JSON response:', response);
                    // Process or handle the response according to your application's logic
                } else {
                    // Try parsing the response as JSON
                    try {
                        const jsonResponse = JSON.parse(response);
                        // Handle the parsed JSON response
                        if (jsonResponse && jsonResponse.status === 'success') {
                            this.message = 'User added successfully.';

                        } else {
                            this.message = 'Failed to add user. Please try again.';
                        }
                    } catch (error) {
                        console.error('Error parsing JSON:', error);
                        this.message = 'An error occurred while processing the response.';
                    }
                }
            },
            (error) => {
                if (error && error.message) {
                    this.message = 'An error occurred: ' + error.message
                } else {
                    this.message = 'An error occurred. Please try again later.';
                }
            }

            // response => {
            //     if (response.status === 'success') {
            //         this.message = 'User added successfully.';
            //     } else {
            //         this.message = 'Failed to add user. Please try again.';
            //     }
            // }, error => {
            //     this.message = 'An yawaa error occurred. Please try again later.';
            // }

        );
        this.clearEntries();

        // this.studentCollection.push(studData);

    }

    public getPrograms(): void { 

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

    // public validateEntries(studData: any): void {
    //     let regexStrings = /^[a-zA-Z\s\-']+$/u
    //     let regexNum = /^[1-9]\d*$/


    //     let forNumPattern 




    //     for (let key in studData) {

    //         if (key == 'studID' || key == 'studYear') {

    //             forNumPattern = Number(key)
    //         }


    //         console.log(typeof key);




    //         // switch (typeof key) {




    //         //     case 'string':

    //         //         break;

    //         //     case 'number':
    //         //         console.log('string ni siya' + key)


    //         //         break;




    //         //     default:
    //         //         break;
    //         // }


    //     }

    // }

}