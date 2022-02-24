import {SectionDescriptor, sectionField} from "../../../src/sectionField";
import {Tutorial, TutorialProps} from "../components/Tutorial";
import {TextField} from "../fields/TextField";
import {groupList} from "../../../src/groupList";
import {TutorialStepProps} from "../components/TutorialStep";
import {SectionGroupList} from "../editor/SectionGroupList";

export const tutorialSectionBase = {
  id: 'tutorial',
  name: 'Tutorial',
  component: Tutorial,
};

export const tutorialSection: SectionDescriptor<TutorialProps> = {
  ...tutorialSectionBase,
  fields: {
    title: sectionField(TextField, { label: 'Title' }),
    steps: groupList<TutorialStepProps>({
      render: ({ blocks }) => <SectionGroupList blocks={blocks} label="Steps" />,
      fields: {
        heading: sectionField(TextField, { label: 'Heading' }),
        subtext: sectionField(TextField, { label: 'Sub-text' }),
        code: sectionField(TextField, { label: 'Code', multiline: true }),
      }
    })
  },
  defaults: {
    title: 'New tutorial',
    steps: [],
  }
}