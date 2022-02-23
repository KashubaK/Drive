import {Container} from "@mantine/core";
import {TemplateSections} from "../../../src/createTemplate";
import {pageTitleBase} from "../sections/pageTitle";
import {tutorialSectionBase} from "../sections/tutorial";

export function Home() {
  const sections = [
    {
      id: 0,
      type: 'page-title',
      title: 'Drive data into your components.',
      subtext: `
        Don't pay for a CMS just to get a nice editor. Describe your data model using React components, build the
        editing experience you need, and let Drive connect the dots.
        
        You own all the markup, we don't inject anything extra. We know everyone has their own needs, and it's our
        mission to not get in the way.
      `,
    },
    {
      id: 1,
      type: 'tutorial',
      title: 'See Drive in action.',
      steps: [],
    }
  ];

  return (
    <Container size="xl">
      <TemplateSections sections={[pageTitleBase, tutorialSectionBase]} datas={sections} />
    </Container>
  )
}