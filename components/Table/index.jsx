import React from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { Button, Popup } from '@components';

import { classNames } from 'primereact/utils';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import styles from './styles.module.scss';

const Table = ({ columns = [], items = [], toggle, updatedRow }) => {
  const changeStatus = (data, prop, value) => {
    const newData = data;

    updatedRow(newData);
    newData[prop] = value;

    return toggle(items);
  };

  const verifiedBodyTemplate = (rowData) => (
    <div className={styles.table_column__icon}>
      <i
        className={classNames('pi', {
          'true-icon pi-check-circle': rowData.verify,
          'false-icon pi-times-circle': !rowData.verify,
        })}
      />
    </div>
  );

  const actionBodyTemplate = (rowData) => (
    <>
      {/* eslint-disable  */}
      {!rowData.verify ? (
        <Button onClick={() => changeStatus(rowData, 'verify', true)}>Подтвердить</Button>
      ) : !rowData.blocked ? (
        <Popup
          type="confirm"
          button="button"
          confirm={(val) => changeStatus(rowData, 'blocked', val)}
          buttonText="Блокировать"
          buttonPopupConfirm="Да"
          buttonPopupDelete="Отмена"
          classNameButton={styles.table_btn__block}
          contentLabel=""
        >
          Вы хотите заблокировать пользователя?
        </Popup>
      ) : (
        <Button
          className={styles.table_btn__unblock}
          onClick={() => changeStatus(rowData, 'blocked', false)}
        >
          Разблокировать
        </Button>
      )}
      {/* eslint-unable  */}
    </>
  );

  const typeData = (field) => {
    if (field === 'verify' || field === 'blocked') {
      return 'boolean';
    }
    return 'string';
  };

  const bodyRow = (field) => {
    if (field === 'verify') return verifiedBodyTemplate;
    if (field === 'blocked') return actionBodyTemplate;

    return '';
  };

  return (
    <div>
      {!!items && (
        <DataTable className={styles.table} value={items} responsiveLayout="scroll">
          {columns.map((col) => (
            <Column
              className={styles.table_column}
              key={col.id}
              field={col.field}
              header={col.header}
              dataType={typeData(col.field)}
              body={bodyRow(col.field)}
            />
          ))}
        </DataTable>
      )}
    </div>
  );
};

export { Table };
