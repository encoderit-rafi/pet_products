import EditIcon from "@/assets/icons/EditIcon";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import ButtonWithIcon from "@/components/ButtonWithIcon";
import BorderBox from "@/components/BorderBox";

export default function Roles() {
  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold capitalize">
          Assigned Roles Add New
        </h2>
        <div className="flex items-center gap-4">
          <ButtonWithIcon />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 mt-2 sm:grid-cols-2 md:grid-cols-3">
        <BorderBox>
          <div className="flex items-center gap-2">
            <div className="p-1 size-14 bg-custom_bg_two rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="rounded-lg"
              />
            </div>
            <div className="flex flex-col justify-center flex-1 capitalize">
              <p className="text-sm font-medium">m. khalid saied</p>
              <p className="text-xs text-gray-400">show profile</p>
            </div>
            <div className="flex items-center justify-center gap-2 text-yellow-500">
              <div className="bg-[#363b3f] siz-10 p-2  rounded-lg border flex items-center justify-center">
                <EditIcon />
              </div>
              <div className="bg-[#363b3f] siz-10 p-2  rounded-lg border flex items-center justify-center">
                <DeleteIcon />
              </div>
            </div>
          </div>
        </BorderBox>
        <BorderBox>
          <div className="flex items-center gap-2">
            <div className="p-1 size-14 bg-custom_bg_two rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="rounded-2xl"
              />
            </div>
            <div className="flex flex-col justify-center flex-1 capitalize">
              <p className="text-sm font-medium">m. khalid saied</p>
              <p className="text-xs text-gray-400">show profile</p>
            </div>
            <div className="flex items-center justify-center gap-2 text-yellow-500">
              <div className="bg-[#363b3f] siz-10 p-2  rounded-lg border flex items-center justify-center">
                <EditIcon />
              </div>
              <div className="bg-[#363b3f] siz-10 p-2  rounded-lg border flex items-center justify-center">
                <DeleteIcon />
              </div>
            </div>
          </div>
        </BorderBox>
        <BorderBox>
          <div className="flex items-center gap-2">
            <div className="p-1 size-14 bg-custom_bg_two rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="rounded-2xl"
              />
            </div>
            <div className="flex flex-col justify-center flex-1 capitalize">
              <p className="text-sm font-medium">m. khalid saied</p>
              <p className="text-xs text-gray-400">show profile</p>
            </div>
            <div className="flex items-center justify-center gap-2 text-yellow-500">
              <div className="bg-[#363b3f] siz-10 p-2  rounded-lg border flex items-center justify-center">
                <EditIcon />
              </div>
              <div className="bg-[#363b3f] siz-10 p-2  rounded-lg border flex items-center justify-center">
                <DeleteIcon />
              </div>
            </div>
          </div>
        </BorderBox>
      </div>
    </div>
  );
}
