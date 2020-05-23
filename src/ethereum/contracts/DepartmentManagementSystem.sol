pragma solidity ^0.4.17;

contract DepartmentManagementSystem
{
    
    struct Department{
        string department_name;
        string department_hod;
    }
    
    struct Batch{
        uint department_id;
        string batch_name;
        string start_year;
        string end_year;
    }
    
    struct Semester{
        uint department_id;
        uint batch_id;
        uint semester;
        string start_date;
        string end_date;
    }
    
    struct Subject{
        uint department_id;
        uint batch_id;
        uint semester_id;
        string subject_name;
        string subject_code;
    }
    
    struct Faculty{
        string first_name;
        string last_name;
        string email;
        uint contact;
        string password;
        string designation;
        string qualificationexperience;
    }
    
    struct Student{
        string first_name;
        string last_name;
        uint enrollment_no;
        uint contact;
        string password;
        uint batch_id;
        uint department_id;
    }
    

    struct AssignFaculty{
        uint faculty_id;
        uint department_id;
        uint batch_id;
        uint semester_id;
        uint subject_id;
    }

struct addMidsem{


    uint department_id;
    uint batch_id;
    uint faculty_id;
    uint semester_id;
    uint subject_id;
    string midsem_title;
    uint totalmarks;   
 
 }
 
 //msg for addmidsem structure
 //faculty can add midsem for the particular subject and sets total marks of that midsem exam
 
 
 
 struct assignMidMarks{
 
     uint midsem_id;
     uint semster_id;
     uint student_id;
     uint subject_id;
     string student_name;
     uint total_marks;
     uint obtained_marks;
 
 }
 
 //msg for assignMidMarks structure
 //here faculty will assign marks to each and every students
  

    Department[] public departments;
    Batch[] public batches;
    Semester[] public semesters;
    Subject[] public subjects;
    Faculty[] public faculties;
    Student[] public students;
    AssignFaculty[] public assignFaculties;
    addMidsem[] public midsems;
    assignMidMarks[] public midmarks;
    
    
    function assignMidsemToSubject( uint department_id,
    uint batch_id,
    uint faculty_id,
    uint semester_id,
    uint subject_id,
    string midsem_title,
    uint totalmarks   
 ) public{
        
        addMidsem memory newMidsem = addMidsem({
            department_id:department_id,
            batch_id:batch_id,
            faculty_id:faculty_id,
            subject_id:subject_id,
            semester_id:semester_id,
            midsem_title:midsem_title,
        totalmarks:totalmarks
        });

        midsems.push(newMidsem);
        
    }
    
    
    function assignMarksToStudent(  uint midsem_id,
     uint semster_id,
     uint student_id,
     uint subject_id,
     string student_name,
     uint total_marks,
     uint obtained_marks) public{
        
        assignMidMarks memory newMidMarks = assignMidMarks({
            midsem_id:midsem_id,
            semster_id:semster_id,
            student_id:student_id,
            subject_id:subject_id,
            student_name:student_name,
            total_marks:total_marks,
            obtained_marks:obtained_marks
        });
        
        midmarks.push(newMidMarks);
    }
    
    
     function createDepartment(string department_name, string department_hod) public{
        Department memory newDepartment = Department({
           department_name: department_name,
           department_hod: department_hod
        });

        departments.push(newDepartment);
    }
    
     function createBatch(uint department_id,string batch_name,string start_year,string end_year) public{
      
        Batch memory newBatch = Batch({
           department_id: department_id,
            start_year: start_year,
             end_year: end_year,
           batch_name: batch_name
        });

        batches.push(newBatch);
    }
    
    
      function createSemester(uint department_id,uint batch_id,uint semester,string start_date,string end_date) public{
      
        Semester memory newSemester = Semester({
           department_id: department_id,
            start_date: start_date,
            semester:semester,
             end_date: end_date,
           batch_id: batch_id
        });

        semesters.push(newSemester);
    }
    
    
    
     function createSubject( uint department_id,
        uint batch_id,
        uint semester_id,
        string subject_name,
        string subject_code
         ) public{
        Subject memory newSubject = Subject({
           department_id: department_id,
           batch_id: batch_id,
           semester_id: semester_id,
           subject_name: subject_name,
           subject_code: subject_code
         
        });

        subjects.push(newSubject);
    }
    
    
     function createFaculty( string first_name,
        string last_name,
        string email,
        uint contact,
        string password,
        string designation,
        string qualificationexperience) public{
        Faculty memory newFaculty = Faculty({
           first_name: first_name,
             last_name: last_name,
               email: email,
                 contact: contact,
                   password: password,
                     designation: designation,
           qualificationexperience: qualificationexperience
        });

        faculties.push(newFaculty);
    }
    
    
     function createStudent(  string first_name,
        string last_name,
        uint enrollment_no,
      
        uint contact,
        string password,
        uint batch_id,
        uint department_id) public{
        Student memory newStudent = Student({
           first_name: first_name,
           last_name: last_name,
           enrollment_no: enrollment_no,
          
           contact: contact,
           password:password,
            batch_id: batch_id,
           department_id: department_id
        });

        students.push(newStudent);
    }
    
    
    function AssignFacultyToSubject(
        uint faculty_id,
        uint department_id,
        uint batch_id,
        uint semester_id,
        uint subject_id
    ) public {
        AssignFaculty memory newAssignFaculty = AssignFaculty({
            faculty_id:faculty_id,
            department_id:department_id,
            batch_id:batch_id,
            semester_id:semester_id,
            subject_id:subject_id
        });

        assignFaculties.push(newAssignFaculty);
    }

    
    function getMidSemsCount() public view returns (uint) {
        return midsems.length;
    }  
    
    function getMidMarksCount() public view returns (uint) {
        return midmarks.length;
    }
    
    function getAssignedFacultiesCount() public view returns (uint) {
        return assignFaculties.length;
    }
    

    function getDepartmentsCount() public view returns (uint) {
        return departments.length;
    }
    
    function getBatchesCount() public view returns (uint) {
        return batches.length;
    }
    
    function getSemestersCount() public view returns (uint) {
        return semesters.length;
    }
    
    function getSubjectsCount() public view returns (uint) {
        return subjects.length;
    }
    
    function getFacultiesCount() public view returns (uint) {
        return faculties.length;
    }
    
    function getStudentsCount() public view returns (uint) {
        return students.length;
    }
    
    
    
}