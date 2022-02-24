import {createTemplate} from "../../../src";
import {pageTitleSection} from "../sections/pageTitle";
import {tutorialSection} from "../sections/tutorial";
import {homeData} from "./Home";
import {useEffect, useState} from "react";
import {Box, Container, Grid, Group, Paper} from "@mantine/core";
import {SectionForm} from "../editor/SectionForm";

const sections = [
  pageTitleSection,
  tutorialSection,
];

const useHomeTemplateEditor = createTemplate(sections);

export function HomeEditor() {
  const [data, setData] = useState(homeData);
  const [components, sectionForms] = useHomeTemplateEditor(data, setData);

  // Hack. Feels redundant, but otherwise when you click "Edit this page" at the bottom of the homepage,
  // it stays stuck to the bottom.
  useEffect(() => {
    document.scrollingElement?.scrollTo({ top: 0 });
  }, []);

  return (
    <Box>
      <Grid>
        <Grid.Col span={3}>
          <Group direction="column" spacing={20} align="stretch" sx={{ padding: '20px' }}>
            {sectionForms.map((fields, index) => {
              const section = sections.find((s) => s.id === data[index].type);
              if (!section) {
                return <span>Missing section type: {data[index].type}</span>
              }

              return <SectionForm fields={fields} section={section} />;
            })}
          </Group>
        </Grid.Col>

        <Grid.Col span={9}>
          {components}
        </Grid.Col>
      </Grid>
    </Box>
  )
}