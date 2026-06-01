pub fn is_armstrong_number(n: u32) -> bool {
  n == arm_fn(n)
}

pub fn arm_fn(n: u32) -> u32 {
  if n < 9 {
    return n;
  };

  let k: u32 = n.ilog10() + 1;
  let mut sum: u32 = 0;

  for i in 0..k {
    let di: u32 = (n.rem_euclid(10u32.pow(i + 1)) - n.rem_euclid(10u32.pow(i))) / 10u32.pow(i);
    sum += di.pow(k);
  }

  sum
}
