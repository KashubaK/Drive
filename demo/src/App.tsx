import { useState } from 'react'
import logo from './logo.svg'
import './App.css'

import {createSection, SectionDescriptor, sectionField} from "../../src/hooks/useSection";
import {createTemplate} from "../../src/createTemplate";
import {Text, Grid, Group, TextInput, Paper, Button} from "@mantine/core";
import { sentenceCase } from 'change-case';

type TextFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

const TextSectionField = (props: TextFieldProps) => {
  return (
    <TextInput label={props.label} value={props.value} onChange={e => props.onChange(e.target.value)} />
  );
};

type PostIntroDict = {
  title: string;
  content: string;
  author: string;
}

const PostIntro = ({ title, content, author }: PostIntroDict) => {
  return (
    <div>
      <h1>{title}</h1>
      <h3>By: {author}</h3>
      <section>{content}</section>
    </div>
  );
}

const postIntroSection: SectionDescriptor<PostIntroDict> = {
  name: 'post-intro',
  component: PostIntro,
  fields: {
    title: sectionField(TextSectionField, { label: 'Title' }),
    author: sectionField(TextSectionField, { label: 'Author' }),
    content: sectionField(TextSectionField, { label: 'Content' }),
  },
  defaults: {
    title: 'Something awesome!',
    author: 'Someone awesome!',
    content: 'Hello world!!!!',
  }
};

type TextWithImageSection = {
  image: string;
  content: string;
}

const textWithImage: SectionDescriptor<TextWithImageSection> = {
  name: 'text-with-image',
  component: (props) => (
    <div>
      <img src={props.image} style={{ maxWidth: '100%' }} />

      <p>{props.content}</p>
    </div>
  ),
  fields: {
    image: sectionField(TextSectionField, { label: 'Image URL' }),
    content: sectionField(TextSectionField, { label: 'Content' })
  },
  defaults: {
    image: 'http://placekitten.com/g/1080/1080',
    content: 'Hello world',
  }
};

const usePostTemplate = createTemplate([
  postIntroSection,
  textWithImage
]);

function App() {
  const [sectionDatas, setSectionDatas] = useState([
    {
      id: 0,
      type: 'post-intro',
      title: 'Introducing Drive: a way to dynamically render editable content',
      content: 'Hello world!',
      author: 'Kyle Kashuba',
    },
    {
      id: 1,
      type: 'text-with-image',
      image: 'http://placekitten.com/g/1920/1080',
      content: 'Look at these cat(s).',
    },
    {
      id: 2,
      type: 'post-intro',
      title: 'Introducing Drive: a way to dynamically render editable content',
      content: 'Hello world!',
      author: 'Kyle Kashuba',
    },
  ]);

  const [sections, fieldSets, { generate }] = usePostTemplate(sectionDatas, setSectionDatas);

  return (
    <Grid>
      <Grid.Col span={3}>
        <Group direction="column" align="center" spacing="1.5rem" sx={{ padding: '1rem', maxHeight: '100vh', overflowY: 'auto', flexWrap: 'nowrap' }}>
          {fieldSets.map((fields, index) => (
            <Paper padding="md" shadow="xs" radius="1rem" sx={{ width: '100%' }}>
              <Text size="sm" transform="uppercase" weight="bold" color="gray" sx={{ letterSpacing: '0.5px', marginBottom: '1rem' }}>
                #{index + 1}: {sentenceCase(sectionDatas[index].type)}
              </Text>

              <Group direction="column" align="stretch">
                {fields}
              </Group>
            </Paper>
          ))}

          <Button onClick={() => addSection(generate('text-with-image'))} sx={{ flexShrink: 0 }}>
            Add text with image
          </Button>
        </Group>
      </Grid.Col>

      <Grid.Col span={9} sx={{ backgroundColor: 'white' }}>
        <Group direction="column" sx={{ maxHeight: '100vh', overflowY: 'auto', flexWrap: 'nowrap' }}>
          {sections}
        </Group>
      </Grid.Col>
    </Grid>
  );

  function addSection(section: typeof sectionDatas[number]) {
    setSectionDatas((current) => [...current, section]);
  }
}

export default App
