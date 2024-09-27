import React from "react";

export const Card = ({ children, className = "", ...props }) => (
  <div className={`bg-white shadow-md rounded-xl ${className}`} {...props}>
    {children}
  </div>
);

export const CardHeader = ({ children, className = "", ...props }) => (
  <div className={`px-4 py-4 rounded-t-xl ${className}`} {...props}>
    <h3 className="text-lg font-medium leading-6 text-gray-900">{children}</h3>
  </div>
);

export const CardContent = ({ children, className = "", ...props }) => (
  <div className={`p-4 rounded-b-xl ${className}`} {...props}>
    {children}
  </div>
);

export const ScrollArea = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`overflow-auto ${className}`}
      style={{ scrollbarWidth: "thin", scrollbarColor: "#CBD5E0 #EDF2F7" }}
      {...props}
    >
      {children}
    </div>
  );
};
