import {ComponentProps, FunctionComponent} from "react";
import {SectionDescriptor} from "./hooks/useSection";


export function createTemplate<Sections extends SectionDescriptor[]>(sections: Sections) {
  return (
    sectionDatas: (ComponentProps<Sections[number]['component']> & { id: number; type: string; })[],
    onSectionDatasChange: (newSectionDatas: typeof sectionDatas) => void,
  ) => {
    const generate = (type: (typeof sectionDatas)[number]['type']): any => {
      const section = sections.find(s => s.name === type);
      if (!section) {
        throw new Error(`Cannot resolve section "${type}"`);
      }

      const data = Object.assign({}, section.defaults);

      data.id = sectionDatas.length;
      data.type = type;

      return data;
    }

    const rendered = sectionDatas.map((sectionData, sectionIndex) => {
      const section = sections.find((section) => section.name === sectionData.type);

      if (!section) {
        throw new Error(`Template missing section type: ${sectionData.type}`);
      }

      const handleChange = (data: typeof sectionData) => {
        const updatedSections = [...sectionDatas];

        updatedSections.splice(sectionIndex, 1, data);

        onSectionDatasChange(updatedSections);
      }
      return [
        <section.component key={`section-${sectionData.id}`} {...sectionData} />,
        <SectionFields key={`sectionForm-${sectionData.id}`} section={section} data={sectionData} onChange={handleChange} />,
      ];
    });

    return [
      rendered.map(([section]) => section),
      rendered.map(([, form]) => form),
      { generate },
    ] as const;
  }
}

type SectionFieldsProps = {
  section: SectionDescriptor;
  data: any;
  onChange: (sectionData: any) => void;
}

function SectionFields(props: SectionFieldsProps) {
  const fields = Object.entries(props.section.fields).map(([key, Field]) => (
    <Field value={props.data[key]} onChange={(value) => props.onChange({ ...props.data, [key]: value })} />
  ));

  return (
    <>
      {fields}
    </>
  )
}