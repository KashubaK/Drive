import {Group, Paper} from "@mantine/core";

type SectionBlockFormProps = {
  children?: React.ReactNode;
}

export function SectionBlockForm(props: SectionBlockFormProps) {
  return (
    <Paper withBorder shadow="xl" padding={10} sx={{ backgroundColor: 'rgb(230, 230, 230)' }}>
      <Group direction="column" align="stretch">
        {props.children}
      </Group>
    </Paper>
  )
}