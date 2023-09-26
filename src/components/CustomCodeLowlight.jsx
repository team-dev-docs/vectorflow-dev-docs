import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import React, { useRef, useState } from 'react';

const ClipboardIcon = () => (
  <svg
    class="copy-svg copyButtonIcon_node_modules-@docusaurus-theme-classic-lib-theme-CodeBlock-CopyButton-styles-module"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path>
  </svg>
);

const SuccessIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 6L9 17L4 12" stroke="blue" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default ({ node: { attrs: { language: defaultLanguage } }, updateAttributes, extension }) => {
  const codeRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (codeRef.current && codeRef.current.firstChild) {
        const codeContent = codeRef.current.firstChild.textContent;
        navigator.clipboard.writeText(codeContent).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    }
};

  return (
    <NodeViewWrapper className="code-block">
      <div style={{ position: 'relative' }}>
        <button className="copy-btn" onClick={handleCopy}>
          {copied ? <SuccessIcon /> : <ClipboardIcon />}
        </button>
        <pre ref={codeRef}>
          <NodeViewContent as="code" />
        </pre>
      </div>
    </NodeViewWrapper>
  );
};