import { BsTwitterX, BsDiscord } from "react-icons/bs";
import { CgInstagram, CgFacebook } from "react-icons/cg";


export const shareSocials: SocialsProps[] = [
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

export const animationCalss: string = 'transition-all duration-500 ease-in-out'

export const dummyArticleList: ArticleProps[] = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    link: '#',
    title: `Title ${i + 1}`,
    image: '/images/dummyImg.jpg',
    subTitle: `Sub-Title ${i + 1}`,
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus exercitationem nostrum eius architecto magnam ipsa cum praesentium molestias vel deserunt est modi vero illo, ex inventore voluptatum commodi sapiente nulla? Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem eos nemo ad quidem quaerat consectetur, excepturi dolorum at ipsam cupiditate quia quas sequi et, eligendi, corrupti aperiam ex voluptates sed.",
    category: i % 2 == 0 ? "Blogs" : "Research",
}));

