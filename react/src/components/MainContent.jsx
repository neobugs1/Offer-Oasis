import React from "react";
import { Box, Container, Stack, Input, Button, Text, Flex, Heading } from "@chakra-ui/react";
import BackgroundChanger from "./BackgroundChanger";
import LatestAds from "./LatestAds";
import { Search2Icon } from "@chakra-ui/icons";

const MainContent = () => {
  return (
    <BackgroundChanger>
      <Flex justify={"center"} direction={"column"} h="93vh">
        <Box flex="1" p={4}></Box>
        <Stack spacing={8} align="center">
          <Text fontSize="4xl" color="white">
            Пребарајте огласи
          </Text>
          <Flex w="full" maxW="lg">
            <Input placeholder="Пребарај, пр. BMW, Samsung, Iphone, Услуга ..." size="lg" bg="white" borderRadius="md" />
            <Button colorScheme="blue" size="lg" mt={4}>
              <Search2Icon />
            </Button>
          </Flex>
          <Box flex="1" p={4}>
            <Heading color={"white"}>или</Heading>
          </Box>
          <Text fontSize="xl" mb={4} color={"white"}>
            Најнови огласи
          </Text>
          <Box bg="white" p={6} borderRadius="md" boxShadow="lg" textAlign="center" maxW={"90%"}>
            <Stack direction="row" justify="center" spacing={4}>
              <LatestAds />
            </Stack>
          </Box>
        </Stack>
        <Box flex="1" p={4}></Box>
        <Flex w={"100%"} bgColor={"black"} opacity={0.5} justify={"center"}>
          <Flex w={"75%"} justify="space-between" color="white" h="15vh" align={"center"}>
            <Box textAlign="center">
              <Text fontSize="2xl">640,000</Text>
              <Text>Огласи</Text>
            </Box>
            <Box textAlign="center">
              <Text fontSize="2xl">111</Text>
              <Text>Индустриски сектори</Text>
            </Box>
            <Box textAlign="center">
              <Text fontSize="2xl">350,000</Text>
              <Text>Продукти</Text>
            </Box>
            <Box textAlign="center">
              <Text fontSize="2xl">600,000</Text>
              <Text>Слики и видеа</Text>
            </Box>
            <Box textAlign="center">
              <Text fontSize="2xl">1 милион</Text>
              <Text>купувачи месечно</Text>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </BackgroundChanger>
  );
};

export default MainContent;
