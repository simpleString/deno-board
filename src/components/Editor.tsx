import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import CodeMirror from "@uiw/react-codemirror";
import React from "react";

const Editor = () => {
  const [value, setValue] = React.useState("console.log('hello world!');");

  const onChange = React.useCallback((val: React.SetStateAction<string>) => {
    console.log("val:", val);
    setValue(val);
  }, []);

  return (
    <CodeMirror
      value={value}
      theme="dark"
      className="h-full"
      height="100%"
      extensions={[
        markdown({ base: markdownLanguage, codeLanguages: languages }),
      ]}
      onChange={onChange}
    />
  );
};

export default Editor;
