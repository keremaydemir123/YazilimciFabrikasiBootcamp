import React from "react";
import ContentContainer from "./ContentContainer";
import SearchInput from "../SearchInput";

function Content({ children }: { children: React.ReactNode }) {
  return (
    <ContentContainer>
      <div>{children}</div>
      <SearchInput />
    </ContentContainer>
  );
}

export default Content;
