import {Button, Container, Group} from "@mantine/core";
import {TemplateSections} from "../../../src/components/TemplateSections";
import {pageTitleBase} from "../sections/pageTitle";
import {tutorialSectionBase} from "../sections/tutorial";
import dedent from "dedent";
import {Link} from "react-router-dom";

export const homeData = [
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
    steps: [
      {
        heading: 'Start with the content.',
        subtext: 'What does it look like? What data does it need?',
        code: dedent`
          // You'll need this props type later. 
          export type HeadingWithParagraphProps = {
            heading: string;
            content: string;
          }
          
          function HeadingWithParagraph({ heading, content }: HeadingWithParagraphProps) {
            return (
              <section>
                <h2>{heading}</h2>
                <p>{content}</p>
              </section>
            );
          }
        `,
      },
      {
        heading: 'Define a field that can provide data for your content.',
        subtext: 'Fields need to accept \'value\' and \'onChange\' props.',
        code: dedent`
          type TextFieldProps = {
            label: string;
            value: string;
            onChange: (value: string) => void;
          }
          
          export function TextField({ label, value, onChange }: TextFieldProps) {
            return (
              <div className="TextField">
                <label>{label}</label>
                <input value={value} onChange={e => onChange(e.target.value)} />
              </div>
            );
          }
        `,
      },
      {
        heading: 'Model your content with a Drive section.',
        subtext: dedent`
          TextField can consume and propagate a string value, and HeadingWithParagraph needs strings for its props.
          Coincidence? I think not! If you're using TypeScript, it will make sure only compatible fields can be
          connected to the right props.
        `,
        code: dedent`
          import { sectionField, SectionDescriptor } from 'drive';
          
          const textWithParagraphSection: SectionDescriptor<HeadingWithParagraphProps> = {
            id: 'heading-with-paragraph',
            name: 'Heading with paragraph',
            component: HeadingWithParagraph,
            fields: {
              heading: sectionField(TextField, { label: 'Heading' }),
              content: sectionField(TextField, { label: 'Content' })
            },
            defaults: {
              heading: 'New content block',
              content: 'Lorem ipsum sit dolor amet...'
            },
          };
        `,
      },
      {
        heading: 'Tie your section into a template editor.',
        subtext: dedent`
          It's all coming together. Pull your data from wherever you want, and provide Drive a way to push changes.
        `,
        code: dedent`
          import { useSectionEditor } from 'drive';
        
          export function Editor() {
            const [sectionData, setSectionData] = useState([
              {
                id: 0,
                type: 'text-with-paragraph',
                heading: 'Check me out!',
                content: 'Lorem ipsum sit dolor amet...',
              }
            ]);
            
            const { renderFields, renderSections } = useSectionEditor(
              [textWithParagraphSection],
              {
                value: sectionData,
                onChange: setSectionData,
              },
            );
            
            return (
              <div className="Editor">
                <div className="EditorForms">
                  {renderFields(({ fields }) => (
                    /*
                      \`fields\` contains markup for each field rendered by a section.
                      
                      In this case, it looks like this:
                      
                      <>
                        <TextField label="Heading" value="Check me out!" onChange={...} />
                        <TextField label="Content" value="Lorem ipsum sit dolor amet..." onChange={...} />
                      </>
                    */
                    
                    <form className="EditorForm">
                      {fields}
                    </form>
                  ))}
                </div>
                
                <div className="EditorSections">
                  {renderSections(({ contents }) => (
                    /*
                    
                    */
                    <div className="SectionContents">
                      {contents}
                    </div>
                  ))}
                </div>
              </div>
            );
          }
        `,
      },
    ],
  }
]

export function Home() {
  return (
    <Container size="xl">
      <TemplateSections sections={[pageTitleBase, tutorialSectionBase]} datas={homeData} />

      <Group my={50}>
        <Button
          component={Link}
          to="/editor"
          size="xl"
          variant="gradient"
          gradient={{ from: 'blue', to: 'green' }}
          sx={{ fontSize: '1.6rem' }}
        >
          Edit this page
        </Button>
      </Group>
    </Container>
  )
}