import {TextInput, TextInputProps} from "@mantine/core";

export type TextFieldProps = Omit<TextInputProps, 'onChange' | 'value'> & {
  value: string;
  onChange: (value: string) => void;
};

export function TextField(props: TextFieldProps) {
  return <TextInput {...props} onChange={e => props.onChange(e.target.value)} />
}