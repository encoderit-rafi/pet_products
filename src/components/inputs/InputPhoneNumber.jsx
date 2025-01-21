import DownIcon from "@/assets/icons/DownIcon";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; // Default styles

const InputPhoneNumber = ({ number, setNumber, isError, disabled }) => {
  const [selectedCountry, setSelectedCountry] = useState({});
  useEffect(() => {
    // console.log(
    //   "✅ ~ file: InputPhoneNumber.jsx:9 ~ InputPhoneNumber ~ selectedCountry:",
    //   selectedCountry
    // );
    // console.log(
    //   "✅ ~ file: InputPhoneNumber.jsx:8 ~ InputPhoneNumber ~ number:",
    //   number
    // );
  }, [number]);
  return (
    <PhoneInput
      disabled={disabled}
      country={"sa"}
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
        border: isError
          ? "1px solid red"
          : "1px solid var(--custom_line_seven)",
        // backgroundColor: "#333333",
        borderRadius: "8px",
      }}
      inputStyle={{
        width: "100%",
        // height: "100%",
        height: "40px",
        border: "none",
        // borderRadius: "8px",
        backgroundColor: "transparent",
        color: "var(--custom_text_two)",
        paddingLeft: "64px", // Space for flag and country code
        fontSize: "14px",
        fontFamily: "Poppins",
        fontWeight: "light",
        paddingTop: "8px",
        paddingBottom: "8px",
        // height: "45px",
      }}
      buttonStyle={{
        backgroundColor: "transparent",
        border: "none",
        borderRight: isError
          ? "1px solid red"
          : "1px solid var(--custom_line_seven)",
        padding: "0 8px",
        display: "flex",
        alignItems: "center",
        gap: "8px", // Space between flag and code
      }}
    />
  );
};

export default InputPhoneNumber;
