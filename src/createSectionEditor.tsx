import {SectionDescriptor} from "./sectionField";
import {FunctionComponent, useCallback, Dispatch, SetStateAction } from "react";
import {SectionFields} from "./components/SectionFields";

export type SectionDataExtras = { id: number; type: string; };

type FieldsRendererProps = {
  fields: React.ReactNode;
  section: SectionDescriptor;
  remove: () => void;
}

type SectionRendererProps = {
  section: SectionDescriptor;
  contents: React.ReactNode;
}

type SectionEditorHookOpts<Section extends SectionDescriptor> = {
  value: (Section["defaults"] & SectionDataExtras)[];
  onChange: Dispatch<SetStateAction<(Section["defaults"] & SectionDataExtras)[]>>;
}

export function useSectionEditor<Section extends SectionDescriptor>(sections: Section[], { value, onChange }: SectionEditorHookOpts<Section>) {
  const generate = (type: string): typeof value[number] => {
    const section = sections.find(s => s.id === type);
    if (!section) {
      throw new Error(`Cannot resolve section "${type}"`);
    }

    const data = Object.assign({}, section.defaults);

    data.id = value.length;
    data.type = type;

    return data;
  };

  const add = (type: string) => {
    const data = generate(type);

    onChange((current) => [...current, data]);
  };

  const remove = (index: number) => {
    onChange((current) => {
      const mutable = [...current];
      mutable.splice(index, 1);

      return mutable;
    })
  };

  const renderFields = useCallback((FieldsRenderer: FunctionComponent<FieldsRendererProps>) => {
    return value.map((data, index) => {
      const section = sections.find((_section) => _section.id === data.type);
      if (!section) {
        console.warn(`[Drive] Trying to render section data, type is invalid: ${data.type}`);
        return;
      }

      const handleChange = (newData: typeof data) => {
        onChange((current) => {
          const mutable = [...current];

          mutable.splice(index, 1, newData);

          return mutable;
        });
      };

      const removeSection = () => {
        remove(index);
      };

      const fields = <SectionFields key={`sectionForm-${data.id}`} fields={section.fields} data={data} onChange={handleChange} />

      return <FieldsRenderer fields={fields} section={section} remove={removeSection} />;
    });
  }, [value]);

  const renderSections = useCallback((SectionRenderer: FunctionComponent<SectionRendererProps>) => {
    return value.map((data) => {
      const section = sections.find((_section) => _section.id === data.type);
      if (!section) {
        console.warn(`[Drive] Trying to render section data, type is invalid: ${data.type}`);
        return;
      }

      return (
        <SectionRenderer
          key={`section-${data.type}-${data.id}`}
          section={section}
          contents={<section.component {...data} />}
        />
      );
    });
  }, [value]);

  return { renderFields, renderSections, generate, add, remove } as const;
}