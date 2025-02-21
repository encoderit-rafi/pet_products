import { NavLink, useLocation } from "react-router-dom";
//* icons😎
import ProductsIcon from "@/assets/icons/ProductsIcon";
import MarketingIcon from "@/assets/icons/MarketingIcon";
import FaqsIcon from "@/assets/icons/FaqsIcon";
import RolesIcon from "@/assets/icons/RolesIcon";
import TermsIcon from "@/assets/icons/TermsIcon";
import ShelvesIcon from "@/assets/icons/ShelvesIcon";
import HubIcon from "@/assets/icons/HubIcon";
//* data📂
const routes = [
  { path: "/", name: "hub", icon: <HubIcon className="w-4" /> },
  {
    path: "/brands",
    name: "brands",
    icon: <ProductsIcon className="w-4" />,
  },
  {
    path: "/stores",
    name: "stores",
    icon: <ProductsIcon className="w-4" />,
  },
  {
    path: "/products",
    name: "products",
    icon: <ProductsIcon className="w-4" />,
  },
  {
    path: "/media-kit",
    name: "media kit",
    icon: <PlayIcon className="w-3" />,
  },
  {
    path: "/marketing",
    name: "marketing",
    icon: <MarketingIcon className="w-[18px]" />,
  },
  {
    path: "/shelves",
    name: "shelves",
    icon: <ShelvesIcon className="w-4" />,
  },
  { path: "/faqs", name: "FAQs", icon: <FaqsIcon className="w-2" /> },
  { path: "/roles", name: "roles", icon: <RolesIcon className="w-4" /> },
  {
    path: "/terms",
    name: "terms",
    icon: <TermsIcon className="w-4" />,
  },
];
import cn from "@/lib/utils/cn";
import { useState } from "react";
import ButtonContact from "../buttons/ButtonContact";
import DrawerApplicationSupport from "../drawers/DrawerApplicationSupport";
import CardApplicationSupport from "../cards/CardApplicationSupport";
import DrawerSingleApplicationSupport from "../drawers/DrawerSingleApplicationSupport";
import PlayIcon from "@/assets/icons/PlayIcon";

export default function Sidebar({ className, children }) {
  const location = useLocation();
  return (
    <aside className={cn("flex flex-col justify-between flex-1", className)}>
      <nav className="pb-6 overflow-y-auto">
        <ul className="space-y-6">
          <div className="hidden lg:block">
            <ButtonContact />
          </div>

          {routes?.map((route) => (
            <li key={route.name} className="relative group">
              <NavLink
                to={route.path}
                className={cn(
                  `flex flex-col items-center gap-2 text-xs text-center capitalize text-custom_text_six before:absolute before:content('') before:w-[2px] before:bg-custom_orange before:top-0 before:left-0 before:bottom-0 before:h-full before:opacity-0 group-hover:before:opacity-100 before:transition-all before:duration-300 font-light`,
                  {
                    "before:opacity-100 text-custom_text_two font-normal":
                      location.pathname == route.path,
                  }
                )}
              >
                <span className="">{route.icon}</span>
                <span className="">{route.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      {children}
    </aside>
  );
}
