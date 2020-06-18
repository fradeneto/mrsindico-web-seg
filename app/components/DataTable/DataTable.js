import React from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Ionicon from "react-ionicons";
import Input from '@material-ui/core/Input';

import MaterialTableTitle from "./MaterialTableTitle";
import MaterialTable, { FilterRow } from "material-table";

import styles from "./datatableStyle-jss";

class DataTable extends React.Component {
  render() {
    const {
      classes,
      title,
      whiteBg,
      noMargin,
      colorMode,
      overflowX,
      icon,
      tableRef,
      columns,
      data,
      style,
      editable, actions
    } = this.props;

    const options = {
      search: false,
      pageSize: 10,
      filtering: true,
      padding: 'dense',
      rowStyle: {},
      headerStyle: {
        marginTop: 0,
        paddingBottom: 5,
        paddingTop: 0,
        //backgroundColor: '#00FF00'
        //fontSize: "20px"
      },
      ...this.props.options
    };

    const tableTitle = <MaterialTableTitle title={title} />;

    const localization = {
      pagination: {
        labelDisplayedRows: "{from}-{to} de {count}",
        labelRowsSelect: "registros",
        labelRowsPerPage: "Registros por páginas",
        firstAriaLabel: "Primeira Página",
        firstTooltip: "Primeira Página",
        previousAriaLabel: "Página Anterior",
        previousTooltip: "Página Anterior",
        nextAriaLabel: "Próxima Página",
        nextTooltip: "Próxima Página",
        lastAriaLabel: "Última Página",
        lastTooltip: "Última Página"
      }
    };

    return (
      <>
        <MaterialTable
          icons={{ Filter: () => <div /> }}
          tableRef={tableRef}
          title={tableTitle}
          options={options}
          columns={columns}
          data={data}
          localization={localization}
          style={style}
          editable={editable}
          actions={actions}
          
        />
      </>
    );
  }
}

DataTable.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  icon: PropTypes.string,
  whiteBg: PropTypes.bool,
  colorMode: PropTypes.bool,
  noMargin: PropTypes.bool,
  overflowX: PropTypes.bool
};

DataTable.defaultProps = {
  whiteBg: false,
  noMargin: false,
  colorMode: false,
  overflowX: false,
  icon: "ios-bookmark-outline"
};

export default compose(withStyles(styles))(DataTable);

/* 
components={{
            FilterRow: props => (
              <tr>
                {props.columns.map(column => (
                  <td key={column.field}>
                    {/*column.field*-/}
                    
                    <Input
                      defaultValue=""
                      className={classes.input}
                      inputProps={{
                        "aria-label": "Description"
                      }}
                    />
                  </td>
                ))}
              </tr>
            )
          }}
*/