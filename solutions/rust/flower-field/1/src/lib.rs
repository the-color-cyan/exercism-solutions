pub struct Garden {
    width: u32,
    height: u32,
    squares: Vec<Square>,
}

impl From<&[&str]> for Garden {
    fn from(garden_array: &[&str]) -> Self {
        let mut squares: Vec<Square> = Vec::new();

        let height = garden_array.len() as u32;
        let width = match garden_array.first() {
            Some(row) => row.len() as u32,
            None => 0,
        };
        assert!(garden_array.iter().all(|row| row.len() as u32 == width));

        garden_array.iter().enumerate().for_each(|(y_i, row)| {
            row.as_bytes()
                .iter()
                .enumerate()
                .for_each(|(x_i, raw_square)| {
                    let mut square = Square::from(std::str::from_utf8(&[*raw_square]).unwrap());
                    square.set_position((x_i as u32, y_i as u32));

                    squares.push(square);
                });
        });

        let mut garden = Self {
            width,
            height,
            squares,
        };

        garden.build_neighbors();

        garden
    }
}

impl Garden {
    fn build_neighbors(&mut self) {
        // +x right | +y down
        #[rustfmt::skip]
        const OFFSETS: [(i32, i32); 8] = [
            (-1, -1),  (0, -1),  (1, -1),
            (-1, 0), /*(0, 0)*/  (1, 0),
            (-1, 1),   (0, 1),   (1, 1),
        ];

        // compute neighbor counts for each Empty square first (general neighbors, non-state dependent)
        let neighbor_counts: Vec<(usize, Option<u32>)> = self
            .squares
            .iter()
            .enumerate()
            .map(|(index, square)| {
                if square.state == SquareState::Flower {
                    return (index, None);
                }

                let (x, y) = square.position.unwrap();
                let neighbor_count = OFFSETS
                    .iter()
                    .filter_map(|(dx, dy)| {
                        let nx = x as i32 + dx;
                        let ny = y as i32 + dy;
                        let pos = (nx as u32, ny as u32);
                        let neighbor = self.squares.iter().find(|s| s.position == Some(pos));

                        // garden boundary conditions
                        if nx >= 0
                            && ny >= 0
                            && nx < self.width as i32
                            && ny < self.height as i32
                            && neighbor.unwrap().state == SquareState::Flower
                        {
                            Some((nx as u32, ny as u32))
                        } else {
                            None
                        }
                    })
                    .count();

                (index, Some(neighbor_count as u32))
            })
            .collect();

        // add counts on a second pass for borrow safety
        for (index, count) in neighbor_counts {
            if let Some(count) = count {
                self.squares[index].add_neighbors(count);
            }
        }
    }

    pub fn board(&self) -> Vec<String> {
        let mut board: Vec<String> = Vec::new();
        for y in 0..self.height {
            let row: String = self
                .squares
                .iter()
                .filter(|square| square.position.unwrap().1 == y)
                .map(|square| match square.state {
                    SquareState::Empty(FlowerNeighbors(count)) if count > 0 => {
                        format!("{count}")
                    }
                    SquareState::Empty(_) => " ".to_string(),
                    SquareState::Flower => "*".to_string(),
                })
                .collect();

            board.push(row);
        }

        board
    }
}

pub struct Square {
    position: Option<(u32, u32)>,
    state: SquareState,
}

impl From<&str> for Square {
    fn from(raw_square: &str) -> Self {
        let state = match raw_square {
            "*" => SquareState::Flower,
            " " => SquareState::Empty(FlowerNeighbors::new(0)),
            _ => panic!("Invalid square value: {raw_square}"),
        };

        Self {
            position: None,
            state,
        }
    }
}

impl Square {
    fn set_position(&mut self, position: (u32, u32)) {
        self.position = Some(position);
    }

    fn add_neighbors(&mut self, n: u32) {
        match &mut self.state {
            SquareState::Empty(neighbors) => neighbors.0 += n,
            _ => panic!("Cannot add neighbor to non-empty square"),
        }
    }
}

#[derive(Eq, PartialEq)]
pub enum SquareState {
    Empty(FlowerNeighbors),
    Flower,
}

#[derive(Eq, PartialEq, PartialOrd, Debug)]
pub struct FlowerNeighbors(u32);

impl FlowerNeighbors {
    pub fn new(neighbor_count: u32) -> Self {
        Self(neighbor_count)
    }
}

pub fn annotate(garden: &[&str]) -> Vec<String> {
    Garden::from(garden).board()
}
