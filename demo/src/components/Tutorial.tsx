import {Group, Text} from "@mantine/core";
import {TutorialStep} from "./TutorialStep";
import dedent from "dedent";

export type TutorialStep = {
  heading: string;
  subtext: string;
  code: string;
}

export type TutorialProps = {
  title: string;
  steps: TutorialStep[];
}

export function Tutorial({ title, steps }: TutorialProps) {
  return (
    <Group direction="column">
      <Text size="xl" variant="gradient" gradient={{ from: 'grape', to: 'blue' }} weight={700}>
        {title}
      </Text>

      <Group direction="column" spacing={100}>
        {steps.map((step) => <TutorialStep heading={step.heading} subtext={step.subtext} code={step.code} />)}
      </Group>
    </Group>
  )
}