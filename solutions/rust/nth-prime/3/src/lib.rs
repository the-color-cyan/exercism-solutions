// will come back to overengineer this one more later
pub fn nth(n: u32) -> u32 {
    // very cool upper bound for nth prime 👍
    let limit = if n + 1 >= 13 {
        let m = n as f64;
        let ln_m = m.ln();
        let lnln_m = m.ln().ln();
        (m * (ln_m + lnln_m - 1f64 + 1.8f64 * lnln_m / ln_m)) as u64
    } else {
        // not as cool but only for smol 👎
        2u64.pow(n + 1)
    };

    let mut arr: Vec<bool> = vec![false; (limit + 1) as usize];

    // hard coded base cases for 2 & 3
    if limit >= 2 {
        arr[2] = true;
    }
    if limit >= 3 {
        arr[3] = true;
    }

    let sqrt_limit = (limit as f32).sqrt().ceil() as u64;

    for i in 1..=sqrt_limit {
        for j in 1..=sqrt_limit {
            // condition 1
            let c: u64 = (4 * i * i) + (j * j);
            if c <= limit && (c % 12 == 1 || c % 12 == 5) {
                arr[c as usize] = !arr[c as usize];
            }

            // condition 2
            let c: u64 = (3 * i * i) + (j * j);
            if c <= limit && c % 12 == 7 {
                arr[c as usize] = !arr[c as usize];
            }

            // condition 3
            if i > j {
                let c: u64 = (3 * i * i) - (j * j);
                if c <= limit && c % 12 == 11 {
                    arr[c as usize] = !arr[c as usize];
                }
            }
        }
    }

    // asplode all multiples of squares
    for i in 5..=sqrt_limit {
        if !arr[i as usize] {
            continue;
        };
        let mut j = i * i;
        while j <= limit {
            arr[j as usize] = false;
            j += i * i;
        }
    }

    let mut primes: Vec<u32> = Vec::new();
    for i in 2..=limit {
        if arr[i as usize] {
            primes.push(i as u32);
        }
    }

    primes[n as usize]
}
