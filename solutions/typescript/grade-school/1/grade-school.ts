export class GradeSchool {
	private studentsInGrade: Map<number, string[]>;

	constructor() {
		this.studentsInGrade = new Map();
	}

	roster(): Record<number, string[]> {
		const roster: Record<number, string[]> = {};

		for (const [grade, students] of this.studentsInGrade) {
			roster[grade] = [...students];
		}

		return roster;
	}

	add(name: string, grade: number): void {
		this.checkGrade(grade);
		this.removeStudent(name);

		const students = this.studentsInGrade.get(grade) ?? [];
		students.push(name);
		students.sort();

		this.studentsInGrade.set(grade, students);
	}

	grade(grade: number): string[] {
		this.checkGrade(grade);
		return [...(this.studentsInGrade.get(grade) ?? [])];
	}

	private removeStudent(name: string): void {
		for (const [grade, students] of this.studentsInGrade) {
			const remainingStudents = students.filter((student) => student !== name);

			if (remainingStudents.length === 0) {
				this.studentsInGrade.delete(grade);
			} else {
				this.studentsInGrade.set(grade, remainingStudents);
			}
		}
	}

	private checkGrade(grade: number): void {
		if (grade < 1 || grade > 12) throw new Error(`Invalid grade: ${grade}`);
	}
}
