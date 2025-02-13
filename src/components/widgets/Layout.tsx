import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Box } from "@chakra-ui/react";
import { Header } from "./Header";

import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

export const Layout = ({ children }: LayoutProps) => (
  <QueryClientProvider client={queryClient}>
    <Header />
    <Box as="main">{children}</Box>
  </QueryClientProvider>
);
