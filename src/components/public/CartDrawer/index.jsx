import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Text,
  Link,
  Box,
} from "@chakra-ui/react";

const CartDrawer = ({ onClose, isOpen }) => {
  return (
    <Drawer size="md" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent fontFamily="Inter">
        <DrawerCloseButton />
        <DrawerHeader>
          <Text variant="h1" fontWeight="bold" fontSize="2xl">
            Keranjang kamu
          </Text>
        </DrawerHeader>
        <DrawerBody>
          <Box my={4} fontWeight="medium">
            <Link mb="20">View all</Link>
          </Box>
          <p>Masi kosong nih.. ayo cari gaming gear mu!</p>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
