export type contentType = 'json' | 'formData';

export interface IHeaders {
  cookie?: string;
  contentType?: contentType;
}
