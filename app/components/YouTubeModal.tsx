import React from "react";
import { Dialog, Button } from "@material-tailwind/react";
import Rating from "./ModalRating";
import { StarIcon } from "@heroicons/react/24/outline";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    youtubeLink: string;
    title?: string;
    description?: string;
    rating?: number;
    price?: number;
    bulletPoints?: string[];
}

const YouTubeModal: React.FC<Props> = ({
    isOpen,
    onClose,
    youtubeLink,
    title,
    description,
    rating,
    price,
    bulletPoints,
}) => {
    const embedUrl = youtubeLink.replace("watch?v=", "embed/");

    return (
        <Dialog
            open={isOpen}
            handler={onClose}
            animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0.9, y: "-100%" },
            }}
            className="h-[90vh] w-[90vw] p-4 flex flex-col"
        >
            <div className="flex-1">
                <iframe
                    width="100%"
                    height="100%"
                    src={embedUrl}
                    title="YouTube video player"
                    frameBorder="0"
                    allowFullScreen
                    className="rounded-xl overflow-hidden"
                ></iframe>
            </div>
            <div className="flex-1 mt-4 overflow-auto">
                <table className="w-full">
                    <tbody>
                        <tr>
                            <th className="text-left text-lg font-semibold">Title:</th>
                            <td className="text-right">{title}</td>
                        </tr>
                        <tr>
                            <th className="text-left text-lg font-semibold">Description:</th>
                            <td className="text-right">{description}</td>
                        </tr>
                        <tr>
                            <th className="text-left text-lg font-semibold">Price:</th>
                            <td className="text-right">
                                {price ? `$${price}` : "Price not available"}
                            </td>
                        </tr>
                        <tr>
                            <th className="text-left text-lg font-semibold">Rating:</th>
                            <td className="text-right">
                                {rating ? (
                                    <Rating value={rating} />
                                ) : (
                                    <div className="flex">
                                        {[...Array(5)].map((_, index) => (
                                            <StarIcon
                                                key={index}
                                                className="w-5 h-5 text-yellow-500"
                                            />
                                        ))}
                                    </div>
                                )}
                            </td>
                        </tr>
                        {bulletPoints && (
                            <tr>
                                <th className="text-left text-lg font-semibold">Details:</th>
                                <td className="text-right">
                                    <ul className="list-disc list-inside">
                                        {bulletPoints.map((point, index) => (
                                            <li key={index}>{point}</li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <Button
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white"
                    onClick={onClose}
                >
                    Close
                </Button>
            </div>
        </Dialog>
    );
};

export default YouTubeModal;
