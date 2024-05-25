import { Box, Container, Stack, Text, Link, Divider, IconButton, Flex } from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const DefaultFooter = () => {
  return (
    <Flex bg="white" color="black" py={10} justifyContent={"center"}>
      <Stack spacing={4} p={5} w="80%">
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
        <Flex direction="column" align="left" justify="center">
          <Flex flexDirection={{ base: "column", md: "row" }} gap={40}>
            <Flex direction="column">
              <Text fontWeight="bold">Услуги</Text>
              <Link href="#">Регистрирај се</Link>
              <Link href="#">Верификација</Link>
              <Link href="#">Како да ставам оглас</Link>
              <Link href="#">Промовирај оглас</Link>
              <Link href="#">Премиум член</Link>
              <Link href="#">Страница</Link>
            </Flex>
            <Flex direction="column">
              <Text fontWeight="bold">Сите огласи</Text>
              <Link href="#">Нов оглас</Link>
              <Link href="#">Категории</Link>
              <Link href="#">Помош</Link>
              <Link href="#">Премиум членови</Link>
              <Link href="#">Помош</Link>
            </Flex>
            <Flex direction="column">
              <Text fontWeight="bold">Помош</Text>
              <Link href="#">Пребарување на огласи</Link>
              <Link href="#">Избегнување на измами</Link>
              <Link href="#">Ја заборавивте лозинка?</Link>
              <Link href="#">Соработка</Link>
              <Link href="#">Прашања и одговори</Link>
            </Flex>
          </Flex>
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
    </Flex>
  );
};

export default DefaultFooter;
