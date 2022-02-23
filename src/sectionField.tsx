import {ComponentProps, FunctionComponent} from "react";

export type SectionFieldProps<Value = string> = {
  value: Value;
  onChange: (value: Value) => void;
}

type ProvidedProps = keyof SectionFieldProps;

export function sectionField<
  ComponentType extends FunctionComponent<SectionFieldProps>,
  FieldValue = ComponentProps<ComponentType>['value']
>(Component: ComponentType, defaultProps: Omit<ComponentProps<ComponentType>, ProvidedProps>) {
  return (sectionFieldProps: SectionFieldProps) => {
    return <Component {...defaultProps} {...sectionFieldProps} />
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
