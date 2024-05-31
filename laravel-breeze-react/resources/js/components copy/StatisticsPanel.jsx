import React from "react";
import { Box, VStack, Text, Button } from "@chakra-ui/react";

const StatisticsPanel = ({ stats }) => {
    return (
        <Box
            bg="white" // Dark theme background
            color="black"
            p={4}
            borderRadius="md"
            boxShadow="xl"
        >
            <VStack spacing={4} align="stretch">
                <Text fontSize="lg" fontWeight="bold">
                    Вашата состојба
                </Text>
                <Text>0.00 мкд</Text>
                <Button colorScheme="blue" mt={4}>
                    Дополни ја сметката
                </Button>
                <Text fontSize="lg" fontWeight="bold" mt={6}>
                    Статистика за огласи
                </Text>
                <Text>Активни огласи: {stats}</Text>
                <Text>Поставени огласи овој месец: {stats}</Text>
                <Text>Поставени огласи оваа година: {stats} </Text>
            </VStack>
        </Box>
    );
};

export default StatisticsPanel;
