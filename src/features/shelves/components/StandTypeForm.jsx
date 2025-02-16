import { useGetAllBrands } from "@/api/brands/queries/useGetAllBrands";
import CloseIcon from "@/assets/icons/CloseIcon";
import BaseButton from "@/components/buttons/BaseButton";
import BaseDropdown from "@/components/dropdowns/BaseDropdown";
import BrandsDropdown from "@/components/dropdowns/BrandsDropdown";
import PosMaterialsDropdown from "@/components/dropdowns/PosMaterialsDropdown";
import ProductsDropdown from "@/components/dropdowns/ProductsDropdown";
import ImagePicker from "@/components/file_pickers/ImagePicker";
import BaseInput from "@/components/inputs/BaseInput";
import Label from "@/components/texts/Label";
import SelectionBox from "@/components/ui/SelectionBox";
import { validationRules } from "@/consts";
import { useGetAllProducts } from "@/features/products/api/queries/useGetAllProducts";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function StandTypeForm({ onClose }) {
  const {
    register,
    formState,
    handleSubmit,
    setValue,
    setError,
    reset,
    clearErrors,
    getValues,
  } = useForm();
  const { errors } = formState;
  const {
    data: allProducts,
    isLoading: isLoadingAllProducts,
    isFetching: isFetchingAllProducts,
  } = useGetAllProducts({
    isEnabled: true,
  });
  function resetFields() {
    reset();
    // setImages([]);
    // setNumber("");
    // setSelectedRoles([]);
    // setSelectedBrands([]);
    // setSelectNewImages(false);
  }
  // const [productCount, setSelectedProductCount] = useState(1);
  const [cost, setCost] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [shelves, setShelves] = useState([]);
  useEffect(() => {
    let materialsCost = 0;
    let productsCost = 0;
    if (selectedMaterials.length > 0) {
      materialsCost = selectedMaterials?.reduce(
        (acc, val) => acc + Number(val.cost),
        0
      );
    }
    if (shelves.length > 0) {
      productsCost = shelves.reduce(
        (sum, shelf) =>
          sum +
          shelf.products.reduce(
            (productSum, product) =>
              productSum + product.price * product.product_quantity,
            0
          ),
        0
      );
    }
    setCost(materialsCost + productsCost);
  }, [selectedMaterials, shelves]);
  useEffect(() => {
    setValue("shelf_name", "");
    setValue("level", "");
    setSelectedProduct([]);
    setSelectedProducts([]);
    setSelectedQuantity(1);
  }, [shelves]);
  useEffect(() => {
    console.log(shelves);
  }, [shelves]);
  function handelClose() {
    setValue("shelf_name", "");
    setValue("level", "");
    setSelectedProduct([]);
    setSelectedProducts([]);
    setSelectedMaterials(() => []);
    setSelectedBrand([]);
    setShelves([]);
    setCost(0);
    setSelectedQuantity(1);
    onClose();
  }
  function onSubmit(item) {
    const data = {
      brand_id: selectedBrand?.[0].id,
      name: item.name,
      pos_materials: selectedMaterials.map((item) => item.id),
      shelves: shelves.map((shelf) => ({
        name: shelf.name,
        level: shelf.level,
        products: shelf.products.map((product) => ({
          product_id: product.id,
          product_quantity: product.product_quantity,
        })),
      })),
    };
    console.log("🚀 ~ onSubmit ~ data:", data);
    // const validations = [
    //   (formValues.type == "create" ||
    //     (formValues.type == "update" && formValues.user.image == null) ||
    //     (formValues.type == "update" &&
    //       formValues.user.image != null &&
    //       selectNewImages)) && {
    //     key: "profile_image",
    //     condition: (value) => value?.length === 0,
    //     message: "Select an image",
    //   },
    //   {
    //     key: "phone_number",
    //     condition: (value) => value?.length <= 3,
    //     message: "Phone number is required",
    //   },
    //   {
    //     key: "brand_ids",
    //     condition: (value) => value.length === 0,
    //     message: "Select a brand",
    //   },
    //   {
    //     key: "role_ids",
    //     condition: (value) => value.length === 0,
    //     message: "Select a role",
    //   },
    // ].filter(Boolean);
    // for (const { key, condition, message } of validations) {
    //   if (condition(data[key])) {
    //     setError(key, { type: "manual", message });
    //     return;
    //   }
    // }
  }
  return (
    <form className="flex flex-col mt-4" onSubmit={handleSubmit(onSubmit)}>
      <ImagePicker />

      <div className="flex flex-col lg:flex-row gap-5">
        <div className="w-1/2 space-y-2">
          <BaseInput
            id="name"
            label="Name"
            palceholder="Stand Type Name"
            className={`py-3 rounded-lg ${
              errors?.name ? "!border-red-500" : ""
            }`}
            register={register("name", validationRules.name)}
          />
          <BrandsDropdown
            selected={selectedBrand}
            setSelected={(data) => {
              data?.id != selectedBrand?.[0]?.id && setSelectedBrand([data]);
            }}
          />
          <PosMaterialsDropdown
            isDisable={selectedBrand?.length == 0 ? true : false}
            params={{ brand_id: selectedBrand?.[0]?.id }}
            selected={selectedMaterials}
            setSelected={(data) => {
              setSelectedMaterials((old) => {
                return old?.some((val) => val?.id == data?.id)
                  ? old.filter((val) => val.id != data.id)
                  : [...old, data];
              });
            }}
          />

          {selectedMaterials.length > 0 && (
            <SelectionBox
              data={selectedMaterials}
              onClickClose={(data) => {
                setSelectedMaterials((old) => {
                  return old?.some((val) => val?.id == data?.id)
                    ? old.filter((val) => val.id != data.id)
                    : [...old, data];
                });
              }}
            />
          )}
          <BaseInput
            id="Cost"
            label="Cost"
            palceholder="Enter Cost"
            value={cost}
            onChange={(e) => {
              setCost(e.target.value);
            }}
          />
        </div>
        <div className="w-1/2 ">
          <div className="flex items-center gap-2">
            <Label label={"Shelves"} />
            {shelves.length <= 5 && (
              <BaseButton
                // variant="orange"
                className={
                  "w-fit p-2.5 rounded-full lg:rounded-full bg-transparent"
                }
                iconColor="!text-custom_orange"
                onClick={() => {
                  if (getValues("shelf_name") == "") {
                    toast.error("Please Enter Shelf Name");
                    return;
                  }
                  if (getValues("level") == "") {
                    toast.error("Please Enter Level");
                    return;
                  }
                  if (
                    shelves.some((shelf) => shelf.level == getValues("level"))
                  ) {
                    toast.error("Level already included");
                    return;
                  }
                  if (selectedProducts.length == 0) {
                    toast.error("Please Select Minimum 1 Product");
                    return;
                  }
                  setShelves((prev) => [
                    ...prev,
                    {
                      name: getValues("shelf_name"),
                      level: getValues("level"),
                      // pos_materials: selectedMaterials,
                      products: selectedProducts,
                    },
                  ]);
                }}
                icon={"plus"}
              />
            )}
          </div>
          <div className="flex items-center gap-2">
            <BaseInput
              id="Type Name"
              palceholder="Shelf Name"
              register={register("shelf_name")}
            />
            <BaseInput
              id="Level"
              type="number"
              palceholder="Level"
              register={register("level")}
            />
          </div>
          <div className="flex items-center gap-2">
            <Label label={"Products"} />
            <BaseButton
              // variant="orange"
              className={
                "w-fit p-2.5 rounded-full lg:rounded-full bg-transparent"
              }
              iconColor="!text-custom_orange"
              onClick={() => {
                if (selectedProduct.length == 0) {
                  toast.error("Please Select Product");

                  return;
                } else {
                  setSelectedProducts((old) => [
                    ...old,
                    {
                      ...selectedProduct?.[0],
                      product_quantity: selectedQuantity,
                    },
                  ]);
                }
              }}
              icon={"plus"}
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1/2">
              <ProductsDropdown
                isDisable={selectedBrand?.length == 0 ? true : false}
                params={{ brand_id: selectedBrand?.[0]?.id }}
                selected={selectedProduct}
                setSelected={(data) => {
                  data?.id != selectedProduct?.[0]?.id &&
                    setSelectedProduct([data]);
                }}
              />
            </div>
            <div className="w-1/2">
              <BaseInput
                id="Quantity"
                type="number"
                palceholder="Quantity"
                value={selectedQuantity}
                onChange={(e) => {
                  setSelectedQuantity(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="">
            <div className="space-y-2 mt-2 max-h-[150px] overflow-y-auto">
              {selectedProducts.length > 0 &&
                selectedProducts.map((item, i) => (
                  <div key={i} className="bg-custom_bg_two rounded-md p-3 ">
                    <span
                      className="block ml-auto  w-fit cursor-pointer"
                      onClick={() => {
                        setSelectedProducts((old) =>
                          old.filter(
                            (data) => data.product_id != item.product_id
                          )
                        );
                      }}
                    >
                      <CloseIcon className="size-2.5 text-custom_orange" />
                    </span>
                    <p className="font-medium">
                      Product:{" "}
                      <span className="font-thin">{item.product_name_en}</span>
                    </p>
                    <p className="font-medium">
                      Quantity:{" "}
                      <span className="font-thin">{item.product_quantity}</span>
                    </p>
                  </div>
                ))}
            </div>
          </div>
          <div className="space-y-2 mt-2 max-h-[150px] overflow-y-auto">
            {shelves.length > 0 &&
              shelves.map((item, i) => (
                <div key={i} className="bg-custom_bg_two rounded-md p-2">
                  <span
                    className="block ml-auto  w-fit cursor-pointer"
                    onClick={() => {
                      setShelves((old) =>
                        old.filter((data) => data.level != item.level)
                      );
                    }}
                  >
                    <CloseIcon className="size-2.5 text-custom_orange" />
                  </span>
                  <p className="font-medium">
                    Shelf: <span className="font-thin">{item.name}</span>
                  </p>
                  <p className="font-medium">
                    Level: <span className="font-thin">{item.level}</span>
                  </p>
                  <p className="font-medium">
                    Products:
                    {item?.products?.map((product, i) => (
                      <div className="" key={i}>
                        <p className="font-medium text-xs">
                          Name:{" "}
                          <span className="font-thin">
                            {product.product_name_en}
                          </span>
                        </p>
                        <p className="font-medium text-xs">
                          Quantity:{" "}
                          <span className="font-thin">
                            {product.product_quantity}
                          </span>
                        </p>
                      </div>
                    ))}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <BaseButton onClick={handelClose}>cancel</BaseButton>
        <BaseButton variant="gradient" type="submit">
          confirm
        </BaseButton>
      </div>
    </form>
  );
}
