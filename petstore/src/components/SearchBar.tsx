import { TextField, Button, Box } from '@mui/material';
import { useState } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
    onPriceSearch?: (price: number) => void;
}

export const SearchBar = ({ onSearch, onPriceSearch }: SearchBarProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [priceQuery, setPriceQuery] = useState('');

    const handleSearch = () => {
        onSearch(searchQuery);
    };

    const handlePriceSearch = () => {
        if (onPriceSearch && priceQuery) {
            onPriceSearch(parseFloat(priceQuery));
        }
    };

    return (
        <Box sx={{ display: 'flex', gap: 2, mb: 4, width: 1 }}>
            <TextField
                label="Search pets"
                variant="outlined"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                fullWidth
            />
            <Button variant="contained" onClick={handleSearch}>
                Search
            </Button>
            {onPriceSearch && (
                <>
                    <TextField
                        label="Max Price"
                        variant="outlined"
                        type="number"
                        value={priceQuery}
                        onChange={(e) => setPriceQuery(e.target.value)}
                    />
                    <Button variant="contained" onClick={handlePriceSearch}>
                        Filter by Price
                    </Button>
                </>
            )}
        </Box>
    );
};