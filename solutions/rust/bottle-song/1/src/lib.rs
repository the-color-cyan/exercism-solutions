pub fn recite(start_bottles: u32, take_down: u32) -> String {
  let num_names: [&str; 11] = [
    "No", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
  ];
  let end_bottles: u32 = start_bottles - take_down;
  let mut song: String = String::new();
  let s = |bottle: u32| -> &str { if bottle == 1 { return "" } else { return "s" } };

  for bottle in ((end_bottles + 1)..(start_bottles + 1)).rev() {
    for _ in 0..2 {
      song.push_str(&format!(
        "{} green bottle{} hanging on the wall,\n",
        num_names[bottle as usize],
        s(bottle)
      ));
    }
    song.push_str("And if one green bottle should accidentally fall,\n");
    song.push_str(&format!(
      "There'll be {} green bottle{} hanging on the wall.\n\n",
      num_names[(bottle - 1) as usize].to_lowercase(),
      s(bottle - 1)
    ));
  }

  return song;
}
