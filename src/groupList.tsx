import {FieldComponentsMap, SectionFieldProps} from "./sectionField";
import {SectionFields} from "./components/SectionFields";
import { set } from 'lodash-es';

type GroupListOpts<Data = any> = {
  fields: FieldComponentsMap<Data>;
  render: (props: { blocks: React.ReactNode[] }) => JSX.Element;
}

export function groupList<Data>(opts: GroupListOpts<Data>) {
  return ({ value, onChange }: SectionFieldProps<Data[]>) => {
    return (
      <opts.render
        blocks={
          value.map((group, groupIndex) => {
            return (
              <SectionFields
                fields={opts.fields}
                data={group}
                onChange={(newGroup) => {
                  onChange(set([...value], groupIndex, newGroup));
                }}
              />
            );
          })
        }
      />
    );
  }
}