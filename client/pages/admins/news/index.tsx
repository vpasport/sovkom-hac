import type { NextPage, GetServerSideProps } from 'next';
import type { INews } from '../../../types/news';
import type { NewsProps } from './news';

import { useRouter } from 'next/router';
import { useEffect, useState, useRef, useCallback, useMemo } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import moment from 'moment';

import { Menu, Forms } from '../../../components';

import { useSocket } from '../../../hooks';
import { toClassNames } from '../../../helpers';

import * as userApi from '../../../api/user';
import * as newsApi from '../../../api/news';

import styles from './style.module.scss';
import { toClassName } from '../../../utils';

const News: NextPage<NewsProps> = ({ news }) => {
  const router = useRouter();

  const { initSocket } = useSocket();
  const [_news, setNews] = useState<INews[]>(news);
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const toast = useRef<Toast>(null);

  const leftToolbarTemplate = useMemo(
    () => (
      <>
        <Button
          label="Create"
          icon="pi pi-plus"
          className={toClassName(styles.button, 'p-button-success')}
          onClick={() => setIsCreate(true)}
        />
      </>
    ),
    [setIsCreate],
  );

  useEffect(() => {
    initSocket([
      {
        event: 'update',
        handler: (message: string) =>
          message === 'news' &&
          newsApi
            .getAll()
            .then((res) => {
              setNews(res.data);
              toast.current?.show({
                severity: 'success',
                detail: 'News table update',
                life: 3000,
              });
            })
            .catch((err) => console.error(err)),
      },
    ]);
  }, []);

  const createHandler = useCallback((data: INews) => {
    setIsCreating(true);

    const fd = new FormData();
    fd.append('title', data.title);
    fd.append('image', data.image as File);
    fd.append('description', data.description);

    newsApi
      .create(fd)
      .then(() => {
        setIsCreating(false);
        setIsCreate(false);
        toast.current?.show({
          severity: 'success',
          summary: 'Succes',
          detail: 'News create',
          life: 3000,
        });
      })
      .catch((error) => {
        console.log(error);
        setIsCreating(false);
        toast.current?.show({
          severity: 'error',
          summary: 'Error',
          life: 3000,
        });
      });
  }, []);

  const removeHandler = useCallback(
    (id: number) =>
      newsApi
        .remove(id)
        .then(() =>
          toast.current?.show({
            severity: 'success',
            summary: 'Success',
            detail: 'News delete',
            life: 3000,
          }),
        )
        .catch((err) => {
          console.log(err);
          toast.current?.show({
            severity: 'error',
            summary: 'Error',
            life: 3000,
          });
        }),
    [],
  );

  const imageTemplate = (rowData: INews) => (
    <img
      className={styles.table_image}
      src={`${process.env.NEXT_PUBLIC_API_URL}/upload${rowData.image}`}
      alt={rowData.title}
    />
  );

  const authorTemplate = (rowData: INews) => (
    <span
      className={styles.table_author}
      onClick={() => router.push('/admins/users')}
    >
      {rowData.author?.toString()}
    </span>
  );

  const createDateTemplate = (rowData: INews) => (
    <span>{moment(rowData.create_date).format('DD.MM.YY HH:mm')}</span>
  );

  const actionsTemplate = (rowData: INews) => (
    <Button
      icon="pi pi-trash"
      className="p-button-rounded p-button-danger"
      onClick={() => removeHandler(rowData.id as number)}
    />
  );

  return (
    <div className={styles.page}>
      <Menu admin />
      <div className={toClassNames(styles.root)}>
        <Toolbar
          left={leftToolbarTemplate}
          className={styles['root-toolbar']}
        />

        <DataTable
          value={_news}
          showGridlines
          onRowClick={({ data }: { data: INews }) =>
            router.push(`/news/${data.id}`)
          }
          rowClassName={() => styles.table_row}
        >
          <Column field="id" header="ID" sortable style={{ width: '10%' }} />
          <Column
            body={imageTemplate}
            header="Image"
            headerStyle={{ textAlign: 'center' }}
            style={{ width: '10%', textAlign: 'center' }}
          />
          <Column
            field="title"
            header="Title"
            sortable
            style={{ width: '45%', textAlign: 'left' }}
          />
          <Column
            sortable
            body={authorTemplate}
            header="Author"
            headerStyle={{ textAlign: 'center' }}
            style={{ width: '10%', textAlign: 'center' }}
          />
          <Column
            sortable
            body={createDateTemplate}
            header="Create"
            headerStyle={{ textAlign: 'center' }}
            style={{ width: '10%', textAlign: 'center' }}
          />
          <Column
            body={actionsTemplate}
            header="Tools"
            headerStyle={{ textAlign: 'center' }}
            style={{ width: '15%', textAlign: 'center' }}
          />
        </DataTable>

        <Dialog
          visible={isCreate}
          className={styles.modal}
          header="Create news"
          modal
          onHide={() => setIsCreate(false)}
        >
          <Forms.CreateNews isLoading={isCreating} onSubmit={createHandler} />
        </Dialog>

        <Toast ref={toast} />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req: {
    headers: { cookie },
  },
}) => {
  try {
    if (cookie && (await userApi.checkAuth(cookie))) {
      const { data: news } = await newsApi.getAll();

      return {
        props: { news },
      };
    }
    throw new Error('user not authorized');
  } catch (e) {
    console.error(e);
    return {
      redirect: {
        destination: '/admins/login',
        permanent: true,
      },
    };
  }
};

export default News;
