import {useSectionEditor} from "../../../src";
import {pageTitleSection} from "../sections/pageTitle";
import {tutorialSection} from "../sections/tutorial";
import {homeData} from "./Home";
import {useEffect, useState} from "react";
import {Box, Grid, Group} from "@mantine/core";
import {SectionForm} from "../editor/SectionForm";

export function HomeEditor() {
  const [data, setData] = useState(homeData);

  const { renderFields, renderSections } = useSectionEditor([pageTitleSection, tutorialSection], {
    value: data,
    onChange: setData,
  });

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
            {renderFields(SectionForm)}
          </Group>
        </Grid.Col>

        <Grid.Col span={9}>
          {renderSections(({ contents }) => <>{contents}</>)}
        </Grid.Col>
      </Grid>
    </Box>
  )
}