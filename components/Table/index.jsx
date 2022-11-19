import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const Table = ({ items }) => (
  <div>
    {!!items && (
      <DataTable value={items} responsiveLayout="scroll">
        {items.map(({ id, ...item }) => (
          <Column key={id} field={item.field} header={item.header} />
        ))}
      </DataTable>
    )}
  </div>
);

export { Table };
