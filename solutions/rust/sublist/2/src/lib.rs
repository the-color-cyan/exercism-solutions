use std::cmp::PartialEq;

#[derive(Debug, PartialEq, Eq)]
pub enum Comparison {
    Equal,
    Sublist,
    Superlist,
    Unequal,
}

pub fn sublist<T: PartialEq>(first_list: &[T], second_list: &[T]) -> Comparison {
    match (first_list.len(), second_list.len()) {
        (0, 0) => Comparison::Equal,
        (0, _) => Comparison::Sublist,
        (_, 0) => Comparison::Superlist,
        (first_size, second_size) if first_size < second_size => {
            if is_sublist(first_list, second_list) {
                Comparison::Sublist
            } else {
                Comparison::Unequal
            }
        }
        (first_size, second_size) if first_size > second_size => {
            if is_sublist(second_list, first_list) {
                Comparison::Superlist
            } else {
                Comparison::Unequal
            }
        }
        (first_size, second_size) if first_size == second_size => {
            if first_list == second_list {
                Comparison::Equal
            } else {
                Comparison::Unequal
            }
        }
        _ => Comparison::Unequal,
    }
}

fn is_sublist<T: PartialEq>(sub: &[T], dom: &[T]) -> bool {
    sub.is_empty() || dom.windows(sub.len()).any(|win| win == sub)
}
