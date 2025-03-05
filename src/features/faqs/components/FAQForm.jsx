import React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { validationRules } from "@/consts";

import Label from "@/components/texts/Label";
import BaseInput from "@/components/inputs/BaseInput";
import BaseButton from "@/components/buttons/BaseButton";

import { useGetAllPermissions } from "@/api/permissions/useGetAllPermissions";
import { useCreateRole } from "@/api/roles/useCreateRole";
import { useUpdateRole } from "@/api/roles/useUpdateRole";
import { useGetAllRoles } from "@/api/roles/useGetAllRoles";
import cn from "@/lib/utils/cn";
import InputBox from "@/components/box/InputBox";
import { useCreateFAQs } from "@/api/faqs/useCreateFAQs";
import { useUpdateFAQs } from "@/api/faqs/useUpdateFAQs";
import { useGetAllFAQs } from "@/api/faqs/useGetAllFAQs";

export default function FAQForm({ handelOnClickCancel, formValues }) {
  const { refetch: fetchFAQs } = useGetAllFAQs({ isEnabled: false });

  const {
    mutate: createFAQ,
    isLoading: isLoadingCreateFAQ,
    isError: isErrorCreateFAQ,
  } = useCreateFAQs();
  const {
    mutate: updateFAQ,
    isLoading: isLoadingUpdateFAQ,
    isError: isErrorUpdateFAQ,
  } = useUpdateFAQs();

  const {
    register,
    formState,
    handleSubmit,
    setValue,
    setError,
    reset,
    clearErrors,
  } = useForm();
  const { errors } = formState;
  console.log("🚀 ~ FAQForm ~ errors:", errors);
  useEffect(() => {
    if (formValues.type != "create") {
      const { question_en, answer_en, hierarchy_order } = formValues.faq;
      // console.log("🚀 ~ useEffect ~ formValues:", formValues);
      setValue("question_en", question_en);
      setValue("hierarchy_order", hierarchy_order);
      setValue("answer_en", answer_en);
      // setSelectedPermissionsID(permissions.map((permission) => permission.id));
    } else {
      resetFields();
    }
  }, [formValues]);

  function resetFields() {
    reset();
    // setSelectedPermissionsID([]);
  }
  function onSubmit(data) {
    formValues.type === "update"
      ? updateFAQ(
          {
            id: formValues.faq.id,
            data,
          },
          {
            onSuccess: () => {
              fetchFAQs();
              handelOnClickCancel();
              resetFields();
            },
            onError: () => {},
          }
        )
      : createFAQ(data, {
          onSuccess: () => {
            fetchFAQs();
            handelOnClickCancel();
            resetFields();
          },
        });
  }

  return (
    <form
      className="flex flex-col mt-4 space-y-4 overflow-y-auto max-h-[680px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex items-center gap-3">
        <div className=" flex-1">
          <BaseInput
            id="question"
            type="text"
            label="question"
            palceholder="Enter Question"
            className={`py-3 rounded-lg  ${
              errors?.question_en ? "!border-red-500" : ""
            }`}
            register={register("question_en", validationRules.required)}
            disabled={formValues.type == "view"}
          />
        </div>
        <div className="max-w-32 ">
          <BaseInput
            id="hierarchy_order"
            type="number"
            label="hierarchy order"
            min={1}
            palceholder="Enter Value"
            className={`py-3 rounded-lg ${
              errors?.hierarchy_order ? "!border-red-500" : ""
            }`}
            register={register("hierarchy_order", validationRules.required)}
            disabled={formValues.type == "view"}
          />
        </div>
      </div>

      <InputBox className="flex flex-col w-full">
        <Label id="answer_en" palceholder="answer_en" label="answer" />
        <textarea
          id="answer_en"
          name="answer_en"
          aria-required="true"
          placeholder="Enter Answer"
          className={cn("base-input resize-none flex-1", {
            "!border-red-500": !!errors?.answer_en,
          })}
          rows={5}
          disabled={formValues.type == "view"}
          {...register("answer_en", validationRules.required)}
        />
      </InputBox>
      <div className="flex items-center gap-4">
        <BaseButton
          onClick={() => {
            resetFields();
            handelOnClickCancel();
          }}
          isDisabled={
            formValues.type == "create"
              ? isLoadingCreateFAQ && !isErrorCreateFAQ
              : isErrorCreateFAQ && !isErrorUpdateFAQ
          }
        >
          cancel
        </BaseButton>
        {formValues.type != "view" && (
          <BaseButton
            variant="gradient"
            type="submit"
            isLoading={
              formValues.type == "create"
                ? isLoadingCreateFAQ && !isErrorCreateFAQ
                : isLoadingUpdateFAQ && !isErrorUpdateFAQ
            }
            isDisabled={
              formValues.type == "create"
                ? isLoadingCreateFAQ && !isErrorCreateFAQ
                : isErrorUpdateFAQ && !isErrorUpdateFAQ
            }
          >
            confirm
          </BaseButton>
        )}
      </div>
    </form>
  );
}
