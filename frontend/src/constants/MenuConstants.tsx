import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { FaRegStar, FaStar } from "react-icons/fa";
import { GoFileDirectory, GoFileDirectoryFill } from "react-icons/go";
import { MdDelete, MdDeleteOutline } from "react-icons/md";

export const SIDEBAR_ITEMS = [
  {
    name: "Home",
    href: "/",
    icon: <AiOutlineHome size={20} />,
    iconActive: <AiFillHome size={20} />,
  },
  {
    name: "Files & Folders",
    href: "/files-folders",
    icon: <GoFileDirectory size={20} />,
    iconActive: <GoFileDirectoryFill size={20} />,
  },
  {
    name: "Stared",
    href: "/stared",
    icon: <FaRegStar size={20} />,
    iconActive: <FaStar size={20} />,
  },
  {
    name: "Deleted",
    href: "/deleted",
    icon: <MdDeleteOutline size={20} />,
    iconActive: <MdDelete size={20} />,
  },
];
