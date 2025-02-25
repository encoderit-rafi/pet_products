import { useState } from "react";

const Tooltip = ({ text, children }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div className="absolute z-[1000] px-2 py-1 ml-2 text-sm text-white transform -translate-x-1/2 rounded-md shadow-lg left-1/2 bg-custom_bg_one -top-8 w-max">
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
