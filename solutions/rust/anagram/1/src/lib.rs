use std::collections::HashSet;

pub fn anagrams_for<'a>(word: &str, possible_anagrams: &[&'a str]) -> HashSet<&'a str> {
    let mut anagrams: HashSet<&'a str> = HashSet::new();

    possible_anagrams.iter().for_each(|candidate| {
        if !is_same_word(word, candidate) && chars_match(word, candidate) {
            anagrams.insert(candidate);
        }
    });

    anagrams
}

fn is_same_word(word: &str, candidate: &&str) -> bool {
    word.to_lowercase() == candidate.to_lowercase()
}

fn chars_match(word: &str, candidate: &&str) -> bool {
    sort_word(word) == sort_word(candidate)
}

fn sort_word(word: &str) -> Vec<char> {
    let mut word_sorted: Vec<char> = word.to_lowercase().chars().collect();

    word_sorted.sort();
    word_sorted
}
