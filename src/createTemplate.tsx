import {SectionDescriptor, FieldComponentsMap, SectionBaseDescriptor} from "./sectionField";

type SectionDataExtras = { id: number; type: string; };

export function createTemplate<
  Section extends SectionDescriptor,
>(sections: Section[]) {
  return (
    sectionDatas: (typeof sections[number]["defaults"] & SectionDataExtras)[],
    onSectionDatasChange: (newSectionDatas: typeof sectionDatas) => void,
  ) => {
    const generate = (type: string): typeof sectionDatas[number] => {
      const section = sections.find(s => s.id === type);
      if (!section) {
        throw new Error(`Cannot resolve section "${type}"`);
      }

      const data = Object.assign({}, section.defaults);

      data.id = sectionDatas.length;
      data.type = type;

      return data;
    }

    const rendered = sectionDatas.map((sectionData, sectionIndex) => {
      const section = sections.find((section) => section.id === sectionData.type);

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
        <SectionFields key={`sectionForm-${sectionData.id}`} fields={section.fields} data={sectionData} onChange={handleChange} />,
      ];
    });

    return [
      rendered.map(([section]) => section),
      rendered.map(([, form]) => form),
      { generate },
    ] as const;
  }
}

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

type TemplateSectionsProps = {
  sections: SectionBaseDescriptor[];
  datas: (SectionDataExtras & Record<string, any>)[]
}

export function TemplateSections(props: TemplateSectionsProps) {
  const { sections, datas } = props;

  return (
    <>
      {datas.map((data) => {
        const section = sections.find((s) => s.id === data.type);
        if (!section) {
          console.warn(`Could not find section with id "${data.type}"`);
          return;
        }

        return <section.component key={`${section.id}#${data.id}`} {...data} />
      }).filter(Boolean)}
    </>
  );
}