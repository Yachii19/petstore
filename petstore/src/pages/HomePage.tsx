import { useEffect, useState } from 'react';
import { PetList } from '../components/PetList';
import { SearchBar } from '../components/SearchBar';
import { getAllPets, searchPets, getPetsByPrice, deletePet } from '../services/petService';
import { Pet } from '../types/Pet';
import { Box, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom'

export const HomePage = () => {
    const [pets, setPets] = useState<Pet[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const data = await getAllPets();
                setPets(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching pets:', error);
                setLoading(false);
            }
        };

        fetchPets();
    }, []);

    const handleSearch = async (query: string) => {
        try {
            const data = await searchPets(query);
            setPets(data);
        } catch (error) {
            console.error('Error searching pets:', error);
        }
    };

    const handlePriceSearch = async (price: number) => {
        try {
            const data = await getPetsByPrice(price);
            setPets(data);
        } catch (error) {
            console.error('Error filtering by price:', error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deletePet(id);
            setPets(pets.filter(pet => pet.id !== id));
        } catch (error) {
            console.error('Error deleting pet:', error);
        }
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4 }}>
                Pet Store
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: "column", justifyContent: 'space-between', alignItems: 'start', mb: 4 }}>
                <SearchBar onSearch={handleSearch} onPriceSearch={handlePriceSearch} />
                <Button component={Link} to="/add" variant="contained" color="primary">
                    Add New Pet
                </Button>
            </Box>
            {loading ? (
                <Typography>Loading pets...</Typography>
            ) : pets.length === 0 ? (
                <Typography>No pets found</Typography>
            ) : (
                <PetList pets={pets} onDelete={handleDelete} />
            )}
        </Container>
    );
};