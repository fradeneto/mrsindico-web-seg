import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { DataTable } from 'components';
//import MaterialTable from 'material-table'
import { getTable } from "services/UnidadeService";
import IconButton from "@material-ui/core/IconButton";
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
//import { MaterialTableTitle } from 'components';
//import MaterialTable from 'material-table'

const styles = theme => ({
  demo: {
    height: 'auto',
  },
  divider: {
    margin: `${theme.spacing(3)}px 0`,
  },
  field: {
    margin: `${theme.spacing(3)}px 5px`,
  },
  button: {
    margin: theme.spacing(1),
  },
  inputUpload: {
    display: 'none',
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  iconSmall: {
    fontSize: 20,
  },
});

const TablePage = props => {
  const { classes, history } = props;

  const tableRef = React.createRef();

  const columns = [
    {
      title: "Torre",
      field: "grupo.nome",
      type: "string", 
      filterPlaceholder: 'Torre'
    },
    { title: "Apto", field: "nome", type: "string", editable: "onAdd", filterPlaceholder: 'Apartamento' },
    {
      title: "Ações",
      cellStyle: { width: "130px", textAlign: "left" },
      render: rowData => {
        return (
          <React.Fragment>
            <Button onClick={() => {history.push(`/app/${rowData.id}`)}} style={{margin:0}} className={classes.button} variant="contained" color="primary">
            <Icon className={classes.leftIcon}>send</Icon>
              Editar
            </Button>
          </React.Fragment>
        );
      }
    }
  ];

  return (
    <DataTable
      tableRef={tableRef}
      style={cssTabela}
      title="Unidades"
      columns={columns}
      data={query =>
        new Promise((resolve, reject) => {
          //console.log(query);
          getTable(query).then(result => {
            resolve({
              data: result.data.data,
              page: result.data.page,
              totalCount: result.data.total
            });
          });
        })
      }
      editable={{}}
      actions={[
        {
          icon: "refresh",
          tooltip: "Refresh Data",
          isFreeAction: true,
          onClick: () => tableRef.current && tableRef.current.onQueryChange()
        }
      ]}
    />
  );
};

const cssTabela = {

};

//const cssRowStyle = {  fontSize: "20px" };

export default withStyles(styles)(TablePage);


/*
class TablePage extends React.Component {

  render() {
    const title = brand.name + ' - Table';
    const description = brand.desc;
    
    const options = {
      search: false,
      pageSize: 5,
      filtering: true,
      rowStyle: {}
    };
    
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <div style={{ maxWidth: '100%' }}>
        <DataTable
          title="Teste"
          options={options}
          columns={[
            { title: 'Nome', field: 'name' },
            { title: 'Sobrenome', field: 'surname' },
            { title: 'Numero', field: 'birthYear', type: 'numeric' },
            { title: 'Cidade', field: 'birthCity', lookup: { 34: 'São Luís', 63: 'Belém' } }
          ]}
          data={[
            { name: 'Nome 1', surname: 'Teste', birthYear: 673672, birthCity: 63 },
            { name: 'Nome 2', surname: 'Teste', birthYear: 673672, birthCity: 63 },
            { name: 'Nome 3', surname: 'Teste', birthYear: 673672, birthCity: 34 },
            { name: 'Nome 4', surname: 'Teste', birthYear: 673672, birthCity: 34 },
            { name: 'Nome 5', surname: 'Teste', birthYear: 673672, birthCity: 34 },
            { name: 'Nome 6', surname: 'Teste', birthYear: 673672, birthCity: 34 },
            { name: 'Nome 7', surname: 'Teste', birthYear: 673672, birthCity: 34 },
            { name: 'Nome 8', surname: 'Teste', birthYear: 673672, birthCity: 34 },
            { name: 'Nome 9', surname: 'Teste', birthYear: 673672, birthCity: 63 },
            { name: 'Nome 10', surname: 'Teste', birthYear: 673672, birthCity: 34 },
            { name: 'Nome 11', surname: 'Teste', birthYear: 673672, birthCity: 34 },
            { name: 'Nome 12', surname: 'Teste', birthYear: 673672, birthCity: 63 },
            { name: 'Nome 13', surname: 'Teste', birthYear: 673672, birthCity: 63 },
            { name: 'Nome 14', surname: 'Teste', birthYear: 673672, birthCity: 34 },
            { name: 'Nome 15', surname: 'Teste', birthYear: 673672, birthCity: 34 },
            
          ]}
        />
      </div>
      </div>
    );
  }
}

export default TablePage;
*/