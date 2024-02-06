import React from "react";
import { ScrollView, TextInput, View } from "react-native";
import { Label, LabelText } from "~/components/universal-ui/label";
import { Textarea } from "~/components/universal-ui/textarea";

export default function InputScreen() {
  const inputRef = React.useRef<TextInput>(null);
  const [value, setValue] = React.useState<string>("");

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
    setValue(text);
  }

  return (
    <ScrollView contentContainerClassName="flex-1 justify-center items-center p-6">
      <View className="web:max-w-xs w-full">
        <Label onPress={handleOnLabelPress}>
          <LabelText className="pb-2 native:pb-1 pl-0.5" id="textareaLabel">
            Label
          </LabelText>
        </Label>
        <Textarea
          ref={inputRef}
          placeholder="Write some stuff..."
          value={value}
          onChangeText={onChangeText}
          aria-labelledbyledBy="textareaLabel"
        />
        <View className="h-20" />
      </View>
    </ScrollView>
  );
}
