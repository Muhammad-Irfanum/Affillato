'use client'
import React, { useContext, useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
    CardFooter,
    Chip,
} from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import truncate from "truncate";
import { formatPrice } from "../utils/helper";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import Rating from "./Rating";
import ProductComparisonModal from "./ProductComparisonModal";
import ComparisonContext from "./context/ComparisonContext";

export interface Product {
    id: string;
    title: string;
    description: string;
    category: string;
    thumbnail: string;
    sale: number;
    rating?: number;
    price: {
        base: number;
        discounted: number;
    };
    affiliates: { site: string; link: string; price: number }[];
};

interface Props {
    product: Product;

}

export default function ProductCard({ product }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { addProduct } = useContext(ComparisonContext) as any;

    const handleCompareClick = () => {
        addProduct(product);
        setIsModalOpen(true);
    };

    const { loggedIn } = useAuth();
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleCheckout = () => {
        const affiliateLink = product.affiliates[0]?.link || "https://google.com";
        window.location.href = affiliateLink;
    };

    return (
        <Card className="w-full">
            <Link className="w-full" href={`/${product.title}/${product.id}`}>
                <CardHeader
                    shadow={false}
                    floated={false}
                    className="relative w-full aspect-square m-0"
                >
                    <Image
                        className="object-contain"
                        src={product.thumbnail}
                        alt={product.title}
                        fill
                    />
                    <div className="absolute right-0 p-2 ">
                        <Chip color="red" value={`${product.sale}% off`} />
                    </div>
                </CardHeader>
                <CardBody>
                    <div className="mb-2">
                        <h3 className="line-clamp-1 font-medium text-blue-gray-800">
                            {truncate(product.title, 50)}
                        </h3>
                        <div className="flex justify-end">
                            {product.rating && (
                                <Rating value={parseFloat(product.rating.toFixed(1))} />
                            )}
                        </div>
                    </div>
                    <div className="flex justify-end items-center space-x-2 mb-2">
                        <Typography
                            color="blue-gray"
                            className="font-medium line-through"
                        >
                            {formatPrice(product.price.base)}
                        </Typography>
                        <Typography color="blue-gray" className="font-medium">
                            {formatPrice(product.price.discounted)}
                        </Typography>
                    </div>
                    <p className="font-normal text-sm opacity-75 line-clamp-3">
                        {product.description}
                    </p>
                </CardBody>
            </Link>
            <CardFooter className="pt-0 space-y-4">
                <Button
                    disabled={isPending}
                    onClick={handleCompareClick}
                    ripple={false}
                    fullWidth={true}
                    className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:shadow-none hover:scale-105 focus:shadow-none focus:scale-105 active:scale-100"
                >
                    Compare
                </Button>
                <Button
                    onClick={handleCheckout}
                    ripple={false}
                    fullWidth={true}
                    className=" bg-[#d0b48d] text-white shadow-none hover:shadow-none hover:scale-105 focus:shadow-none focus:scale-105 active:scale-100"
                >
                    Buy Now
                </Button>
            </CardFooter>
            <ProductComparisonModal
                product={product}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </Card>
    );
}
