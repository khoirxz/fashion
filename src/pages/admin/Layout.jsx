import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useDisclosure,
  Flex,
  Box,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  IconButton,
  Avatar,
} from "@chakra-ui/react";
import { HiMenuAlt2 } from "react-icons/hi";

import { verifyUser, LogOut, reset } from "../../features/authSlice";

import { SidebarContent } from "../../components/admin";

const Layout = ({ children }) => {
  const sidebar = useDisclosure();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(verifyUser());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
  }, [isError, navigate]);

  const handleLogout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/login");
    console.log(1);
  };

  return (
    <Box
      as="section"
      bg="gray.50"
      _dark={{
        bg: "gray.700",
      }}
      minH="100vh"
    >
      {!isLoading ? (
        <>
          <SidebarContent
            handleLogout={handleLogout}
            display={{
              base: "none",
              md: "unset",
            }}
          />
          <Drawer
            isOpen={sidebar.isOpen}
            onClose={sidebar.onClose}
            placement="left"
          >
            <DrawerOverlay />
            <DrawerContent>
              <SidebarContent
                w="full"
                borderRight="none"
                handleLogout={handleLogout}
              />
            </DrawerContent>
          </Drawer>
          <Box
            ml={{
              base: 0,
              md: 60,
            }}
            transition=".3s ease"
          >
            <Flex
              as="header"
              align="center"
              justify={{ base: "space-between", md: "flex-end" }}
              w="full"
              px="4"
              bg="white"
              _dark={{
                bg: "gray.800",
              }}
              borderBottomWidth="1px"
              color="inherit"
              h="14"
            >
              <IconButton
                aria-label="Menu"
                display={{
                  base: "inline-flex",
                  md: "none",
                }}
                onClick={sidebar.onOpen}
                icon={<HiMenuAlt2 />}
                size="sm"
              />

              <Flex align="end">
                <Avatar
                  border="1px"
                  ml="4"
                  size="sm"
                  name={user?.name}
                  cursor="pointer"
                />
              </Flex>
            </Flex>

            <Box as="main" p="4">
              {children}
            </Box>
          </Box>
        </>
      ) : null}
    </Box>
  );
};

export default Layout;
