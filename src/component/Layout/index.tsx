import React from "react";
import Header from "./header";
import Footer from "./footer";

export default function Index({ children }: any) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
