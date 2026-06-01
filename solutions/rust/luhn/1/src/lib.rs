/// Check a Luhn checksum.
pub fn is_valid(code: &str) -> bool {
    let code = &code.split_whitespace().collect::<String>()[..];
    if code.len() <= 1 {
        return false;
    }

    let mut check: Vec<u32> = Vec::new();
    let mut i = 1;

    for c in code.chars().rev() {
        let mut n = match c.to_digit(10) {
            Some(n) => n,
            None => return false,
        };

        if i % 2 == 0 {
            match n * 2 > 9 {
                true => n = n * 2 - 9,
                false => n *= 2,
            }
        }

        check.push(n);
        i += 1;
    }

    let sum: u32 = check.iter().sum();

    sum % 10 == 0
}
