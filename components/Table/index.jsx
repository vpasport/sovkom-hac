import React from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { Button } from '@components';

import { classNames } from 'primereact/utils';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import styles from './styles.module.scss';

const Table = ({ columns = [], items = [], toggle }) => {
  const verifiedBodyTemplate = (rowData) => (
    <div className={styles.table_column__icon}>
      <i
        className={classNames('pi', {
          'true-icon pi-check-circle': rowData.verified,
          'false-icon pi-times-circle': !rowData.verified,
        })}
      />
    </div>
  );

  const typeData = (field) => {
    if (field === 'verified' || 'blocked') {
      return 'boolean';
    }
    return 'string';
  };

  const bodyRow = (field) => {
    if (field === 'verified') return verifiedBodyTemplate;
    if (field === 'blocked') return actionBodyTemplate;

    return '';
  };

  const changeStatus = (data, prop, value) => {
    const newData = data;
    newData[prop] = value;

    return toggle(items);
  };

  const actionBodyTemplate = (rowData) => (
    <>
      {!rowData.verified ? (
        <Button onClick={() => changeStatus(rowData, 'verified', true)}>
          Подтвердить
        </Button>
      ) : !rowData.blocked ? (
        <Button
          className={styles.table_btn__block}
          onClick={() => changeStatus(rowData, 'blocked', true)}
        >
          Блокировать
        </Button>
      ) : (
        <Button
          className={styles.table_btn__unblock}
          onClick={() => changeStatus(rowData, 'blocked', false)}
        >
          Разблокировать
        </Button>
      )}
    </>
  );

  return (
    <div>
      {!!items && (
        <DataTable
          className={styles.table}
          value={items}
          responsiveLayout="scroll"
        >
          {columns.map(({ index, ...col }) => (
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
