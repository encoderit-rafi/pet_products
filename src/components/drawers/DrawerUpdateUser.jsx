import Drawer from "../navigators/Drawer";
import AuthUserForm from "../form/user/AuthUserForm";
export default function DrawerUpdateUser({ isOpen, setIsOpen, backDrop }) {
  return (
    <Drawer
      isOpen={isOpen}
      className="flex flex-col max-w-md"
      backDrop={backDrop}
    >
      {/* <div className="flex-1 bg-gray-600"> */}
      <AuthUserForm setIsOpen={setIsOpen} />
      {/* </div> */}

    </Drawer>
  );
}
