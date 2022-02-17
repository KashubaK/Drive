import {ComponentProps, FunctionComponent} from "react";
import {SectionDescriptor} from "./hooks/useSection";


export function createTemplate<Sections extends SectionDescriptor[]>(sections: Sections) {
  return (
    sectionDatas: (ComponentProps<Sections[number]['component']> & { id: number; type: string; })[],
    onSectionDatasChange: (newSectionDatas: typeof sectionDatas) => void,
  ) => {
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
        <SectionForm key={`sectionForm-${sectionData.id}`} section={section} data={sectionData} onChange={handleChange} />
      ];
    });

    return [rendered.map(([section]) => section), rendered.map(([, form]) => form)];
  }
}

type SectionFormProps = {
  section: SectionDescriptor;
  data: any;
  onChange: (sectionData: any) => void;
}

function SectionForm(props: SectionFormProps) {
  const fields = Object.entries(props.section.fields).map(([key, Field]) => (
    <Field value={props.data[key]} onChange={(value) => props.onChange({ ...props.data, [key]: value })} />
  ));

  return (
    <form>
      {fields}
    </form>
  )
}