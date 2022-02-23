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
        {title/*See Drive in action.*/}
      </Text>

      <Group direction="column" spacing={100}>
        {steps.map((step) => <TutorialStep heading={step.heading} subtext={step.subtext} code={step.code} />)}

        {/*<TutorialStep*/}
        {/*  heading="Start with the content."*/}
        {/*  subtext="What does it look like, what data does it need?"*/}
        {/*  code={dedent`*/}
        {/*    type HeadingWithParagraphProps = {*/}
        {/*      heading: string;*/}
        {/*      content: string;*/}
        {/*    }*/}
        {/*    */}
        {/*    function HeadingWithParagraph({ heading, content }: HeadingWithParagraphProps) {*/}
        {/*      return (*/}
        {/*        <section>*/}
        {/*          <h2>{heading}</h2>*/}
        {/*          <p>{content}</p>*/}
        {/*        </section>*/}
        {/*      );*/}
        {/*    }*/}
        {/*  `}*/}
        {/*/>*/}

        {/*<TutorialStep*/}
        {/*  heading="Define a field that can provide data for your content."*/}
        {/*  subtext="Fields need to accept 'value' and 'onChange' props."*/}
        {/*  code={dedent`*/}
        {/*    type TextFieldProps = {*/}
        {/*      label: string;*/}
        {/*      value: string;*/}
        {/*      onChange: (value: string) => void;*/}
        {/*    }*/}
        {/*    */}
        {/*    export function TextField({ label, value, onChange }: TextFieldProps) {*/}
        {/*      return (*/}
        {/*        <div className="TextField">*/}
        {/*          <label>{label}</label>*/}
        {/*          <input value={value} onChange={e => onChange(e.target.value)} />*/}
        {/*        </div>*/}
        {/*      );*/}
        {/*    }*/}
        {/*  `}*/}
        {/*/>*/}

        {/*<TutorialStep*/}
        {/*  heading="Model your content with a Drive section."*/}
        {/*  subtext={dedent`*/}
        {/*    TextField can consume and propagate a string value, and HeadingWithParagraph needs strings for its props.*/}
        {/*    Coincidence? I think not! If you're using TypeScript, it will make sure only compatible fields can be*/}
        {/*    connected to the right props.*/}
        {/*  `}*/}
        {/*  code={dedent`*/}
        {/*    import { sectionField, createSection } from 'drive';*/}
        {/*    */}
        {/*    const textWithParagraphSection = createSection<HeadingWithParagraphProps>({*/}
        {/*      id: 'heading-with-paragraph',*/}
        {/*      name: 'Heading with paragraph',*/}
        {/*      component: HeadingWithParagraph,*/}
        {/*      fields: {*/}
        {/*        heading: sectionField(TextField, { label: 'Heading' }),*/}
        {/*        content: sectionField(TextField, { label: 'Content' })*/}
        {/*      },*/}
        {/*      defaults: {*/}
        {/*        heading: 'New content block',*/}
        {/*        content: 'Lorem ipsum sit dolor amet...'*/}
        {/*      },*/}
        {/*    });*/}
        {/*  `}*/}
        {/*/>*/}

        {/*<TutorialStep*/}
        {/*  heading="Tie your section into a template editor."*/}
        {/*  subtext={dedent`*/}
        {/*    It's all coming together. Pull your data from wherever you want, and provide Drive a way to push changes.*/}
        {/*  `}*/}
        {/*  code={dedent`*/}
        {/*    import { createTemplate } from 'drive';*/}
        {/*  */}
        {/*    const useTemplate = createTemplate([*/}
        {/*      textWithParagraphSection,*/}
        {/*    ]);*/}
        {/*    */}
        {/*    export function Editor() {*/}
        {/*      const [sectionData, setSectionData] = useState([*/}
        {/*        {*/}
        {/*          id: 0,*/}
        {/*          type: 'text-with-paragraph',*/}
        {/*          heading: 'Check me out!',*/}
        {/*          content: 'Lorem ipsum sit dolor amet...',*/}
        {/*        }*/}
        {/*      ]);*/}
        {/*      */}
        {/*      const [sections, sectionForms] = useTemplate(sectionData, setSectionData);*/}
        {/*      */}
        {/*      return (*/}
        {/*        <div className="Editor">*/}
        {/*          <div className="EditorForms">*/}
        {/*            {sectionForms.map((fields) => (*/}
        {/*              /**/}
        {/*                \`fields\` contains markup for each field rendered by a section.*/}
        {/*                */}
        {/*                It looks like this:*/}
        {/*                */}
        {/*                <>*/}
        {/*                  <TextField label="Heading" value="Check me out!" onChange={...} />*/}
        {/*                  <TextField label="Content" value="Lorem ipsum sit dolor amet..." onChange={...} />*/}
        {/*                </>*/}
        {/*              */}
        {/*              <form className="EditorForm">*/}
        {/*                {fields}*/}
        {/*              </form>*/}
        {/*            )}*/}
        {/*          </div>*/}
        {/*          */}
        {/*          <div className="EditorSections">*/}
        {/*            {sections}*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*      );*/}
        {/*    }*/}
        {/*  `}*/}
        {/*/>*/}
      </Group>
    </Group>
  )
}