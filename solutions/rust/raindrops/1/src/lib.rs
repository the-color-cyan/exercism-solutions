use std::fmt::Write;

pub fn raindrops(n: u32) -> String {
    let mut out = String::new();

    if n % 3 == 0 {
        write!(out, "Pling").unwrap();
    }

    if n % 5 == 0 {
        write!(out, "Plang").unwrap();
    }

    if n % 7 == 0 {
        write!(out, "Plong").unwrap();
    }

    if out.is_empty() {
        write!(out, "{n}").unwrap();
    }

    out
}
