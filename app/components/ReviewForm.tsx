"use client";

import { Button, Rating } from "@material-tailwind/react";
import { StarIcon as RatedIcon } from "@heroicons/react/24/solid";
import { StarIcon as UnratedIcon } from "@heroicons/react/24/outline";
import React, { useState, FormEventHandler, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface Props {
    productId: string;
    initialValue?: { rating: number; comment: string };
}

export default function ReviewForm({ productId, initialValue }: Props) {
    const [isPending, setIsPending] = useState(false);
    const [review, setReview] = useState({
        rating: 0,
        comment: "",
    });

    const router = useRouter()
    const submitReview: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        const { rating, comment } = review;
        if (!rating) return toast.error('Please select a rating');
        setIsPending(true);
        const res = await fetch('/api/product/review', {
            method: 'POST',
            body: JSON.stringify({ productId, rating, comment }),
        });

        const { error, success } = await res.json();

        if (!res.ok && error) {
            toast.error(error);
        } else {
            toast.success("Review submitted successfully!");
        }

        //    Replace and Refresh the page with /product/[id]
        setIsPending(false);
        router.replace(`/product/${productId}`);
    };

    useEffect(() => {
        if (initialValue) setReview({ ...initialValue });
    }, [initialValue]);

    return (
        <form onSubmit={submitReview} className="space-y-2">
            <div>
                <h3 className="font-semibold text-lg mb-1">Overall Rating</h3>
                <Rating
                    ratedIcon={<RatedIcon className="h-8 w-8" />}
                    unratedIcon={<UnratedIcon className="h-8 w-8" />}
                    value={initialValue?.rating || review.rating}
                    onChange={(rating) => setReview({ ...review, rating })}
                />
            </div>

            <div>
                <h3 className="font-semibold text-lg mb-1">Write a written review</h3>
                <textarea
                    placeholder="Write what you like or dislike about the product."
                    className="w-full resize-none border p-2 rounded border-blue-gray-500 outline-blue-400 transition"
                    rows={4}
                    value={review.comment}
                    onChange={({ target }) =>
                        setReview({ ...review, comment: target.value })
                    }
                />
            </div>
            <div className="text-right">
                <Button disabled={isPending} type="submit">
                    Submit
                </Button>
            </div>
        </form>
    );
}
