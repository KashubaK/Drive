import { useState } from 'react'
import logo from './logo.svg'
import './App.css'

import {createSection, SectionDescriptor, sectionField} from "../../src/hooks/useSection";
import {createTemplate} from "../../src/createTemplate";

type TextFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

const TextSectionField = (props: TextFieldProps) => {
  return (
    <div>
      <label>{props.label}</label>
      <input value={props.value} onChange={(e) => props.onChange(e.target.value)} />
    </div>
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
};

type TextWithImageSection = {
  image: string;
  content: string;
}

const textWithImage: SectionDescriptor<TextWithImageSection> = {
  name: 'text-with-image',
  component: (props) => (
    <div>
      <img src={props.image} />

      <p>{props.content}</p>
    </div>
  ),
  fields: {
    image: sectionField(TextSectionField, { label: 'Image URL' }),
    content: sectionField(TextSectionField, { label: 'Content' })
  },
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

  const [sections, forms] = usePostTemplate(sectionDatas, setSectionDatas);

  return (
    <div className="App" style={{ display: 'flex' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {forms.map((form) => (
          <div style={{ display: 'inline-block' }}>
            {form}
            <br />
            <br />
          </div>
        ))}
      </div>

      <main style={{ marginLeft: 'auto', marginRight: 'auto' }}>
        {sections}
      </main>
    </div>
  )
}

export default App
