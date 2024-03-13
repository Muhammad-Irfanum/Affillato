// ProductComparisonModal.tsx
"use client"
import React, { useContext } from 'react';
import ComparisonContext from './context/ComparisonContext';
import { Product } from './ProductCard'; // Import the Product type
import Image from 'next/image';

interface Props {
    product: Product;
    isOpen: boolean;
    onClose: () => void;
}

const ProductComparisonModal: React.FC<Props> = ({ product, isOpen, onClose }) => {
    const { comparisonProducts, addProduct, removeProduct, clearComparison } = useContext(ComparisonContext) as any;

    const handleAddMore = () => {
        addProduct(product);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex z-50 justify-center items-center">
            <div className="modal-content flex flex-col justify-between bg-white p-4 rounded-lg shadow-lg overflow-auto max-w-[90%] max-h-[90%] w-[90%] h-[90%]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full">
                    {comparisonProducts.map((p: Product) => (
                        <div key={p.id} className="border p-2 rounded flex flex-col">
                            <div className="flex justify-center mb-2">
                                <Image
                                    src={p.thumbnail}
                                    alt={p.title}
                                    width={300}
                                    height={300}
                                    objectFit="contain"
                                />
                            </div>
                            <div className="flex-1">
                                <table className="table-fixed w-full">
                                    <tbody>
                                        <tr>
                                            <th className="text-left p-1 w-1/3">Title:</th>
                                            <td className="text-right p-1">{p.title}</td>
                                        </tr>
                                        <tr>
                                            <th className="text-left p-1">Description:</th>
                                            <td className="text-right p-1">{p.description}</td>
                                        </tr>
                                        <tr>
                                            <th className="text-left p-1">Price:</th>
                                            <td className="text-right p-1">${p.price.discounted}</td>
                                        </tr>
                                        {/* Add more rows as needed */}
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex justify-end mt-2">
                                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={() => removeProduct(p.id)}>Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="modal-actions flex justify-end space-x-2 mt-4">
                    <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" onClick={handleAddMore} disabled={comparisonProducts.length >= 3}>
                        Add More
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={onClose}>Close</button>
                    <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded" onClick={clearComparison}>Clear Comparison</button>
                </div>
            </div>
        </div>
    );
};

export default ProductComparisonModal;
