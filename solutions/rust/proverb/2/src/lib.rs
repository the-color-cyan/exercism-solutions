use std::fmt::Write;

pub fn build_proverb(list: &[&str]) -> String {
    if list.is_empty() {
        return "".to_string();
    };

    let first_word = list.first().unwrap();
    let line_words = list.windows(2);
    let mut proverb = String::new();

    for words in line_words {
        writeln!(&mut proverb, "For want of a {} the {} was lost.", words.first().unwrap(), words.last().unwrap()).unwrap();
    }

    write!(&mut proverb, "And all for the want of a {first_word}.").unwrap();

proverb
}
