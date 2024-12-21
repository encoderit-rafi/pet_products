import React from "react";
import { NavLink, useLocation } from "react-router-dom";
//* icons😎
import ProductsIcon from "@/assets/icons/ProductsIcon";
import MarketingIcon from "@/assets/icons/MarketingIcon";
import FaqsIcon from "@/assets/icons/FaqsIcon";
import RolesIcon from "@/assets/icons/RolesIcon";
import TermsIcon from "@/assets/icons/TermsIcon";
import ShelvesIcon from "@/assets/icons/ShelvesIcon";
import HubIcon from "@/assets/icons/HubIcon";
import ConnectIcon from "@/assets/icons/ConnectIcon";
//* data📂
const routes = [
  { path: "/", name: "hub", icon: <HubIcon className="w-5" /> },
  {
    path: "/products",
    name: "products",
    icon: <ProductsIcon className="w-4" />,
  },
  {
    path: "/marketing",
    name: "marketing",
    icon: <MarketingIcon className="w-5" />,
  },
  { path: "/shelves", name: "shelves", icon: <ShelvesIcon className="w-4" /> },
  { path: "/faqs", name: "FAQs", icon: <FaqsIcon className="w-2" /> },
  { path: "/roles", name: "roles", icon: <RolesIcon className="w-4" /> },
  { path: "/terms", name: "terms", icon: <TermsIcon className="w-4" /> },
];
export default function Sidebar() {
  const location = useLocation()
  console.log({ location })
  return (
    <nav className="pb-6 overflow-y-auto">
      <ul className="space-y-6">
        <li className="">
          <NavLink
            to="/"
            className="flex flex-col items-center gap-2 text-xs text-center capitalize text-custom_text_six before:absolute before:content('') before:w-[2px] before:bg-custom_orange before:top-0 before:left-0 before:bottom-0 before:h-full before:opacity-0 group-hover:before:opacity-100 before:transition-all before:duration-300"
          >
            <ConnectIcon className="w-10" />
            <span className="font-[100]">connect</span>
          </NavLink>
        </li>

        {routes.map((route) => (
          <li key={route.name} className="relative group">
            <NavLink
              to={route.path}
              className={`flex flex-col items-center gap-2 text-xs text-center capitalize text-custom_text_six before:absolute before:content('') before:w-[2px] before:bg-custom_orange before:top-0 before:left-0 before:bottom-0 before:h-full before:opacity-0 group-hover:before:opacity-100 before:transition-all before:duration-300 ${location.pathname == route.path && 'before:opacity-100'}`}
            >
              {route.icon}
              <span className="font-[100]">{route.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
