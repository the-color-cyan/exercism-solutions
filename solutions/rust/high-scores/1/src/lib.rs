#[derive(Debug)]
pub struct HighScores {
    scores_list: Vec<u32>,
}

impl HighScores {
    pub fn new(scores: &[u32]) -> Self {
        let scores_list = Vec::from(scores);
        HighScores { scores_list }
    }

    pub fn scores(&self) -> &[u32] {
        self.scores_list.as_slice()
    }

    pub fn latest(&self) -> Option<u32> {
        self.scores_list.last().copied()
    }

    pub fn personal_best(&self) -> Option<u32> {
        self.scores_list.iter().max().copied()
    }

    pub fn personal_top_three(&self) -> Vec<u32> {
        let mut _scores_list = self.scores_list.clone();
        _scores_list.sort();
        _scores_list.iter().rev().take(3).copied().collect()
    }
}
