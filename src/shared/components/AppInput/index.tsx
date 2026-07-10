import {
  Pressable,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  TextInputProps,
} from "react-native";
import { AppInputVariants, appInputVariants } from "./input.variants";
import { Ionicons } from "@expo/vector-icons";
import { FC } from "react";
import { useAppInputViewModel } from "./useAppInputViewModel";

export interface AppInputProps extends TextInputProps, AppInputVariants {
  label?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  containerClassName?: string;
  mask?: (value: string) => string | void;
  error?: string;
}

export const AppInput: FC<AppInputProps> = ({
  label,
  leftIcon,
  rightIcon,
  containerClassName,
  className,
  value,
  isError,
  secureTextEntry = false,
  onFocus,
  onBlur,
  onChangeText,
  mask,
  error,
  isDisabled,
  ...textInputProps
}) => {
  const {
    getIconColor,
    handleBlur,
    handleFocus,
    handlePasswordToggle,
    handleWrapperPress,
    showPassword,
    handleTextChange,
    isFocused,
  } = useAppInputViewModel({
    onBlur,
    onFocus,
    isError: !!error,
    mask,
    onChangeText,
    isDisabled,
    secureTextEntry,
    value,
  });

  const styles = appInputVariants({
    isFocused,
    isDisabled,
    isError: !!error,
  });

  return (
    <View className={styles.container({ className: containerClassName })}>
      <Text className={styles.label()}>{label}</Text>

      <Pressable className={styles.wrapper()}>
        {leftIcon && (
          <Ionicons
            color={getIconColor()}
            className="mr-3"
            size={22}
            name={leftIcon}
          />
        )}

        <TextInput
          onBlur={handleBlur}
          onFocus={handleFocus}
          className={styles.input({ className })}
          onChangeText={handleTextChange}
          value={value}
          secureTextEntry={showPassword}
          {...textInputProps}
        />

        {secureTextEntry && (
          <TouchableOpacity onPress={handlePasswordToggle}>
            <Ionicons
              size={22}
              name={showPassword ? "eye-off-outline" : "eye-outline"}
            />
          </TouchableOpacity>
        )}
      </Pressable>

      {error && (
        <Text className={styles.error()}>
          <Ionicons name="alert-circle-outline" /> {error}
        </Text>
      )}
    </View>
  );
};
