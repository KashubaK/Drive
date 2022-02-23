import {SectionDescriptor, sectionField} from '../../../src/sectionField';
import {PageTitle, PageTitleProps} from "../components/PageTitle";
import {TextField, TextFieldProps} from "../fields/TextField";
import {ComponentProps, FunctionComponent} from "react";

export const pageTitleBase = {
  id: 'page-title',
  name: 'Page title',
  component: PageTitle,
}

export const pageTitleSection: SectionDescriptor<PageTitleProps> = {
  ...pageTitleBase,
  fields: {
    title: sectionField(TextField, { label: 'Title' }),
    subtext: sectionField(TextField, { label: 'Subtext' }),
  },
  defaults: {
    title: 'New page',
    subtext: 'Give some extra context here.'
  }
}
