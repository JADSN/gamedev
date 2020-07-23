const PAGE_SIZE: usize = 4096; // 4 Kbytes

pub struct Box {
    memory: [u8; PAGE_SIZE],
    length: usize,
    capacity: usize,
}

impl Default for Box {
    fn default() -> Self {
        Self::new()
    }
}

impl Box {
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

    pub fn is_empty(&self) -> bool {
        self.length == 0
    }

    pub fn capacity(&self) -> usize {
        self.capacity
    }

    pub fn drop(self) {
        let _ = self.memory;
    }
}
