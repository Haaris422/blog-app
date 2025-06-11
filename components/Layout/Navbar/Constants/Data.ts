import { NavContentsProps, NavItems } from "./Types";

 export const bottomNavs: NavItems[] = [
        { label: 'Categories', name: 'categories' },
        { label: 'Blogs', name: 'blogs' },
        { label: 'Research', name: 'research' },
        { label: 'Thoughts', name: 'thoughts' },
        { label: 'Videos', name: 'videos' },
    ]
  export const categories: NavContentsProps[] = [
  { label: 'Family Law', name: 'family-law', image: '/images/dummyImg.jpg', description: 'Deals with family-related issues like divorce, custody, and adoption.' },
  { label: 'Criminal Law', name: 'criminal-law', image: '/images/dummyImg.jpg', description: 'Focuses on crimes and legal punishment of criminal offenses.' },
  { label: 'Constitutional Law', name: 'constitutional-law', image: '/images/dummyImg.jpg', description: 'Governs the interpretation and implementation of the constitution.' },
  { label: 'Corporate Law', name: 'corporate-law', image: '/images/dummyImg.jpg', description: 'Regulates the formation and operations of corporations and businesses.' },
  { label: 'Contract Law', name: 'contract-law', image: '/images/dummyImg.jpg', description: 'Covers agreements between parties and legal remedies for breaches.' },
  { label: 'Labour Law', name: 'labour-law', image: '/images/dummyImg.jpg', description: 'Deals with employer-employee relationships and labor rights.' },
  { label: 'Intellectual Property Law', name: 'ip-law', image: '/images/dummyImg.jpg', description: 'Protects creations of the mind like inventions and artistic works.' },
  { label: 'Property Law', name: 'property-law', image: '/images/dummyImg.jpg', description: 'Covers rights and duties over tangible and intangible property.' },
  { label: 'Taxation Law', name: 'tax-law', image: '/images/dummyImg.jpg', description: 'Governs the rules related to taxation imposed by the government.' },
  { label: 'Environmental Law', name: 'environmental-law', image: '/images/dummyImg.jpg', description: 'Regulates the interaction between humans and the natural environment.' },
  { label: 'Consumer Law', name: 'consumer-law', image: '/images/dummyImg.jpg', description: 'Protects the rights of consumers and ensures fair trade practices.' },
  { label: 'Cyber Law', name: 'cyber-law', image: '/images/dummyImg.jpg', description: 'Deals with legal issues related to the internet and digital technologies.' },
];


export const blogsAndResearch: NavContentsProps[] = [
        { label: 'Featured', name: 'featured-blogs' },
        { label: 'Spotlight', name: 'spotlight-blogs' },
        { label: 'Latest', name: 'latest-blogs' },
        { label: 'All', name: 'all-blogs' },
]