pub fn collatz(n: u64) -> Option<u64> {
    let mut n = n;
    let mut steps = 0;

    if n == 0 {
        return None;
    }

    while n != 1 {
        match n.is_multiple_of(2) {
            true => {
                n /= 2;
                steps += 1;
            }
            false => {
                n = n * 3 + 1;
                steps += 1;
            }
        }
    }

    Some(steps)
}
