import {ComponentProps, FunctionComponent, useCallback, useMemo, useReducer, useState} from "react";

type UseSectionOpts = {};

export type SectionFieldProps = {
  value: string;
  onChange: (value: string) => void;
}

type ProvidedProps = keyof SectionFieldProps;

export function sectionField<
  ComponentType extends FunctionComponent<any>,
  FieldValue = ComponentProps<ComponentType>['value']
>(Component: ComponentType, defaultProps: Omit<ComponentProps<ComponentType>, ProvidedProps>) {
  return (sectionFieldProps: SectionFieldProps) => {
    return <Component {...defaultProps} {...sectionFieldProps} />
  }
}

export type SectionDescriptor<Data = any> = {
  name: string;
  fields: Record<keyof Data, FunctionComponent<SectionFieldProps>>;
  component: FunctionComponent<Data>;
}
