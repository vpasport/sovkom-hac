export interface TextEditorProps {
  initValue?: string;
  onChange: (str: string) => void;
  className?: string;
  placeholder?: string;
  namespace?: string;
}

export interface SetInitTextProps {
  value: string;
}

export interface ChangeTextProps {
  onChange: (str: string) => void;
}

export interface TextViewerProps {
  value: string;
  className?: string;
}
