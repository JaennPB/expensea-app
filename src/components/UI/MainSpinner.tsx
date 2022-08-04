import { HStack, Heading, Spinner } from "native-base";

const MainSpinner = () => {
  return (
    <HStack flex={1} space={2} justifyContent="center" alignItems="center">
      <Spinner
        accessibilityLabel="Loading data"
        color="darkBlue.600"
        size="lg"
      />
      <Heading
        fontSize={25}
        color="darkBlue.600"
        fontWeight="normal"
        fontFamily="Poppins_600SemiBold"
      >
        Loading...
      </Heading>
    </HStack>
  );
};

export default MainSpinner;
