// src/components/ProductTable.tsx
import React, {useState} from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import {Product} from "../types";

type Order = "asc" | "desc";
type Keys = keyof Pick<
    Product,
    "title" | "price" | "discount_price" | "rating" | "reviews_count"
>;

const columns: { id: Keys; label: string }[] = [
    {id: "title", label: "Название"},
    {id: "price", label: "Цена"},
    {id: "discount_price", label: "Цена со скидкой"},
    {id: "rating", label: "Рейтинг"},
    {id: "reviews_count", label: "Отзывы"},
];

const ProductTable: React.FC<{ products: Product[] }> = ({products}) => {
    const [order, setOrder] = useState<Order>("asc");
    const [orderBy, setOrderBy] = useState<Keys>("title");

    const handleSort = (property: Keys) => {
        setOrder(orderBy === property && order === "asc" ? "desc" : "asc");
        setOrderBy(property);
    };

    const sorted = [...products].sort((a, b) => {
        const aVal = (a[orderBy] ?? 0) as string | number;
        const bVal = (b[orderBy] ?? 0) as string | number;

        let cmp: number;
        if (typeof aVal === "string" && typeof bVal === "string") {
            cmp = aVal.localeCompare(bVal);
        } else {
            cmp = (aVal as number) - (bVal as number);
        }

        return order === "asc" ? cmp : -cmp;
    });

    return (
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        {columns.map((col) => (
                            <TableCell key={col.id}>
                                <TableSortLabel
                                    active={orderBy === col.id}
                                    direction={orderBy === col.id ? order : "asc"}
                                    onClick={() => handleSort(col.id)}
                                >
                                    {col.label}
                                </TableSortLabel>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {sorted.map((p) => {
                        const priceNum =
                            typeof p.price === "string" ? parseFloat(p.price) : p.price;
                        const discNum =
                            p.discount_price != null
                                ? typeof p.discount_price === "string"
                                    ? parseFloat(p.discount_price)
                                    : p.discount_price
                                : null;

                        return (
                            <TableRow key={p.id}>
                                <TableCell>{p.title}</TableCell>
                                <TableCell>{priceNum.toFixed(2)}</TableCell>
                                <TableCell>
                                    {discNum != null ? discNum.toFixed(2) : "—"}
                                </TableCell>
                                <TableCell>{p.rating}</TableCell>
                                <TableCell>{p.reviews_count}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ProductTable;
