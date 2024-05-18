import { Box, Flex, Input, Button, Link, Text, FormLabel, FormControl } from "@chakra-ui/react";

const Login = () => {
  return (
    <Flex justifyContent={"center"} bgColor={"#f3f4f5"} h="53vh" alignItems={"center"} flexDirection={"column"}>
      <Box w="400px" h="350px" p={5} bgColor={"white"} roundedTop={"xl"}>
        <Flex direction="column" align="center" gap={5}>
          <Text fontSize="2xl" fontWeight="bold" mb={4} align={"left"} w={"100%"}>
            Registration
          </Text>
          <FormControl>
            <Flex flexDirection={"column"} gap={5}>
              <Box>
                <FormLabel>E-Mail</FormLabel>
                <Input placeholder="E-mail address" mb={2} />
              </Box>
              <Box>
                <FormLabel>Password</FormLabel>
                <Input type="password" placeholder="Password" mb={4} />
              </Box>
              <Button bgColor="#0060df" color={"white"} size="lg" mb={4}>
                Register now
              </Button>
            </Flex>
          </FormControl>
          <Link fontSize="sm" color="#0060df" mb={4}>
            Forgot Password?
          </Link>
        </Flex>
      </Box>
      <Box fontSize="sm" textAlign="left" bgColor={"gray.200"} w="400px" h="80px" roundedBottom={"xl"} p={5}>
        <Link fontSize="sm" color="#0060df" mb={4}>
          Create account details for your company profile or register as an individual.
        </Link>
      </Box>
    </Flex>
  );
};

export default Login;
