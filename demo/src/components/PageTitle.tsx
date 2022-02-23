import {Group, Text, useMantineTheme} from "@mantine/core";
import {GiSteeringWheel} from "react-icons/all";

export type PageTitleProps = {
  title: string;
  subtext: string;
}

export function PageTitle(props: PageTitleProps) {
  const { title, subtext } = props;

  const theme = useMantineTheme();

  return (
    <Group direction="column" sx={{ height: "100vh", justifyContent: 'center' }}>
      <GiSteeringWheel color={theme.colors.red[6]} size="8rem" />

      <Text
        variant="gradient"
        size="xl"
        weight={800}
        gradient={{ from: 'red', to: 'grape', deg: 90 }}
        sx={{ lineHeight: 1.2, maxWidth: "50rem" }}
      >
        {title}
      </Text>

      <Text size="md" sx={{ lineHeight: 1.8, maxWidth: "70rem", marginTop: "4rem" }}>
        {subtext}
      </Text>
    </Group>
  )
}