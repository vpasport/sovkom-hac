import type { NextPage, GetServerSideProps } from 'next';
import type { UsersProps } from './users';
import type { IUser } from '../../../types/user';

import { useEffect, useMemo, useState, useCallback, useRef } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';

import { Menu, Forms } from '../../../components';
import * as userApi from '../../../api/user';
import { useSocket } from '../../../hooks';

import styles from './style.module.scss';
import { toClassName } from '../../../utils';

const Users: NextPage<UsersProps> = ({ users = [] }) => {
  const { initSocket } = useSocket();
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [_users, setUsers] = useState<IUser[]>(users);
  const toast = useRef<Toast>(null);

  const leftToolbarTemplate = useMemo(
    () => (
      <Button
        label="Create"
        icon="pi pi-plus"
        className={toClassName(styles.button, 'p-button-success')}
        onClick={() => setIsCreate(true)}
      />
    ),
    [setIsCreate],
  );
  const actionsTemplate = (rowData: IUser) => (
    <>
      <Button
        icon="pi pi-trash"
        className="p-button-rounded p-button-danger"
        onClick={() => removeHandler(rowData.id as number)}
      />
    </>
  );

  useEffect(() => {
    initSocket([
      {
        event: 'update',
        handler: (message: string) =>
          message === 'users' &&
          userApi
            .getAllUsers()
            .then((res) => {
              setUsers(res.data);
              toast.current?.show({
                severity: 'success',
                detail: 'User table update',
                life: 3000,
              });
            })
            .catch((err) => console.error(err)),
      },
    ]);
  }, []);

  const createHandler = useCallback((data: IUser) => {
    setIsCreating(true);
    userApi
      .register(data)
      .then(() => {
        setIsCreating(false);
        setIsCreate(false);
        toast.current?.show({
          severity: 'success',
          summary: 'Succes',
          detail: 'New user create',
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
      userApi
        .remove(id)
        .then(() =>
          toast.current?.show({
            severity: 'success',
            summary: 'Success',
            detail: 'User delete',
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

  return (
    <div className={styles.page}>
      <Menu admin />
      <div className={styles.root}>
        <Toolbar
          left={leftToolbarTemplate}
          className={styles['root-toolbar']}
        />
        <DataTable value={_users} showGridlines>
          <Column field="id" header="ID" sortable style={{ width: '20%' }} />
          <Column
            field="login"
            header="Login"
            sortable
            style={{ width: '60%', textAlign: 'left' }}
          />
          <Column
            body={actionsTemplate}
            header="Tools"
            headerStyle={{ textAlign: 'center' }}
            style={{ width: '20%', textAlign: 'center' }}
          />
        </DataTable>

        <Dialog
          visible={isCreate}
          className={styles.modal}
          header="Create user"
          modal
          onHide={() => setIsCreate(false)}
        >
          <Forms.CreateUser isLoading={isCreating} onSubmit={createHandler} />
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
      const { data: users } = await userApi.getAllUsers(cookie);

      return {
        props: { users },
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

export default Users;
