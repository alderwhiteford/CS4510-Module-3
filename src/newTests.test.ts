import * as db from "./transcriptManager";
import { Transcript } from "./transcriptManager";

describe("tests for the initialization of transcriptManager.ts", () => {
    test("test that allTranscripts is empty prior to initialization", () => {
        const allTranscripts = db.getAll();
        expect(allTranscripts.length).toEqual(0);
    });
});

describe("tests for the methods of transcriptManager.ts", () => {
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
            expect(students1.length).toEqual(students1TestList.length);
            students1.forEach((student) => {
                expect(students1TestList).toContain(student);
            });

            const students2 = db.getStudentIDs('ripley');
            const students2TestList = [ripley3, ripley1, ripley4, ripley2];
            expect(students2.length).toEqual(students2TestList.length);
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
    });

    // Line 39 Stryker Error:
    describe("addStudent", () => {
        test('a students course grades should be empty after they are first added', () => {
            const studentID = db.addStudent('avery');
            const transcript = db.getTranscript(studentID);
            expect(transcript?.grades.length).toEqual(0);
        });
    });

    // Line 47 & 48 Stryker Error: 
    describe("getTranscript", () => {
        test('if a student exists, a transcript should be defined', () => {
            const studentID = db.addStudent('avery');
            const transcript = db.getTranscript(studentID);
            expect(transcript).toBeDefined();
        });
        test('if a student does not exist, a transcript should be undefined', () => {
            const transcript = db.getTranscript(12345);
            expect(transcript).toBeUndefined();
        });
        test('the transcript returned should be associated with the student', () => {
            const averyID = db.addStudent('avery');
            const rohanID = db.addStudent('rohan');
            const course = 'History'
            db.addGrade(averyID, course, 90);

            const rohanTranscript = db.getTranscript(rohanID);
            expect(rohanTranscript?.grades.length).toEqual(0);

            const averyTranscript = db.getTranscript(averyID);
            expect(averyTranscript?.grades.length).toEqual(1);
        });
    });
});
