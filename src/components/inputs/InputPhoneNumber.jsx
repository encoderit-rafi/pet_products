import DownIcon from "@/assets/icons/DownIcon";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; // Default styles

const InputPhoneNumber = () => {
  const [number, setNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState({});
  useEffect(() => {
    console.log(
      "✅ ~ file: InputPhoneNumber.jsx:9 ~ InputPhoneNumber ~ selectedCountry:",
      selectedCountry
    );
    console.log(
      "✅ ~ file: InputPhoneNumber.jsx:8 ~ InputPhoneNumber ~ number:",
      number
    );
  }, [number]);
  return (
    <PhoneInput
      country={"eg"}
      countryCodeEditable={false}
      value={number}
      onChange={(value, country) => {
        setNumber(value);
        setSelectedCountry(country);
      }}
      onCountryChange={(country) => {
        setSelectedCountry(country);
      }}
      containerStyle={{
        width: "100%",
        border: "1px solid var(--custom_line_two)",
        // backgroundColor: "#333333",
        borderRadius: "8px",
      }}
      inputStyle={{
        width: "100%",
        height: "100%",
        border: "none",
        // borderRadius: "8px",
        backgroundColor: "transparent",
        color: "#ffffff",
        paddingLeft: "64px", // Space for flag and country code
        fontSize: "16px",
        fontFamily: "Poppins",
        fontWeight: "lighter",
        paddingTop: "10px",
        paddingBottom: "10px",
        // height: "45px",
      }}
      buttonStyle={{
        backgroundColor: "transparent",
        border: "none",
        borderRight: "1px solid var(--custom_line_two)",
        padding: "0 10px",
        display: "flex",
        alignItems: "center",
        gap: "8px", // Space between flag and code
      }}
    />
  );
};

export default InputPhoneNumber;