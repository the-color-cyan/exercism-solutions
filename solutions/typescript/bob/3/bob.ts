type MessageKind =
  | "silence"
  | "yelled-question"
  | "question"
  | "yelling"
  | "default";

function classify(message: string): MessageKind {
  const trimmed = message.trim();

  if (trimmed == "") return "silence";
  const question = trimmed.endsWith("?");
  const yelling = /[A-Z]/.test(message) && /^[^a-z]*$/.test(message);

  if (question && yelling) return "yelled-question";
  if (question) return "question";
  if (yelling) return "yelling";

  return "default";
}

export function hey(message: string): string {
  switch (classify(message)) {
    case "silence":
      return "Fine. Be that way!";
    case "yelled-question":
      return "Calm down, I know what I'm doing!";
    case "question":
      return "Sure.";
    case "yelling":
      return "Whoa, chill out!";
    default:
      return "Whatever.";
  }
}
