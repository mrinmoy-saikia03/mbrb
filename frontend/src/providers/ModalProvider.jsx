import React from "react";
import { CartDrawer } from "../features/navigation/components/CartDrawer";
import { MobileNavigation } from "../features/navigation/components/MobileNav";
import { SearchModal } from "../features/navigation/components/SearchModal";
import { LoginModal } from "../features/navigation/components/LoginModal";

const ModalProvider = ({ children }) => {
  return (
    <>
      {children}
      <CartDrawer />
      <MobileNavigation />
      <SearchModal />
      <LoginModal />
    </>
  );
};

export default ModalProvider;
