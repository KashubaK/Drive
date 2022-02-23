import {FieldComponentsMap, SectionFieldProps} from "./sectionField";
import {SectionFields} from "./createTemplate";
import { set } from 'lodash-es';

type GroupListOpts<Data = any> = {
  fields: FieldComponentsMap<Data>;
  renderGroup: (fields: React.ReactNode) => React.ReactNode;
}

export function groupList<Data>(opts: GroupListOpts<Data>) {
  return ({ value, onChange }: SectionFieldProps<Data[]>) => {
    return (
      <>
        {value.map((group, groupIndex) => {
          return opts.renderGroup(
            <SectionFields
              fields={opts.fields}
              data={group}
              onChange={(newGroup) => {
                onChange(set([...value], groupIndex, newGroup));
              }}
            />
          );
        })}
      </>
    );
  }
}