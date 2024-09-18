import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Controller } from "react-hook-form";
import { colors } from "@/constants/colors";

interface InputProps {
  name: string;
  control: any;
  placeholder?: string;
  rules?: object;
  error?: string;
  keyboardType: KeyboardTypeOptions;
}

export function Input({
  name,
  control,
  placeholder,
  rules,
  error,
  keyboardType,
}: InputProps) {
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            keyboardType={keyboardType}
          />
        )}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },

  input: {
    height: 44,
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    borderRadius: 4,
  },

  errorText: {
    color: "red",
    marginTop: 4,
  },
});
