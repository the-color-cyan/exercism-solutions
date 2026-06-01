// sure why not
class Message {
  constructor(
    readonly message: string,
    readonly question = this.isQuestion(message),
    readonly yelling = this.isYelling(message),
  ) {
    this.message = this.message.trim();
  }

  private isQuestion(message: string): boolean {
    return /\?$/.test(message.trim());
  }

  private isYelling(message: string): boolean {
    return /[A-Z]/.test(message) && /^[^a-z]*$/.test(message);
  }
}

export function hey(message: string): string {
  const msg = new Message(message);

  if (msg.message == "") {
    return "Fine. Be that way!";
  }
  if (msg.question && msg.yelling) {
    return "Calm down, I know what I'm doing!";
  }
  if (msg.question) {
    return "Sure.";
  }
  if (msg.yelling) {
    return "Whoa, chill out!";
  }

  return "Whatever.";
}
