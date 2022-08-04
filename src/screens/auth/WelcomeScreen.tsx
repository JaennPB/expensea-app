import { useState } from "react";
import { Alert } from "react-native";
import { Heading, Button } from "native-base";

import { useAppNavigation } from "../../hooks/navigationHooks";

import CustomInput from "../../components/UI/CustomInput";
import Card from "../../components/UI/Card";
import CustomKeyboardAV from "../../components/UI/CustomKeyboardAV";
import WelcomeHeading from "../../components/UI/WelcomeHeading";

const WelcomeScreen = () => {
  const navigation = useAppNavigation();

  const [username, setUsername] = useState("");

  function setUsernameAndNavigateHandler() {
    if (!username) {
      Alert.alert("Please add a name");
      return;
    }

    navigation.navigate("SignupScreen", { username: username.trim() });
  }

  return (
    <CustomKeyboardAV bgColor="darkBlue.800">
      <WelcomeHeading
        title="Welcome to Expensea!"
        body="Your simple and minimalistic money tracker."
      />
      <Card>
        <Heading
          color="white"
          size="md"
          fontWeight="normal"
          fontFamily="Poppins_600SemiBold"
        >
          How would you like to be called?
        </Heading>
        <CustomInput
          title="Name"
          type="default"
          onChangeText={(value) => setUsername(value)}
          value={username}
          autoCapitalize="sentences"
        />
        <Button
          _text={{ fontSize: "md", fontFamily: "Poppins_400Regular" }}
          bg="darkBlue.500"
          onPress={setUsernameAndNavigateHandler}
          _pressed={{ backgroundColor: "darkBlue.600" }}
        >
          Confirm
        </Button>
      </Card>
    </CustomKeyboardAV>
  );
};

export default WelcomeScreen;
