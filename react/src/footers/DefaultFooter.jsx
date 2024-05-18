import { Box, Container, Stack, Text, Link, Divider, IconButton, Flex } from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const DefaultFooter = () => {
  return (
    <Box bg="gray.800" color="gray.200" py={10}>
      <Stack spacing={4} p={5}>
        <Flex justify="space-between" align="center" direction={{ base: "column", md: "row" }} textAlign={{ base: "center", md: "left" }}>
          <Text fontSize="lg" fontWeight="bold">
            Offer Oasis
          </Text>
          <Stack direction="row" spacing={6} mt={{ base: 4, md: 0 }}>
            <Link href="https://facebook.com" isExternal>
              <IconButton aria-label="Facebook" icon={<FaFacebook />} size="lg" colorScheme="facebook" variant="ghost" />
            </Link>
            <Link href="https://twitter.com" isExternal>
              <IconButton aria-label="Twitter" icon={<FaTwitter />} size="lg" colorScheme="twitter" variant="ghost" />
            </Link>
            <Link href="https://instagram.com" isExternal>
              <IconButton aria-label="Instagram" icon={<FaInstagram />} size="lg" colorScheme="pink" variant="ghost" />
            </Link>
            <Link href="https://linkedin.com" isExternal>
              <IconButton aria-label="LinkedIn" icon={<FaLinkedin />} size="lg" colorScheme="linkedin" variant="ghost" />
            </Link>
          </Stack>
        </Flex>
        <Divider />
        <Flex justify="space-between" direction={{ base: "column", md: "row" }} textAlign={{ base: "center", md: "left" }}>
          <Stack direction="row" spacing={4} justify={{ base: "center", md: "flex-start" }} mt={{ base: 4, md: 0 }}>
            <Link href="/about">About Us</Link>
            <Link href="/services">Services</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy">Privacy Policy</Link>
          </Stack>
          <Text mt={{ base: 4, md: 0 }}>&copy; {new Date().getFullYear()} Offer Oasis. All rights reserved.</Text>
        </Flex>
      </Stack>
    </Box>
  );
};

export default DefaultFooter;
