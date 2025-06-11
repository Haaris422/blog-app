import { BsTwitterX, BsDiscord } from "react-icons/bs";
import { CgInstagram, CgFacebook } from "react-icons/cg";


export const shareSocials:SocialsProps[] = [
        {
            name: 'Instagram',
            icon: <CgInstagram />,
            link: '#'
        },
        {
            name: 'Facebook',
            icon: <CgFacebook />,
            link: '#'
        },
        {
            name: 'Twitter',
            icon: <BsTwitterX />,
            link: '#'
        },
        {
            name: 'Discord',
            icon: <BsDiscord />,
            link: '#'
        },
    ]