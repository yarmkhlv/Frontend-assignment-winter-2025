import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BTN_LINK_STYLES } from "./styleVariables";

interface IPropsButtonLink {
  to: string;
  text: string;
  styles?: {
    size?: Record<string, string>;
    bg?: string;
    color?: string;
    _hover?: Record<string, string>;
  };
}

export function ButtonLink({
  to,
  text,
  styles = BTN_LINK_STYLES["blueMedium"],
}: IPropsButtonLink) {
  return (
    <Button
      as={Link}
      to={to}
      size={{ base: "sm", md: "md" }}
      bg="blue.400"
      color="white"
      _hover={{ bg: "blue.500" }}
      {...styles}
    >
      {text}
    </Button>
  );
}
