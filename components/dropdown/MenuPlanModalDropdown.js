import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
} from "@nextui-org/react";
import { useState, useMemo } from "react";

export default function MenuPlanModalDropdown({
  children,
  firstOption,
  disabledKeys,
}) {
  const [selectedKeys, setSelectedKeys] = useState(new Set([firstOption]));
  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(),
    [selectedKeys]
  );
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered" className="capitalize">
          {selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        className="text-black"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        disabledKeys={disabledKeys}
      >
        {children}
      </DropdownMenu>
    </Dropdown>
  );
}
