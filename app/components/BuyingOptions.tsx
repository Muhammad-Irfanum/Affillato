"use client";

import React, { useState, useTransition } from "react";
import { Button } from "@material-tailwind/react";
import CartCountUpdater from "@components/CartCountUpdater";
import { useParams, useRouter } from "next/navigation";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import Wishlist from "../ui/Wishlist";

import YouTubeModal from "./YouTubeModal";


interface Props {
    wishlist?: boolean;
    youtubeLink?: string;
    title?: string;
    description?: string;
    rating?: number;
    bulletPoints?: string[];
    price?: number;
    buyLink?: string;

}

export default function BuyingOptions({ wishlist, youtubeLink,
    title,
    description,
    price,
    bulletPoints,
    rating,
    buyLink
}: Props) {
    const [showYouTubeModal, setShowYouTubeModal] = useState(false);

    const openYouTubeModal = () => setShowYouTubeModal(true);
    const closeYouTubeModal = () => setShowYouTubeModal(false);
    const [quantity, setQuantity] = useState(1);
    const [isPending, startTransition] = useTransition();
    const { loggedIn } = useAuth()
    const { product } = useParams()
    const router = useRouter()
    const productId = product[1]

    console.log("buyLink", buyLink)


    const handleIncrement = () => {
        setQuantity((prevCount) => prevCount + 1);
    };

    const handleDecrement = () => {
        if (quantity === 0) return;
        setQuantity((prevCount) => prevCount - 1);
    };

    const addToCart = async () => {
        if (!productId) return
        if (!loggedIn) return router.push('/auth/signin')
        const res = await fetch("/api/product/cart", {
            method: "POST",
            body: JSON.stringify({ productId, quantity }),
        });

        const { error } = await res.json();

        if (!res.ok && error) toast.error(error);
        if (res.ok) {
            toast.success("Product added to cart");
            router.refresh();
        }
    };


    const updateWishlist = async () => {
        if (!productId) return
        if (!loggedIn) return router.push('/auth/signin')
        const res = await fetch("/api/product/wishlist", {
            method: "POST",
            body: JSON.stringify({ productId }),
        });

        const { error } = await res.json();

        if (!res.ok && error) toast.error(error);
        if (res.ok) {
            toast.success("Wishlist updated");
            router.refresh();
        }




    };

    return (
        <div className="flex items-center space-x-2">


            <Button className="rounded-full px-12 text-lg bg-[#d0b48d]"
                onClick={() => {
                    // Redirect to google.com
                    // Open the affiliate link in a new tab if no buy link is provided go to google.com
                    window.open(buyLink || "https://google.com", "_blank")
                }}
            >
                Buy Now
            </Button>
            <Button
                className="rounded-full px-12 text-lg bg-red-500 capitalize"
                onClick={openYouTubeModal}
            >
                YouTube
            </Button>
            {youtubeLink && (
                <YouTubeModal
                    isOpen={showYouTubeModal}
                    onClose={closeYouTubeModal}
                    youtubeLink={youtubeLink}
                    title={title}
                    description={description}
                    rating={rating}
                    price={price}
                    bulletPoints={bulletPoints}
                />
            )}


            <Button variant="text"
                disabled={isPending}
                onClick={() => {
                    startTransition(async () => {
                        await updateWishlist()
                    });
                }}
            >
                <Wishlist isActive={wishlist} />
            </Button>
        </div>
    );
}
