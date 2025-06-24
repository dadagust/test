// src/components/PriceHistogram.tsx
import React, {useMemo} from "react";
import {Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis,} from "recharts";
import {Product} from "../types";

const PriceHistogram: React.FC<{ products: Product[] }> = ({products}) => {
    const data = useMemo(() => {
        const bins = Array.from({length: 10}, (_, i) => ({
            name: `${i * 1000}-${(i + 1) * 1000}`,
            count: 0,
        }));
        products.forEach((p) => {
            const idx = Math.min(9, Math.floor(p.price / 1000));
            bins[idx].count += 1;
        });
        return bins;
    }, [products]);

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <XAxis dataKey="name"/>
                <YAxis allowDecimals={false}/>
                <Tooltip/>
                <Bar dataKey="count"/>
            </BarChart>
        </ResponsiveContainer>
    );
};

export default PriceHistogram;
