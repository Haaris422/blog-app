import { FaGavel, FaRegCommentDots } from "react-icons/fa";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { MdOutlineGavel } from "react-icons/md";

export const authInputs = [
    {
        name:'email',
        label:'Email'
    },
    {
        name:'password',
        label:'Password'
    }
]

export const legalHighlights = [
  {
    title: "Latest Law Updates",
    description: "Breaking news on amendments, new legislation, and policy changes",
    icon: FaGavel,
  },
  {
    title: "Court Proceedings & Verdicts",
    description: "Live updates from Supreme Court and High Courts across India",
    icon: MdOutlineGavel,
  },
  {
    title: "Research Reports & Studies",
    description: "Comprehensive research on legal trends and judicial patterns",
    icon: HiOutlineDocumentReport,
  },
  {
    title: "Legal Analysis & Commentary",
    description: "In-depth analysis of landmark judgments and legal precedents",
    icon: FaRegCommentDots,
  },
];

