#[derive(PartialEq)]
enum MessageTone {
    Question,
    Yelling,
    YellingQuestion,
    Silence,
    Default,
}

struct Message<'a> {
    text: &'a str,
    tone: MessageTone,
}

impl<'a> Message<'a> {
    fn new(text: &'a str) -> Self {
        let tone = Self::classify(text);
        Self { text, tone }
    }

    fn classify(text: &str) -> MessageTone {
        let msg = text.trim();
        let letters: Vec<char> = msg.trim().chars().filter(|c| c.is_alphabetic()).collect();

        let silence: bool = msg.is_empty();
        let question: bool = msg.ends_with("?");
        let yelling: bool = !letters.is_empty() && letters.iter().all(|c| c.is_uppercase());

        return match (silence, yelling, question) {
            (true, _, _) => MessageTone::Silence,
            (_, true, true) => MessageTone::YellingQuestion,
            (_, true, false) => MessageTone::Yelling,
            (_, false, true) => MessageTone::Question,
            _ => MessageTone::Default,
        };
    }
}

pub fn reply(message: &str) -> &str {
    let msg = Message::new(message);

    match msg.tone {
        MessageTone::Silence => "Fine. Be that way!",
        MessageTone::YellingQuestion => "Calm down, I know what I'm doing!",
        MessageTone::Yelling => "Whoa, chill out!",
        MessageTone::Question => "Sure.",
        _ => "Whatever.",
    }
}
