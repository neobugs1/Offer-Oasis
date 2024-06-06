import React from "react";
import { Box, VStack, Text, Button, Spacer, Flex } from "@chakra-ui/react";

const StatisticsPanel = ({ stats }) => {
    return (
        <Box
            bg="white"
            color="black"
            p={4}
            borderRadius="md"
            boxShadow="xl"
        >
            <VStack spacing={4} align="stretch">
                <Text fontSize="lg" fontWeight="bold">
                    Вашата состојба
                </Text>
                <Text fontWeight={"bold"} color={"#0060df"}>0.00 мкд</Text>
                <Button bgColor={"#0060df"} color={"white"} mt={4}>
                    Дополни ја сметката
                </Button>
                <Text fontSize="lg" fontWeight="bold" mt={4}>
                    Статистика за огласи
                </Text>
                <Flex>
                    <Text>Активни огласи:</Text><Spacer /> <Text>{stats}</Text>
                </Flex>
                <Flex>
                    <Text>Поставени огласи овој месец:</Text><Spacer /> <Text>{stats}</Text>
                </Flex>
                <Flex>
                    <Text>Поставени огласи оваа година:</Text><Spacer /> <Text>{stats}</Text>
                </Flex>
                <Text fontSize="lg" fontWeight="bold" mt={4}>
                    Статус за огласи
                </Text>
                <Flex>
                    <Text>Одобрени:</Text><Spacer /> <Text>{stats}</Text>
                </Flex>
                <Flex>
                    <Text>Одбиени:</Text><Spacer /> <Text>{stats}</Text>
                </Flex>
                <Flex>
                    <Text>Сеуште непроверени:</Text><Spacer /> <Text>{stats}</Text>
                </Flex>
            </VStack>
        </Box>
    );
};

export default StatisticsPanel;
