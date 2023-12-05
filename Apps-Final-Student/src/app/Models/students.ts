import { College } from "./colleges";
import { Program } from "./programs";


export type Student = {
    studid: number;
    studfirstname: string;
    studlastname: string;
    studmidname: string;
    // studprogid: number;
    // studcollid: number;
    //  studprogid: Program['progid'];
    // studcollid: College['collid'];
    studprogid: Program;
    studcollid: College;
    studyear: number;
  } 
      
    
    