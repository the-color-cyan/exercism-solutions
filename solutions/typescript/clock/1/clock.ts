const MINUTES_IN_HOUR = 60;
const MINUTES_IN_DAY = MINUTES_IN_HOUR * 24;

export class Clock {
    /** Total minutes since midnight */
    minutesPastMidnight: number;

    constructor(hour: number, minute?: number) {
        this.minutesPastMidnight = this.getTotal(hour, minute);
    }

    public toString(): string {
        return `${String(this.hours()).padStart(2, "0")}:${String(this.minutes()).padStart(2, "0")}`;
    }

    public plus(minutes: number): Clock {
        this.minutesPastMidnight += minutes;
        return this;
    }

    public minus(minutes: number): Clock {
        this.minutesPastMidnight -= minutes;
        return this;
    }

    public equals(other: Clock): boolean {
        return this.minutesPastMidnight == other.minutesPastMidnight;
    }

    private getTotal(hour: number, minute?: number): number {
        return (hour * MINUTES_IN_HOUR + (minute ?? 0)) % MINUTES_IN_DAY;
    }

    private hours(): number {
        return this.minutesPastMidnight / MINUTES_IN_HOUR;
    }

    private minutes(): number {
        return this.minutesPastMidnight % 60;
    }
}
