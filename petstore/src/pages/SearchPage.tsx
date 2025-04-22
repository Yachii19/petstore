import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { searchPets, getPetsByPrice } from '../services/petService';
import { PetList } from '../components/PetList';
import { SearchBar } from '../components/SearchBar';
import { Typography, Container } from '@mui/material';

export const SearchPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [pets, setPets] = useState([]);
    const query = new URLSearchParams(location.search).get('q');
    const price = new URLSearchParams(location.search).get('price');

    useEffect(() => {
        const fetchResults = async () => {
            try {
                if (query) {
                    const data = await searchPets(query);
                    setPets(data);
                } else if (price) {
                    const data = await getPetsByPrice(parseFloat(price));
                    setPets(data);
                }
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        fetchResults();
    }, [query, price]);

    const handleSearch = (query: string) => {
        navigate(`/search?q=${query}`);
    };

    const handlePriceSearch = (price: number) => {
        navigate(`/search?price=${price}`);
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4 }}>
                Search Results
            </Typography>
            <SearchBar onSearch={handleSearch} onPriceSearch={handlePriceSearch} />
            {pets.length === 0 ? (
                <Typography>No pets found matching your criteria</Typography>
            ) : (
                <PetList pets={pets} />
            )}
        </Container>
    );
};