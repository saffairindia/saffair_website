import './share1.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareFacebook, faWhatsapp,faSquareInstagram, faSquareXTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons'
export default function Share1() {
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
    const shareToInsta = () => {
        const currentUrl = window.location.href;
        const linkedInUrl = `https://www.instagram.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
        window.open(linkedInUrl, "_blank");
    };
    return (
        <>
            <div className="shareCon">
                <div className="shareconTagline">
                    <h3>Share with your community!</h3>
                </div>

                <div className="shareicons">
                <FontAwesomeIcon className="icons" icon={faSquareFacebook} onClick={shareToFacebook} />
                    <FontAwesomeIcon className="icons" icon={faSquareXTwitter} onClick={shareToTwitter} />
                    <FontAwesomeIcon className="icons" icon={faLinkedin} onClick={shareToLinkedIn} />
                    <FontAwesomeIcon className="icons" icon={faWhatsapp} onClick={shareToWhatsApp} />
                </div>

            </div>
        </>
    )
}
