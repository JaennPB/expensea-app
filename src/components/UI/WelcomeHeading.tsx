import { VStack, Heading, Text } from "native-base";

interface Props {
  title: string;
  body: string;
}

const WelcomeHeading: React.FC<Props> = ({ title, body }) => {
  return (
    <VStack space={2} mb={10}>
      <Heading
        color="white"
        size="xl"
        textAlign="center"
        fontWeight="normal"
        fontFamily="Poppins_600SemiBold"
      >
        {title}
      </Heading>
      <Text
        color="white"
        fontSize="md"
        textAlign="center"
        fontWeight="normal"
        fontFamily="Poppins_400Regular"
      >
        {body}
      </Text>
    </VStack>
  );
};

export default WelcomeHeading;
