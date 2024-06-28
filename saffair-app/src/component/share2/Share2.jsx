import React from "react";
import "./share2.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSquareFacebook,
    faLinkedin,
    faSquareXTwitter,
    faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

export default function Share2() {

    const shareToWhatsApp = () => {
        const currentUrl = window.location.href;
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(currentUrl)}`;
        window.open(whatsappUrl, "_blank");
    };

    const shareToFacebook = () => {
        const currentUrl = window.location.href;
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
        window.open(facebookUrl, "_blank");
    };

    const shareToTwitter = () => {
        const currentUrl = window.location.href;
        const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`;
        window.open(twitterUrl, "_blank");
    };

    const shareToLinkedIn = () => {
        const currentUrl = window.location.href;
        const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
        window.open(linkedInUrl, "_blank");
    };

    return (
        <div className="share2con">
            <div className="Jack">
                <p className="share2">Like what you see? Share with your friends</p>
                <div className="share2Icons">
                    <FontAwesomeIcon className="ic" icon={faSquareFacebook} onClick={shareToFacebook} />
                    <FontAwesomeIcon className="ic" icon={faSquareXTwitter} onClick={shareToTwitter} />
                    <FontAwesomeIcon className="ic" icon={faLinkedin} onClick={shareToLinkedIn} />
                    <FontAwesomeIcon className="ic" icon={faWhatsapp} onClick={shareToWhatsApp} />
                </div>
            </div>
        </div>
    );
}
