import {Group, Paper, Text} from "@mantine/core";
import {SectionDescriptor} from "../../../src";

type SectionFormProps = {
  fields: React.ReactNode;
  section: SectionDescriptor;
}

export function SectionForm(props: SectionFormProps) {
  const { fields, section } = props;

  return (
    <Paper padding={20}>
      <Text mb={20}>
        {section.name}
      </Text>

      <Group direction="column" spacing={10} align="stretch">
        {fields}
      </Group>
    </Paper>
  );
}