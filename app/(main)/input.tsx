import React from "react";
import { Platform, ScrollView, TextInput, View, Text } from "react-native";
import Animated, { FadeInDown, FadeOut } from "react-native-reanimated";
import { Input } from "~/components/universal-ui/input";
import { Label, LabelText } from "~/components/universal-ui/label";
import { cn } from "~/lib/utils";

export default function InputScreen() {
  const inputRef = React.useRef<TextInput>(null);
  const [value, setValue] = React.useState<string>("");
  const [err, setErr] = React.useState<string | null>(null);

  function handleOnLabelPress() {
    if (!inputRef.current) {
      return;
    }
    if (inputRef.current.isFocused()) {
      inputRef.current?.blur();
    } else {
      inputRef.current?.focus();
    }
  }

  function onChangeText(text: string) {
    if (err) {
      setErr(null);
    }
    setValue(text);
  }

  function onSubmitEditing() {
    setErr("Write more stuff to remove this error message.");
  }

  return (
    <ScrollView contentContainerClassName="flex-1 justify-center items-center p-6">
      <View className="web:max-w-xs w-full">
        <Label onPress={handleOnLabelPress}>
          <LabelText
            className={cn(err && "text-destructive", "pb-2 native:pb-1 pl-0.5")}
            id="inputLabel"
          >
            Label
          </LabelText>
        </Label>
        <Input
          ref={inputRef}
          placeholder="Write some stuff..."
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          aria-labelledbyledBy="inputLabel"
          aria-errormessage="inputError"
        />
        {err && <ErrorMessage msg={err} />}
        <View className="h-20" />
      </View>
    </ScrollView>
  );
}

function ErrorMessage({ msg }: { msg: string }) {
  if (Platform.OS === "web") {
    return (
      <Text
        className="text-destructive text-sm native:px-1 py-1.5 web:animate-in web:zoom-in-95"
        aria-invalid="true"
        id="inputError"
      >
        {msg}
      </Text>
    );
  }
  return (
    <Animated.Text
      entering={FadeInDown}
      exiting={FadeOut.duration(275)}
      className="text-destructive text-sm native:px-1 py-1.5"
      aria-invalid="true"
      id="inputError"
    >
      {msg}
    </Animated.Text>
  );
}
