import {Group, Text} from "@mantine/core";
import {SectionBlockForm} from "./SectionBlockForm";

type SectionGroupListProps = {
  blocks: React.ReactNode[];
  label: string;
}

export function SectionGroupList(props: SectionGroupListProps) {
  const { blocks, label } = props;

  return (
    <Group direction="column" align="stretch" spacing={5}>
      <Text size="sm" weight={500}>{label}</Text>

      <Group direction="column" align="stretch">
        {blocks.map((fields) => (
          <SectionBlockForm>
            {fields}
          </SectionBlockForm>
        ))}
      </Group>
    </Group>
  )
}