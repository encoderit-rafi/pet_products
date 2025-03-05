import DownIcon from "@/assets/icons/DownIcon";
import Title from "@/components/texts/Title";
import InputSearch from "@/components/inputs/InputSearch";
import {
  // Dialog,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
// import { useGetAllFAQs } from "./api/queries/useGetAllFAQs";
import { useEffect, useState } from "react";
import Page from "@/components/ui/Page";
import BaseButton from "@/components/buttons/BaseButton";
import FAQForm from "./components/FAQForm";
import Dialog from "@/components/dialogs/Dialog";
import { useGetAllFAQs } from "@/api/faqs/useGetAllFAQs";
import { useAuth } from "@/context/AuthProvider";
import EditIcon from "@/assets/icons/EditIcon";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import DialogConfirmDelete from "@/components/dialogs/DialogConfirmDelete";
import { useDeleteFAQs } from "@/api/faqs/useDeleteFAQs";
export default function Faqs() {
  const { user_permissions } = useAuth();
  const [hasWritePermission, setWritePermission] = useState(false);
  useEffect(() => {
    setWritePermission(user_permissions?.some((item) => item == "write_faq"));
  }, [user_permissions]);
  const {
    data: allFAQs,
    status: statusAllFAQs,
    refetch: fetchFAQs,
  } = useGetAllFAQs({
    isEnabled: true,
  });
  const { mutate: deleteFAQ, isLoading: isLoadingDelete } = useDeleteFAQs();
  const [faqForm, setFAQForm] = useState({
    isOpen: false,
    type: "create",
    faq: null,
  });
  async function confirmDelete() {
    deleteFAQ(faqForm.faq.id, {
      onSuccess() {
        fetchFAQs();
        setFAQForm({
          isOpen: false,
          type: "create",
          faq: null,
        });
      },
    });
  }
  return (
    <>
      <Page
        title="Frequently Asked Questions"
        actions={
          <div className="flex items-center gap-2">
            <InputSearch placeholder="search questions" />
            {hasWritePermission && (
              <BaseButton
                variant="orange"
                icon="plus"
                className="px-3 text-xs max-w-fit lg:px-5"
                onClick={() =>
                  setFAQForm({
                    isOpen: true,
                    type: "create",
                    faq: null,
                  })
                }
              >
                <span className="hidden lg:block">add new</span>
              </BaseButton>
            )}
          </div>
        }
      >
        <div className="flex-1">
          <div className="h-full max-h-[600px] overflow-y-auto space-y-3 ">
            {statusAllFAQs == "loading" &&
              Array.from({ length: 10 }, (_, i) => (
                <div
                  key={i}
                  className="bg-custom_bg_one rounded-xl animate-pulse h-11"
                />
              ))}
            {statusAllFAQs != "loading" &&
              allFAQs?.data?.map((data) => (
                <Disclosure key={data.id}>
                  {({ open }) => (
                    <>
                      <DisclosureButton className="flex items-center justify-between w-full px-5 py-3 text-xs lg:text-sm font-medium bg-custom_bg_seven rounded-xl group">
                        <span>{data.question_en}</span>
                        <div className="w-fit flex items-center gap-2">
                          {hasWritePermission && (
                            <div
                              className="size-3"
                              onClick={() =>
                                setFAQForm({
                                  isOpen: true,
                                  type: "update",
                                  faq: data,
                                })
                              }
                            >
                              <EditIcon />
                            </div>
                          )}
                          {hasWritePermission && (
                            <div
                              className="size-3"
                              onClick={() =>
                                setFAQForm({
                                  isOpen: true,
                                  type: "delete",
                                  faq: data,
                                })
                              }
                            >
                              <DeleteIcon />
                            </div>
                          )}
                          <DownIcon
                            className={`size-3 transition-transform duration-200 ${
                              open ? "rotate-180" : "rotate-0"
                            }`}
                          />
                        </div>
                      </DisclosureButton>
                      <DisclosurePanel
                        className={`overflow-hidden transition-all duration-300 ease-in-out mt-3 text-sm lg:text-base font-extralight text-custom_text_two ${
                          open
                            ? "max-h-screen opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        {data.answer_en}
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>
              ))}
          </div>
        </div>
      </Page>

      <Dialog
        isOpen={
          (faqForm.type == "create" || faqForm.type == "update") &&
          faqForm.isOpen
        }
        title={`${
          faqForm.type == "view"
            ? "view"
            : faqForm.type == "create"
            ? "add new"
            : "update"
        }  FAQ`}
        className="max-w-lg"
        onClose={() =>
          setFAQForm({
            type: "create",
            faq: null,
            isOpen: false,
          })
        }
      >
        <FAQForm
          formValues={faqForm}
          handelOnClickCancel={() => {
            console.log("🚀 ~ Faqs ~ handelOnClickCancel");
            setFAQForm({ type: "create", faq: null, isOpen: false });
          }}
        />
      </Dialog>
      <DialogConfirmDelete
        text={faqForm?.faq?.name}
        isOpen={faqForm.type == "delete" && faqForm.isOpen}
        onClickClose={() => {
          // setTempData(null)
          // setUserFormValues({ type: "create", user: null });
          // setIsOpenDeleteUser(false);
        }}
        onClickDelete={confirmDelete}
        isLoading={isLoadingDelete}
      />
    </>
  );
}
