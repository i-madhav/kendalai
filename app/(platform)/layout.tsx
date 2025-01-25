import React from "react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen">
      {children}
    </div>
  );
};
export default HomeLayout;
