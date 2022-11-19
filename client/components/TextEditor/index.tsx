import type { FC } from 'react';
import type {
  TextEditorProps,
  SetInitTextProps,
  ChangeTextProps,
  TextViewerProps,
} from './index.types';

import { useEffect } from 'react';

import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html';
import { $getRoot, $getSelection } from 'lexical';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { TRANSFORMERS } from '@lexical/markdown';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { theme } from './theme';
import {
  PlaygroundAutoLinkPlugin as AutoLinkPlugin,
  CodeHighlightPlugin,
  ListMaxIndentLevelPlugin,
  ToolbarPlugin,
} from './plugins';

import { toClassName } from '../../utils/toClassName';

function Placeholder({ text = '' }) {
  return (
    <div className="editor-placeholder">
      {text ? text : 'Enter some rich text...'}
    </div>
  );
}

const editorConfig = {
  // The editor theme
  theme,
  onError: (err: any) => console.log(err),
  // Any custom nodes go here
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
  ],
};

const ChangeText: FC<ChangeTextProps> = ({ onChange = () => {} }) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        onChange($generateHtmlFromNodes(editor));
      });
    });
  }, [editor, onChange]);

  return null;
};

const SetInitText: FC<SetInitTextProps> = ({ value }) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.update(() => {
      const parser = new DOMParser();
      const dom = parser.parseFromString(value, 'text/html');
      $getRoot().select();
      const selection = $getSelection();
      !!selection && selection.insertNodes($generateNodesFromDOM(editor, dom));
    });
  }, [editor]);

  return null;
};

interface WrapperProps {
  children: React.ReactNode;
}
const Wrapper: FC<WrapperProps> = ({ children }) => {
  return <div className={'wrapper'}>{children}</div>;
};

const TextEditor: FC<TextEditorProps> = ({
  initValue = '',
  onChange = () => {},
  className = '',
  placeholder = '',
  namespace = 'text editor',
}) => {
  return (
    <Wrapper>
      <LexicalComposer initialConfig={{ ...editorConfig, namespace }}>
        <div className={toClassName('editor-container', className)}>
          <ToolbarPlugin />
          <div className="editor-inner">
            <RichTextPlugin
              contentEditable={<ContentEditable className="editor-input" />}
              placeholder={<Placeholder text={placeholder} />}
            />
            <HistoryPlugin />
            {/* <TreeViewPlugin /> */}
            <AutoFocusPlugin />
            <CodeHighlightPlugin />
            <ListPlugin />
            <LinkPlugin />
            <AutoLinkPlugin />
            <ListMaxIndentLevelPlugin maxDepth={7} />
            <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
            <ChangeText onChange={onChange} />
            <SetInitText value={initValue} />
          </div>
        </div>
      </LexicalComposer>
    </Wrapper>
  );
};

const TextViewer: FC<TextViewerProps> = ({ value, className = '' }) => {
  return (
    <Wrapper>
      <div className={className} dangerouslySetInnerHTML={{ __html: value }} />
    </Wrapper>
  );
};

export { TextEditor, TextViewer };
