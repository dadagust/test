// src/components/Filters.tsx
import React from "react";
import {Box, Slider, TextField, Typography} from "@mui/material";

interface Props {
    filters: { price: [number, number]; rating: number; reviews: number };
    setFilters: (v: Props["filters"]) => void;
}

const Filters: React.FC<Props> = ({filters, setFilters}) => (
    <Box className="frcc" gap={3}>
        <Box sx={{width: 250}}>
            <Typography>Цена</Typography>
            <Slider
                value={filters.price}
                onChange={(_, v) => setFilters({...filters, price: v as [number, number]})}
                valueLabelDisplay="auto"
                min={0}
                max={100000}
            />
        </Box>
        <TextField
            label="Мин. рейтинг"
            type="number"
            inputProps={{step: 0.1, min: 0, max: 5}}
            value={filters.rating}
            onChange={(e) => setFilters({...filters, rating: parseFloat(e.target.value) || 0})}
        />
        <TextField
            label="Мин. отзывов"
            type="number"
            inputProps={{min: 0}}
            value={filters.reviews}
            onChange={(e) => setFilters({...filters, reviews: parseInt(e.target.value) || 0})}
        />
    </Box>
);

export default Filters;
