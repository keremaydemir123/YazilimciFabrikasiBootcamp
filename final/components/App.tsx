"use client";

import store from "@/features/store";
import React from "react";
import { Provider } from "react-redux";
import Sidebar from "./Sidebar";
import PageContainer from "./PageContainer";

function App({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <div className="flex h-full w-full">
        <Sidebar />
        <PageContainer>{children}</PageContainer>
      </div>
    </Provider>
  );
}

export default App;
