import React from "react";
import { Dialog } from "@material-tailwind/react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    youtubeLink: string;
}

const YouTubeModal: React.FC<Props> = ({ isOpen, onClose, youtubeLink }) => {
    const embedUrl = youtubeLink.replace("watch?v=", "embed/");

    return (
        <Dialog
            open={isOpen}
            handler={onClose}
            animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0.9, y: "-100%" },
            }}
            className="h-[90vh] w-[90vw] p-4"
        >
            <iframe
                width="100%"
                height="60%"
                src={embedUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-xl overflow-hidden"
            ></iframe>
        </Dialog>
    );
};

export default YouTubeModal;
