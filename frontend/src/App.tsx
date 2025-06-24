// src/App.tsx
import React, {useEffect, useState} from "react";
import { GridLegacy as Grid } from "@mui/material";   // LegacyGrid
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {api} from "./api";
import {Product} from "./types";
import Filters from "./components/Filters";
import ProductTable from "./components/ProductTable";
import PriceHistogram from "./components/PriceHistogram";
import DiscountRatingChart from "./components/DiscountRatingChart";

interface FilterState {
    price: [number, number];
    rating: number;
    reviews: number;
}

const App: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filters, setFilters] = useState<FilterState>({
        price: [0, 100000],
        rating: 0,
        reviews: 0,
    });

    useEffect(() => {
        const fetchProducts = async () => {
            const params = {
                min_price: filters.price[0],
                max_price: filters.price[1],
                min_rating: filters.rating,
                min_reviews: filters.reviews,
            };
            const {data} = await api.get<Product[]>("products/", {params});
            setProducts(data);
        };
        fetchProducts();
    }, [filters]);

    return (
        <Container maxWidth="lg" sx={{mt: 4}}>
            <Typography variant="h4" gutterBottom>
                Wildberries Analytics
            </Typography>
            <Filters filters={filters} setFilters={setFilters}/>
            <Grid container spacing={4} sx={{mt: 2}}>
                <Grid item xs={12}>
                    <ProductTable products={products}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <PriceHistogram products={products}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <DiscountRatingChart products={products}/>
                </Grid>
            </Grid>
        </Container>
    );
};

export default App;
