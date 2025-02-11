import { Container } from "@chakra-ui/react";
import { Header } from "./Header";

import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => (
  <Container>
    <Header />
    {children}
  </Container>
);
