// context/ComparisonContext.tsx
'use client'
import React, { createContext, useState, useContext } from 'react';
import { Product } from '../ProductCard';

interface ComparisonContextType {
    comparisonProducts: Product[];
    addProduct: (product: Product) => void;
    removeProduct: (productId: string) => void;
    clearComparison: () => void;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export const ComparisonProvider = ({ children

}: {
    children: React.ReactNode
}) => {
    const [comparisonProducts, setComparisonProducts] = useState<Product[]>([]);

    const addProduct = (product: Product) => {
        if (comparisonProducts.length < 3 && !comparisonProducts.find((p) => p.id === product.id)) {
            setComparisonProducts((prev) => [...prev, product]);
        }
    };

    const removeProduct = (productId: string) => {
        setComparisonProducts((prev) => prev.filter((p) => p.id !== productId));
    };

    const clearComparison = () => {
        setComparisonProducts([]);
    };

    return (
        <ComparisonContext.Provider value={{ comparisonProducts, addProduct, removeProduct, clearComparison }}>
            {children}
        </ComparisonContext.Provider>
    );
};

export const useComparison = () => {
    const context = useContext(ComparisonContext);
    if (context === undefined) {
        throw new Error('useComparison must be used within a ComparisonProvider');
    }
    return context;
};

export default ComparisonContext;
