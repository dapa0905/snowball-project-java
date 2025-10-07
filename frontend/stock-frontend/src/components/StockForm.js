import React from 'react';
import { TextField, Button, Container, Box } from '@mui/material';

function SearchForm({ keyword, setKeyword, onSearch }) {
  return (
    <Container sx={{ mt: 4 }}>
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          onSearch();
        }}
        display="flex"
        gap={2}
      >
        <TextField
          fullWidth
          label="티커 또는 회사명 입력"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button variant="contained" type="submit">
          검색
        </Button>
      </Box>
    </Container>
  );
}

export default SearchForm;
