const actions: string[] = ["wink", "double blink", "close your eyes", "jump"];

export function commands(n: number): string[] {
    if (n > 31) throw new Error("number out of range: 1 <= n <= 31");

    const handshake = actions.filter((_, index) => n & (1 << index));

    return n & 16 ? handshake.reverse() : handshake;
}
