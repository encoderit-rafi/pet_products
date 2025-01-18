import CameraIcon from "@/assets/icons/CameraIcon";
import ImageIcon from "@/assets/icons/ImageIcon";
import BaseInput from "../inputs/BaseInput";
import Drawer from "../navigators/Drawer";
import BaseButton from "../buttons/BaseButton";
import Label from "../texts/Label";
import InputPlace from "../inputs/InputPlace";
import InputPhoneNumber from "../inputs/InputPhoneNumber";
import InputBox from "../box/InputBox";
import { useAuth } from "@/context/AuthProvider";
import MailIcon from "@/assets/icons/MailIcon";
import PhoneIcon from "@/assets/icons/PhoneIcon";
import PhoneOutlined from "@/assets/icons/PhoneOutlined";
export default function DrawerViewUser(
 {
  isOpen,
  setIsOpen,
  onClickEdit
 }
) {
 const { user } = useAuth()
 return (
  <Drawer isOpen={isOpen} className="flex flex-col max-w-md">
   <div className="flex-1 overflow-y-auto">
    <div className="flex  flex-col items-center justify-center">

     <img
      src={user.image.url}
      alt={user.name}
      onError={(e) =>
       (e.target.src = "/placeholder-image.webp")
      }
      className="object-cover object-center rounded-full size-28"
     />
     <span className="text-custom_text_two capitalize mt-2">{user.name}</span>
     <span className="text-custom_text_five capitalize">{user.roles?.[0].name}</span>


    </div>
    <div className="mt-14 space-y-3">

     <div className="flex gap-4 items-center">
      <MailIcon className="text-custom_text_five size-5" />
      <span className="text-custom_text_five">{user.email}</span>
     </div>
     <div className="flex gap-4 items-center">
      <PhoneOutlined className="text-custom_text_five size-5" />
      <span className="text-custom_text_five capitalize">+{user.phone_number}</span>
     </div>
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
