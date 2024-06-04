import DefaultFooter from "@/footers/DefaultFooter";
import DefaultHeader from "@/headers/DefaultHeader";
import SearchHeader from "@/headers/SearchHeader";
import React from "react";

const SearchLayout = ({ children, auth }) => {
  return (
    <>
      <SearchHeader auth={auth} />
      {children}
      <DefaultFooter />;
    </>
  );
};

export default SearchLayout;
