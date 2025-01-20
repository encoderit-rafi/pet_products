import React, { useRef } from "react";
import { StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";
import cn from "@/lib/utils/cn";

export default function InputPlace({ className }) {
  const inputRef = useRef();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    libraries: ["places"],
    googleMapsApiKey: import.meta.env.VITE_API_GOOGLEMAPS_API_KEY,
  });
  function handelOnPlacesChanged() {
    let address = inputRef.current.getPlaces();
  }
  return (
    <>
      {isLoaded && (
        <StandaloneSearchBox
          onLoad={(ref) => (inputRef.current = ref)}
          onPlacesChanged={handelOnPlacesChanged}
        >
          <input
            type="text"
            placeholder="Search Places"
            aria-required="true"
            className={cn(
              // "border w-full bg-transparent text-white border-custom_line_one rounded-md px-3 py-2 outline-none placeholder:capitalize placeholder:text-custom_line_one focus:border-custom_line_one",
              "base-input w-full",
              className
            )}
          />
        </StandaloneSearchBox>
      )}
    </>
  );
}
