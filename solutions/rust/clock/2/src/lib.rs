use std::fmt;

const HOUR: u32 = 60; // in minutes
const DAY: u32 = 60 * 24; // in minutes

#[derive(PartialEq, Eq, Debug)]
pub struct Clock {
  total_minutes: u32, // from midnight
}

impl fmt::Display for Clock {
  fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
    write!(f, "{:02}:{:02}", self.hours(), self.minutes())
  }
}

impl Clock {
  pub fn new(hours: i32, minutes: i32) -> Self {
    Self {
      total_minutes: Self::get_total(hours, minutes),
    }
  }

  pub fn hours(&self) -> u32 {
    self.total_minutes / 60
  }
  pub fn minutes(&self) -> u32 {
    self.total_minutes.rem_euclid(60)
  }

  pub fn add_minutes(self, minutes: i32) -> Self {
    Self::new(0, (self.total_minutes as i32) + minutes)
  }

  pub fn get_total(hours: i32, minutes: i32) -> u32 {
    (hours * (HOUR as i32) + minutes).rem_euclid(DAY as i32) as u32
  }
}
