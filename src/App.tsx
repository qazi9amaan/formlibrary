import { ITableHeader, Table } from '../index';

type IBook = {
  name: string;
  author: string;
};

const header: ITableHeader<IBook> = [
  { type: 'string', label: 'Name', sortable: true, key: 'name' },
  { type: 'string', label: 'Author', key: 'author' },
  { type: 'actions', label: 'Actions', actions: ['view'] },
];

const books: IBook[] = [
  {
    name: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
  },
];

export const App = () => {
  //
  return (
    <Table
      idKey='name' // key to be used as unique identifier
      showSelect // show checkbox
      showSearch // show search input
      header={header} // table header
      data={books} // table data
      selectActions={['view', 'edit']} // actions to be shown in when checkbox is selected
      handleActions={console.log} // handle actions when clicked
      handleCellClick={console.log} // handle cell click
      handleSelectAction={console.log} // handle select action
      pagination={{
        totalPages: 10, // total number of pages
        page: 1, // current page
        handlePagination: console.log, // handle pagination
      }}
    />
  );
};
