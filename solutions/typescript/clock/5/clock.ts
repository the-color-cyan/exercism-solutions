const MINUTES_IN_HOUR = 60;
const MINUTES_IN_DAY = MINUTES_IN_HOUR * 24;

export class Clock {
	/** Total minutes since midnight */
	private minutesPastMidnight: number;

	constructor(hour: number, minute?: number) {
		this.minutesPastMidnight = this.calcTotalMinutes(hour, minute);
	}

	public toString(): string {
		return `${String(this.hour()).padStart(2, "0")}:${String(this.minute()).padStart(2, "0")}`;
	}

	public plus(minutes: number): Clock {
		return new Clock(0, this.minutesPastMidnight + minutes);
	}

	public minus(minutes: number): Clock {
		return new Clock(0, this.minutesPastMidnight - minutes);
	}

	public equals(other: Clock): boolean {
		return this.minutesPastMidnight == other.minutesPastMidnight;
	}

	private calcTotalMinutes(hour: number, minute?: number): number {
		return euclidianRemainder(
			hour * MINUTES_IN_HOUR + (minute ?? 0),
			MINUTES_IN_DAY,
		);
	}

	private hour(): number {
		return Math.floor(this.minutesPastMidnight / MINUTES_IN_HOUR);
	}

	private minute(): number {
		return euclidianRemainder(this.minutesPastMidnight, 60);
	}
}

function euclidianRemainder(dividend: number, divisor: number) {
	return ((dividend % divisor) + divisor) % divisor;
}
