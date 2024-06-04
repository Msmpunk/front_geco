import React from "react";

// Chakra imports
import { Flex, useColorModeValue } from "@chakra-ui/react";

// Custom components
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "red");

  return (
    <Flex align='center' direction='column'>
      <p h='26px' w='175px' my='150px' color={logoColor} >Geco 3 </p>
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
