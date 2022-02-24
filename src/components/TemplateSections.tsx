import {SectionBaseDescriptor} from "../sectionField";
import {SectionDataExtras} from "../createSectionEditor";

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