
import React from 'react';

import TabularSection from 'metadata-react/TabularSection';
import withAutoHeight from 'metadata-react/App/AutoHeight';
import Head from './Head';
import Glasses from './Glasses';
import Spec from './Spec';


function Tabular({_obj, schemas, name, ...others}) {
  return <TabularSection
    key={`ts_${name}`}
    _obj={_obj}
    _tabular={name}
    scheme={schemas[name]}
    denyAddDel
    denyReorder
    {...others}
  />;
}

function TabContent({tab, _obj, classes, schemas, autoHeight}) {
  switch (tab) {
  case 0:
    return <Head _obj={_obj} classes={classes} />;
  case 1:
    return <Tabular _obj={_obj} schemas={schemas} name="params"/>;
  case 2:
    return <Spec _obj={_obj} scheme={schemas.specification}/>;
  case 3:
    return <Tabular _obj={_obj} schemas={schemas} name="constructions"/>;
  case 4:
    return <Tabular _obj={_obj} schemas={schemas} name="coordinates"/>;
  case 5:
    return <Tabular _obj={_obj} schemas={schemas} name="cnn_elmnts"/>;
  case 6:
    return <Glasses _obj={_obj} schemas={schemas} autoHeight={autoHeight} />;
  case 7:
    return <Tabular _obj={_obj} schemas={schemas} name="inserts"/>
  }
}

export default withAutoHeight(TabContent);
