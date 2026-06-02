const SECONDS_IN_MINUTE = 60;
const SECONDS_IN_HOUR = SECONDS_IN_MINUTE * 60;

type StopwatchState = "ready" | "running" | "stopped";

export class SplitSecondStopwatch {
    private _state: StopwatchState = "ready";
    private _total: number = 0;
    private _currentLap: number = 0;
    private _previousLaps: number[] = [];

    public get state(): StopwatchState {
        return this._state;
    }

    public get currentLap(): string {
        return formatTime(this._currentLap);
    }

    public get total(): string {
        return formatTime(this._total);
    }

    public get previousLaps(): readonly string[] {
        return [...this._previousLaps].map((lapTime: number) =>
            formatTime(lapTime),
        );
    }

    public start(): void {
        switch (this.state) {
            case "ready":
                this._state = "running";
                return;
            case "stopped":
                this._state = "running";
                return;
            default:
                throw new Error("cannot start an already running stopwatch");
        }
    }

    public stop(): void {
        switch (this.state) {
            case "running":
                this._state = "stopped";
                return;
            default:
                throw new Error("cannot stop a stopwatch that is not running");
        }
    }

    public lap(): void {
        switch (this.state) {
            case "running":
                this._previousLaps.push(this._currentLap);
                this._currentLap = 0;
                return;
            default:
                throw new Error("cannot lap a stopwatch that is not running");
        }
    }

    public reset(): void {
        switch (this.state) {
            case "stopped":
                this._total = 0;
                this._currentLap = 0;
                this._previousLaps = [];
                this._state = "ready";
                return;
            default:
                throw new Error("cannot reset a stopwatch that is not stopped");
        }
    }

    public advanceTime(duration: string): void {
        let seconds = parseTime(duration);
        switch (this.state) {
            case "running":
                this._currentLap += seconds;
                this._total += seconds;
                return;
            default:
                return;
        }
    }
}

function formatTime(seconds: number): string {
    const dispHours = Math.floor(seconds / SECONDS_IN_HOUR);
    const dispMinutes = Math.floor(
        (seconds % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE,
    );
    const dispSeconds = seconds % SECONDS_IN_MINUTE;

    return [dispHours, dispMinutes, dispSeconds]
        .map((n: number) => n.toString().padStart(2, "0"))
        .join(":");
}

function parseTime(time: string): number {
    let [dispHours, dispMinutes, dispSeconds] = time
        .split(":")
        .map((n: string) => Number(n));

    return secondsIn(dispHours, dispMinutes, dispSeconds);
}

function secondsIn(hours?: number, minutes?: number, seconds?: number): number {
    return (
        (hours ?? 0) * SECONDS_IN_HOUR +
        (minutes ?? 0) * SECONDS_IN_MINUTE +
        (seconds ?? 0)
    );
}
