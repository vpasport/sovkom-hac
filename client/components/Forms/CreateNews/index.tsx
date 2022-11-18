import type { FC } from 'react';
import type { INews } from '../../../types/news';
import type { CreateNewsProps, INewsForm } from './index.types';

import { useRef } from 'react';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';

import { Loader, TextEditor } from '../../';

import styles from './style.module.scss';
import { toClassName } from '../../../utils';

type FormKeys = 'title' | 'description' | 'image';

const CreateNews: FC<CreateNewsProps> = ({
  isLoading = false,
  onSubmit = () => {},
}) => {
  const uploadRef = useRef<FileUpload>(null);

  const formik = useFormik<INewsForm>({
    initialValues: {
      title: '',
      description: '',
      image: null,
    },
    validate: (data) => {
      const errors: { [key in FormKeys]?: string } = {};

      if (!data.title) errors.title = 'Enter title';
      if (!data.image) errors.image = 'Chose image';

      let fl = false;
      const texts: HTMLCollectionOf<HTMLParagraphElement> = new DOMParser()
        .parseFromString(data.description, 'text/html')
        .getElementsByTagName('p');
      for (let i = 0; i < texts.length; i++) {
        if (!!texts[i].innerText.trim()) {
          fl = true;
          break;
        }
      }

      if (!fl) errors.description = 'Enter description';

      return errors;
    },
    onSubmit: (data) =>
      onSubmit({
        title: data.title,
        image: data.image,
        description: data.description,
      } as unknown as INews),
  });

  const isFormFieldValid = (name: FormKeys) =>
    !!(formik.touched[name] && formik.errors[name]);

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      {isLoading && (
        <div className={styles.loader}>
          <Loader />
        </div>
      )}
      <div className={styles.form_field}>
        <span className="p-float-label">
          <InputText
            id="title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            autoFocus
            className={toClassName(
              styles.form_field_input,
              isFormFieldValid('title') && styles.form_field__error,
            )}
          />
          <label
            htmlFor="title"
            className={toClassName(
              isFormFieldValid('title') && styles.form_field__error,
            )}
          >
            Title*
          </label>
        </span>
      </div>
      <div className={toClassName(styles.form_field, styles.form_field_image)}>
        <label
          className={toClassName(
            isFormFieldValid('image') && styles.form_field__error,
          )}
        >
          Image*
        </label>
        {formik.values.image?.objectURL && (
          <img
            src={formik.values.image.objectURL}
            alt={formik.values.title || 'news image'}
          />
        )}
        <div className={styles.form_field_image_buttons}>
          <FileUpload
            ref={uploadRef}
            mode="basic"
            name="image"
            accept="image/*"
            auto={false}
            maxFileSize={1000000}
            onSelect={(e) => {
              formik.setFieldValue('image', e.files[0]);
            }}
            customUpload={true}
          />
          <Button
            label="Clear"
            onClick={() => {
              uploadRef.current?.clear();
              formik.setFieldValue('image', null);
            }}
          />
        </div>
      </div>
      <div className={styles.form_field}>
        <label
          className={toClassName(
            isFormFieldValid('description') && styles.form_field__error,
          )}
        >
          Description*
        </label>
        <TextEditor
          initValue={formik.values.description}
          onChange={(e: string) => {
            formik.setFieldValue('description', e);
          }}
          className={toClassName(
            isFormFieldValid('description') && styles.form_field__error,
          )}
        />
      </div>
      <Button
        label="Create"
        type="submit"
        onClick={() => formik.handleSubmit()}
      />
    </form>
  );
};

export { CreateNews };
