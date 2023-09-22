import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import lowlight from 'lowlight';

// Your custom React component
function CodeContent(props) {
  return (
    <div>
      <pre>
        <code>
          {props.children}
        </code>
      </pre>
      <button onClick={() => copyToClipboard(props.children.toString())}>
        Copy
      </button>
    </div>
  );
}

// Utility function to copy content to clipboard
function copyToClipboard(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

const CustomCodeBlockLowlight = CodeBlockLowlight.extend({
  addNodeView() {
    return {
      component: CodeContent,
      props: ['node'],
    };
  },
  addAttributes() {
    return {
      ...lowlight.listLanguages().reduce((acc, lang) => {
        acc[lang] = {
          default: false,
          parseHTML: element => {
            return element.classList.contains(lang);
          },
          renderHTML: attributes => {
            return {
              class: attributes[lang] ? `language-${lang}` : '',
            };
          },
        };

        return acc;
      }, {}),
    };
  },
});

export default CustomCodeBlockLowlight;
