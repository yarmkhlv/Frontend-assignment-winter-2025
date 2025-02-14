import { Select } from "@chakra-ui/react";
import { ChangeEventHandler } from "react";

interface item {
  label: string;
  value: string;
}

interface IPropsSelectWrapper {
  value: string;
  placeholder: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  items: item[];
  size?: Record<string, string>;
}

export function SelectWrapper({
  value,
  onChange,
  items,
  size,
}: IPropsSelectWrapper) {
  return (
    <Select
      placeholder="Выбрать фильтр"
      value={value}
      onChange={onChange}
      size={{ base: "sm", md: "md", ...size }}
      maxW={{ base: "xs", md: "sm" }}
    >
      {items.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </Select>
  );
}
