import Drawer from "../navigators/Drawer";
import BaseButton from "../buttons/BaseButton";
import { useAuth } from "@/context/AuthProvider";
import PhoneOutlinedIcon from "@/assets/icons/PhoneOutlinedIcon";
import Title from "../texts/Title";

export default function DrawerViewUser({ isOpen, setIsOpen, onClickEdit }) {
  const { user } = useAuth();
  return (
    <Drawer isOpen={isOpen} className="flex flex-col max-w-md">
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col items-center justify-center">
          <img
            src={user?.image?.url || "/placeholder-image.webp"}
            alt={user.name}
            onError={(e) => (e.target.src = "/placeholder-image.webp")}
            className="object-cover object-center rounded-2xl size-28"
          />
          <span className="mt-2 capitalize text-custom_text_two">
            {user.name}
          </span>
          <span className="text-custom_text_five">
            {/* {user.roles?.[0].name} */}
            {user.email}
          </span>
        </div>
        <div className="space-y-3 mt-14">
          <div className="flex items-center gap-4">
            <PhoneOutlinedIcon className="text-custom_text_five size-5" />
            <span className="capitalize text-custom_text_five">
              +{user.phone_number}
            </span>
          </div>
          {user?.brands?.length > 0
            && <Title>Brands</Title>
          }
          {user?.brands?.map((brand) => (
            <li key={brand.id} className="text-custom_text_five">
              {brand.name}
            </li>
          ))}
          {user?.roles?.length > 0
            &&
            <Title>Roles</Title>
          }
          {user?.roles?.map((role) => (
            <li key={role.id} className="text-custom_text_five">
              {role.name}
              {role.brand?.name && `(${role.brand?.name})`}
            </li>
          ))}
        </div>
      </div>
      <div className="flex gap-4 mt-10">
        <BaseButton
          className="text-xs font-light lg:text-sm"
          onClick={setIsOpen}
        >
          cancel
        </BaseButton>
        <BaseButton
          variant="gradient"
          className="text-xs font-light lg:text-sm"
          onClick={onClickEdit}
        >
          edit
        </BaseButton>
      </div>
    </Drawer>
  );
}
