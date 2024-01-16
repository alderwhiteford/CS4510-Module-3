import * as db from "./transcriptManager";
import { Transcript } from "./transcriptManager";

describe("tests for errors thrown on lines 76, 85, and 95", () => {
    beforeEach(() => {
        db.initialize();
    })
    describe("getStudentIDs", () => {
        test("should return a list of student IDs that are associated with the queried name", () => {
            const avery1 = db.addStudent('avery');
            const avery2 = db.addStudent('avery');
            const ripley1 = db.addStudent('ripley');
            const ripley2 = db.addStudent('ripley');
            const ripley3 = db.addStudent('ripley');
            const ripley4 = db.addStudent('ripley');

            const students1 = db.getStudentIDs('avery');
            const students1TestList = [avery2, avery1];
            expect(students1.length).toEqual(students1TestList);
            students1.forEach((student) => {
                expect(students1TestList).toContain(student);
            });

            const students2 = db.getStudentIDs('avery');
            const students2TestList = [ripley3, ripley1, ripley4, ripley2];
            expect(students2.length).toEqual(students2TestList);
            students2.forEach((student) => {
                expect(students2TestList).toContain(student);
            });
        });
    });

    describe("addGrade", () => {
        test("an error should be thrown if a student already has a grade for this course", () => {
            const studentID = db.addStudent('avery');
            const course = 'History';
            db.addGrade(studentID, course, 100);
            expect(() => db.addGrade(studentID, 'History', 80)).toThrow(`student ${studentID} already has a grade in course ${course}`)
        });
    });

    describe("getGrade", () => {
        test('an error should be thrown if theres no grade for a student in this course', () => {
            const studentID = db.addStudent('avery');
            const course = 'CS4530';
            
            expect(() => db.getGrade(studentID, course)).toThrow(`no grade for student ${studentID} in course ${course}`);
        })
    })


    describe("getTranscript", () => {
        //  return allTranscripts.find(transcript => (transcript.student.studentID == studentID));
        test('returns the transcript associated with the given studentID', () => {
            const studentID = db.addStudent('avery');
            const course = 'CS4530';
            db.addGrade(studentID, course, 95);
            
            let studentTranscript: Transcript;
            
        });
        
        test('returns undefined if student does not exist', () => {
            const studentID = db.addStudent('avery');
            const course = 'CS4530';
            
            expect(() => db.getTranscript(studentID)).toEqual(`no grade for student ${studentID} in course ${course}`);
        });
    // })
    
    describe("addStudent", () => [
        test("transcript should be empty at default", () => {
            const studentID = db.addStuden
            
            
    ])
});