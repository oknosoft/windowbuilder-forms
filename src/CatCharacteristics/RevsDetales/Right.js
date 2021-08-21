import React from 'react';
import PropTypes from 'prop-types';
import DataGrid from 'react-data-grid';
import Spec from '../LazySpec';

export const PropFormatter = ({value}) => value ? value.presentation : '';

const EmptyRowsView = (classes) => () => <div className={classes.empty}>Укажите строку версии продукции (слева)</div>;

const columns_prop = [
  {key: 'cnstr', name: 'Слой', width: 70, resizable: true},
  {key: 'param', name: 'Параметр', resizable: true, formatter: PropFormatter},
  {key: 'value', name: 'Значение', resizable: true, formatter: PropFormatter},
];

export default function Right({params, specification, classes, tab, setTab}) {

  const _obj = tab === 1 && $p.cat.characteristics.create({specification}, false, true);

  return <div style={{height: 'calc(100% - 32px)'}}>
    {tab === 0 && <DataGrid
      columns={columns_prop}
      rowGetter={i => params[i]}
      rowsCount={params.length}
      emptyRowsView={EmptyRowsView(classes)}
    />}
    {tab === 1 && <Spec _obj={_obj} />}
  </div>;
}

Right.propTypes = {
  params: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  setTab: PropTypes.func.isRequired,
  tab: PropTypes.number,
};
