import { NavLink, useLocation } from "react-router-dom";
//* icons😎
import ProductsIcon from "@/assets/icons/ProductsIcon";
import MarketingIcon from "@/assets/icons/MarketingIcon";
import FaqsIcon from "@/assets/icons/FaqsIcon";
import UsersIcon from "@/assets/icons/UsersIcon";
import TermsIcon from "@/assets/icons/TermsIcon";
import ShelvesIcon from "@/assets/icons/ShelvesIcon";
import HubIcon from "@/assets/icons/HubIcon";

import cn from "@/lib/utils/cn";
import ButtonContact from "../buttons/ButtonContact";
import PlayIcon from "@/assets/icons/PlayIcon";
import BrandIcon from "@/assets/icons/BrandIcon";
import StoreIcon from "@/assets/icons/StoreIcon";
import { useEffect, useMemo, useState } from "react";
import { useAuthUserQuery } from "@/api/auth/queries/useAuthUserQuery";
import { useAuth } from "@/context/AuthProvider";

export default function Sidebar({ className, children }) {
  const location = useLocation();
  const { user_permissions } = useAuth();
  // const { data: user } = useAuthUserQuery();
  // const [userPermissions, setUserPermissions] = useState([]);

  // useEffect(() => {
  //   setUserPermissions(
  //     user.user_roles.flatMap((role) => role.permissions.map((p) => p.name))
  //   );
  // }, [user]);
  const routes = useMemo(
    () =>
      [
        { path: "/", name: "hub", icon: <HubIcon className="w-4" /> },
        {
          path: "/brands",
          name: "brands",
          permissions: ["read_brand"],
          icon: <BrandIcon className="w-4" />,
        },
        {
          path: "/stores",
          name: "stores",
          permissions: ["read_client"],
          icon: <StoreIcon className="w-4" />,
        },
        {
          path: "/products",
          name: "products",
          permissions: ["read_product"],
          icon: <ProductsIcon className="w-4" />,
        },
        {
          path: "/media-kit",
          name: "media kit",
          permissions: ["read_media_kit"],
          icon: <PlayIcon className="w-3" />,
        },

        {
          path: "/shelves",
          name: "shelves",
          permissions: ["read_shelf"],
          icon: <ShelvesIcon className="w-4" />,
        },
        {
          path: "/faqs",
          name: "FAQs",
          permissions: ["read_faq"],
          icon: <FaqsIcon className="w-2" />,
        },
        {
          path: "/users",
          name: "users",
          permissions: ["read_user"],
          icon: <UsersIcon className="w-4" />,
        },
        {
          path: "/terms",
          name: "terms",
          permissions: ["all"],

          icon: <TermsIcon className="w-4" />,
        },
        {
          path: "/marketing",
          name: "marketing",
          permissions: ["read_marketing"],
          icon: <MarketingIcon className="w-[18px]" />,
        },
      ].filter((item) =>
        item.permissions?.some((item) =>
          [...user_permissions, "all"]?.includes(item)
        )
      ),
    [user_permissions]
  );
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
                <span>{route.icon}</span>
                <span>{route.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      {children}
    </aside>
  );
}
