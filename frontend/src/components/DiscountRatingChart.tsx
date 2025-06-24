// src/components/DiscountRatingChart.tsx
import React, {useMemo} from "react";
import {ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis,} from "recharts";
import {Product} from "../types";

const DiscountRatingChart: React.FC<{ products: Product[] }> = ({products}) => {
    const data = useMemo(
        () =>
            products.map((p) => ({
                discount: p.price - (p.discount_price ?? p.price),
                rating: p.rating,
            })),
        [products]
    );

    return (
        <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
                <XAxis type="number" dataKey="discount" name="Скидка"/>
                <YAxis type="number" dataKey="rating" name="Рейтинг" domain={[0, 5]}/>
                <Tooltip cursor={{strokeDasharray: "3 3"}}/>
                <Scatter data={data}/>
            </ScatterChart>
        </ResponsiveContainer>
    );
};

export default DiscountRatingChart;
