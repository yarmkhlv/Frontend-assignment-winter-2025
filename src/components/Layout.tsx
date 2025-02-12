import { Box } from "@chakra-ui/react";
import { Header } from "./Header";

import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => (
  <>
    <Header />
    <Box as="main">{children}</Box>
  </>
);
