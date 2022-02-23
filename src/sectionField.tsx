import {ComponentProps, FunctionComponent} from "react";

export type SectionFieldProps<Value = string> = {
  value: Value;
  onChange: (value: Value) => void;
}

// TOOD: Types here are busted. The Component could potentially not support the `value` prop coming from SectionFieldProps.
export function sectionField<Props extends SectionFieldProps>(
  Component: (props: Props) => JSX.Element,
  defaultProps: Omit<Props, keyof SectionFieldProps>,
) {
  return (props: Props) => {
    return <Component {...props} {...defaultProps} />
  }
}

export type FieldComponentsMap<Data = any> = {
  [key in keyof Data]: FunctionComponent<SectionFieldProps<Data[key]>>;
};

export type SectionBaseDescriptor<Props = any> = {
  id: string;
  name: string;
  component: FunctionComponent<Props>;
}

export type SectionDescriptor<Data = any> = SectionBaseDescriptor<Data> & {
  fields: FieldComponentsMap<Data>;
  defaults: Data;
}
