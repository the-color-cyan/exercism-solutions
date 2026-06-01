type StudentRecord = Record<number, string[]>;

export class GradeSchool {
    studentRecord: StudentRecord;

    constructor() {
        this.studentRecord = {} as StudentRecord;
    }

    roster() {
        let copy: StudentRecord = {};

        for (const [grade, students] of Object.entries(this.studentRecord)) {
            copy[Number(grade)] = [...students];
        }

        return copy;
    }

    // a student may only be enrolled in one grade at a time; adding them to another grade transfers them.
    add(name: string, grade: number) {
        this.checkGrade(grade);
        this.remove(name);

        const students = this.studentRecord[grade] ?? [];

        students.push(name);
        students.sort();

        this.studentRecord[grade] = students;
    }

    private remove(name: string): void {
        for (const students of Object.values(this.studentRecord)) {
            if (!students) continue;

            let index = students.indexOf(name);
            if (index != -1) {
                students.splice(index, 1);
            }
        }
    }

    grade(grade: number): string[] {
        this.checkGrade(grade);

        // return only copy of the array for a grade
        return [...(this.studentRecord[grade] ?? [])];
    }

    private checkGrade(grade: number): void {
        if (grade < 1 || grade > 12) throw new Error(`Invalid grade: ${grade}`);
    }

    private isExistingStudent(name: string): boolean {
        for (let students of Object.values(this.studentRecord)) {
            if (!students) continue;

            if (students.includes(name)) {
                return true;
            }
        }

        return false;
    }
}
