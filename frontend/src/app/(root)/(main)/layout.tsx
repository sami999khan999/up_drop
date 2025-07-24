import React from "react";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="w-[95%] mx-auto 2xl:w-[1300px] lg:w-[90%]">{children}</div>
  );
};

export default layout;
