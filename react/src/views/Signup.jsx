import React from "react";
import { Box, Flex, Input, Button, Link, Text, FormLabel, FormControl, Select } from "@chakra-ui/react";
import { useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    location: "",
  });

  const { setUser, setToken } = useStateContext();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    axiosClient
      .post("/signup", formData)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          console.log(response.data.errors);
        }
      });
  };
  return (
    <Flex justifyContent={"center"} bgColor={"#f3f4f5"} alignItems={"center"} flexDirection={"column"}>
      <Box w="400px" p={5} bgColor={"white"} roundedTop={"xl"} boxShadow={"lg"} mt={5}>
        <Flex direction="column" align="center" gap={5}>
          <Text fontSize="2xl" fontWeight="bold" align={"left"} w={"100%"}>
            Register
          </Text>
          <FormControl as="form" onSubmit={handleSubmit}>
            <Flex flexDirection={"column"}>
              <Box>
                <FormLabel>Име</FormLabel>
                <Input placeholder="Име" mb={4} id="name" value={formData.name} onChange={handleChange} />
              </Box>
              <Box>
                <FormLabel>E-Mail</FormLabel>
                <Input placeholder="E-mail адреса" mb={4} id="email" type="email" value={formData.email} onChange={handleChange} />
              </Box>
              <Box>
                <FormLabel>Телефон</FormLabel>
                <Input type="tel" placeholder="Телефонски број" mb={4} id="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
              </Box>
              <Box>
                <FormLabel>Лозинка</FormLabel>
                <Input type="password" placeholder="Password" mb={4} id="password" value={formData.password} onChange={handleChange} />
              </Box>
              <Box>
                <FormLabel>Одбери локација</FormLabel>
                <Select placeholder="Град" mb={4} id="location" value={formData.location} onChange={handleChange}>
                  <option value="Skopje">Скопје</option>
                  <option value="Bitola">Битола</option>
                  <option value="Ohrid">Охрид</option>
                  <option value="Prilep">Прилеп</option>
                  <option value="Tetovo">Тетово</option>
                </Select>
              </Box>
              <Button type="submit" bgColor="#0060df" color={"white"} size="lg" mt={4}>
                Register now
              </Button>
            </Flex>
          </FormControl>
        </Flex>
      </Box>
      <Box fontSize="sm" textAlign="left" bgColor={"gray.200"} w="400px" h="60px" roundedBottom={"xl"} p={5} mb={5}>
        <Link href="/login" fontSize="sm" color="#0060df" mb={4}>
          Already have an account? Sign in.
        </Link>
      </Box>
    </Flex>
  );
};

export default Signup;
