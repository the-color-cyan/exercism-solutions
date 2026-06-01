export function hey(message: string): string {
  if (isSilence(message)) {
    return "Fine. Be that way!";
  }
  if (isQuestion(message) && isAllCaps(message)) {
    return "Calm down, I know what I'm doing!";
  }
  if (isQuestion(message)) {
    return "Sure.";
  }
  if (isAllCaps(message)) {
    return "Whoa, chill out!";
  }

  return "Whatever.";
}

function isQuestion(message: string): boolean {
  const trimmed = message.trim();
  return trimmed.trim()[trimmed.length - 1] == "?";
}

function isAllCaps(message: string): boolean {
  if (hasLetters(message)) {
    return message.toUpperCase() == message;
  }
  return false;
}

function isSilence(message: string): boolean {
  return message.trim() == "";
}

function hasLetters(message: string): boolean {
  return /[a-zA-Z]/.test(message);
}
