// use crate::{collections::stacks::Stack, errors::ErrorKind};
use crate::errors::ErrorKind;

const PAGE_SIZE: usize = 4096; // 4 Kbytes


// TODO: Derive from Stack

pub struct Vector {
    memory: [u8; PAGE_SIZE],
    length: usize,
    capacity: usize,
}


impl Default for Vector {
    fn default() -> Self {
        Self::new()
    }
}

impl Vector {
    pub fn new() -> Self {
        Self {
            memory: [0; PAGE_SIZE],
            length: 0,
            capacity: PAGE_SIZE,
        }
    }

    pub fn len(&self) -> usize {
        self.length
    }

    pub fn cap(&self) -> usize {
        self.capacity
    }

    pub fn is_empty(&self) -> bool {
        self.length == 0
    }

    pub fn push(mut self, byte: u8) -> Result<usize, ErrorKind> {
        if self.len() < self.cap() {
            self.memory[self.len()] = byte;
            self.length += 1;
            Ok(self.len())
        } else {
            Err(ErrorKind::Overflow)
        }
    }

    pub fn pop(&mut self) -> Option<u8> {
        if !self.is_empty() {
            let last_idx = self.len() - 1;
            let byte = self.memory[last_idx];
            self.memory[last_idx] = 0;
            self.length -= 1;
            Some(byte)
        } else {
            None
        }
    }

    pub fn get(&self, idx: usize) -> Result<u8, ErrorKind> {
        if idx < self.len() {
            let byte = *self.memory.get(idx).unwrap();
            Ok(byte)
        } else {
            Err(ErrorKind::Overflow)
        }
    }

    pub fn delete(&mut self, idx: usize) -> Result<usize, ErrorKind> {
        if !self.is_empty() {
            let last_idx = self.len() - 1;
            if idx == last_idx {
                self.pop();
            } else {
                for i in idx..(last_idx) {
                    let next_idx = i + 1;
                    self.memory[i] = self.memory[next_idx];
                    self.memory[next_idx] = 0;
                }
                self.length -= 1;
            }
            Ok(self.len())
        } else {
            Err(ErrorKind::NoData)
        }
    }

    // pub fn get_bulk(&self, idx: usize, offset: usize) -> Result<Vector, ErrorKind> {
    //     if (idx + offset) < self.len() {
    //         let vector = Vector::new();
    //         for i in idx..=offset {
    //             vector.push(*self.memory.get(i).unwrap());
    //         }
    //         Ok(vector)
    //     } else {
    //         Err(ErrorKind::Overflow)
    //     }
    // }

    // pub fn drop(self) {
    //     let _ = self.memory;
    // }
}
