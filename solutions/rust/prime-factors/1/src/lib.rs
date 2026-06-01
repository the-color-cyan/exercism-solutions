pub fn factors(n: u64) -> Vec<u64> {
    let mut n = n;
    let mut factorization: Vec<u64> = Vec::new();

    let mut d: u64 = 2;
    while d * d <= n {
        while n % d == 0 {
            factorization.push(d);
            n /= d;
        }

        d += 1;
    }

    if n > 1 {
        factorization.push(n);
    }

    factorization
}
