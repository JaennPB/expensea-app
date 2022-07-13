import React from "react";
import { VStack, Heading, Text } from "native-base";

interface Props {
  title: string;
  body: string;
}

const WelcomeHeading: React.FC<Props> = ({ title, body }) => {
  return (
    <VStack space={2} mb={10}>
      <Heading color="white" size="xl" textAlign="center">
        {title}
      </Heading>
      <Text color="white" fontSize="md" textAlign="center">
        {body}
      </Text>
    </VStack>
  );
};

export default WelcomeHeading;
