import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Box, Flex } from "@chakra-ui/react";
import { Header } from "./Header/Header";

import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

export const Layout = ({ children }: LayoutProps) => (
  <QueryClientProvider client={queryClient}>
    <Flex direction="column" minH="100dvh">
      <Header />

      <Box
        as="main"
        flex={1}
        display="flex"
        flexDirection="column"
        position="relative"
      >
        {children}
      </Box>
    </Flex>
  </QueryClientProvider>
);
