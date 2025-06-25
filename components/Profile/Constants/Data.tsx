import { IconType } from "react-icons";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const socials: { label: keyof ProfileProps; icon: IconType; hrefPrefix: string }[] = [
        { label: 'instagram', icon: FaInstagram, hrefPrefix: 'https://instagram.com/' },
        { label: 'x', icon: FaXTwitter, hrefPrefix: 'https://x.com/' },
        { label: 'linkedIn', icon: FaLinkedin, hrefPrefix: 'https://linkedin.com/in/' },
    ];