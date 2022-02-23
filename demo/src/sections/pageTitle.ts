import {SectionDescriptor, sectionField} from '../../../src/sectionField';
import {PageTitle, PageTitleProps} from "../components/PageTitle";
import {TextField} from "../fields/TextField";

export const pageTitleBase = {
  id: 'page-title',
  name: 'Page title',
  component: PageTitle,
}

export const pageTitleSection: SectionDescriptor<PageTitleProps> = {
  ...pageTitleBase,
  fields: {
    title: sectionField(TextField, { label: 'Title' }),
    subtext: sectionField(TextField, { label: 'Title' }),
  },
  defaults: {
    title: 'New page',
    subtext: 'Give some extra context here.'
  }
}