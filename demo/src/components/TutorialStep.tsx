import {Group, Text} from "@mantine/core";
import {Prism} from "@mantine/prism";

export type TutorialStepProps = {
  heading: string;
  subtext: string;
  code: string;
}

export function TutorialStep({ heading, subtext, code }: TutorialStepProps) {
  return (
    <Group direction="column">
      <Text size="lg" weight={600}>
        {heading}
      </Text>

      <Text size="md">
        {subtext}
      </Text>

      <Prism language="tsx" colorScheme="dark" sx={{ marginTop: '2rem' }}>
        {code}
      </Prism>
    </Group>
  )
}