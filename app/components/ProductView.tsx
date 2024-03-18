import React from "react";
import BuyingOptions from "@components/BuyingOptions";
import { formatPrice } from "../utils/helper";
import ProductImageGallery from "@components/ProductImageGallery";
import Rating from "./Rating";
import { AffiliateEntry } from "../types";

interface Props {
    title: string;
    description: string;
    images: string[];
    points?: string[];
    price: { base: number; discounted: number };
    sale: number;
    rating?: number;
    outOfStock: boolean;
    isWishlist?: boolean;
    affiliates: AffiliateEntry[];
    youtubeLink?: string;
}



export default function ProductView({
    description,
    images,
    title,
    points,
    price,
    sale,
    rating,
    outOfStock,
    isWishlist,
    affiliates,
    youtubeLink,
}: Props) {

    console.log(youtubeLink, "youtubeLink")
    return (
        <div className="flex lg:flex-row flex-col md:gap-4 gap-2">
            <div className="flex-1 lg:self-start self-center ">
                {/* Product Image Slider */}
                <ProductImageGallery images={images} />
            </div>

            <div className="flex-1 md:space-y-4 space-y-2">
                <h1 className="md:text-3xl text-xl font-semibold">{title}</h1>
                <p>{description}</p>

                <div className="pl-4 space-y-2">
                    {points?.map((point, index) => {
                        return <li key={index}>{point}</li>;
                    })}
                </div>

                {
                    rating && <Rating
                        value={rating} />
                }

                <div className="flex items-center space-x-2 mb-2">
                    <p className="line-through text-xl">{formatPrice(price.base)}</p>
                    <p className="font-semibold text-xl">
                        {formatPrice(price.discounted)}
                    </p>
                    <p className="font-bold uppercase whitespace-nowrap select-none bg-red-500 text-white py-1.5 px-3 text-xs rounded-lg">
                        {`${sale}% off`}
                    </p>
                </div>

                <div className="flex py-4">
                    {
                        outOfStock ? <p className="text-red-500 uppercase">Out of Stock</p> : <BuyingOptions
                            wishlist={isWishlist}
                            youtubeLink={youtubeLink}
                            title={title}
                            description={description}
                            rating={rating}
                            price={price.discounted}
                            bulletPoints={points}
                            buyLink={affiliates[0].link}

                        />

                    }
                </div>
                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Where to Buy</h3>
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="border-b-2 p-2">Site</th>
                                <th className="border-b-2 p-2">Price</th>
                                <th className="border-b-2 p-2">Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {affiliates.map((affiliate, index) => (
                                <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                                    <td className="p-2 border-b">{affiliate.site}</td>
                                    <td className="p-2 border-b">{formatPrice(affiliate.price)}</td>
                                    <td className="p-2 border-b">
                                        <a
                                            href={affiliate.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:text-blue-600"
                                        >
                                            Buy Now
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}
