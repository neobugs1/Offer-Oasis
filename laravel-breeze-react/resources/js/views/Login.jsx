import { Box, Flex, Input, Button, Link, Text, FormLabel, FormControl, SimpleGrid } from "@chakra-ui/react";

const Login = () => {
  return (
    <Flex justifyContent={"center"} bgColor={"#f3f4f5"} h="53vh" alignItems={"center"} flexDirection={"column"}>
      <Box w="400px" h="380px" p={5} bgColor={"white"} roundedTop={"xl"} boxShadow={"lg"}>
        <Flex direction="column" align="center" gap={5}>
          <Text fontSize="2xl" fontWeight="bold" align={"left"} w={"100%"}>
            Login
          </Text>
          <FormControl>
            <Flex flexDirection={"column"}>
              <Box>
                <FormLabel>E-Mail</FormLabel>
                <Input placeholder="E-mail address" mb={4} id="email" />
              </Box>
              <Box>
                <FormLabel>Password</FormLabel>
                <Input type="password" placeholder="Password" mb={4} id="password" />
              </Box>
              <Button bgColor="#0060df" color={"white"} mt={4} size="lg">
                Login now
              </Button>
            </Flex>
          </FormControl>
          <Link fontSize="sm" color="#0060df">
            Forgot Password?
          </Link>
        </Flex>
      </Box>
      <Box fontSize="sm" textAlign="left" bgColor={"gray.200"} w="400px" h="80px" roundedBottom={"xl"} p={5}>
        <Link href="/signup" fontSize="sm" color="#0060df" mb={4}>
          Create account details for your company profile or register as an individual.
        </Link>
      </Box>
    </Flex>
  );
};

export default Login;
