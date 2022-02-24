import {FieldComponentsMap} from "../sectionField";

type SectionFieldsProps<Data = any> = {
  fields: FieldComponentsMap;
  data: Data;
  onChange: (data: Data) => void;
}

export function SectionFields(props: SectionFieldsProps) {
  const fields = Object.entries(props.fields).map(([key, Field]) => (
    <Field value={props.data[key]} onChange={(value) => props.onChange({ ...props.data, [key]: value })} />
  ));

  return (
    <>
      {fields}
    </>
  )
}