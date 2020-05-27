
import React from 'react';
import TabularSection from 'metadata-react/TabularSection';


export default function Glasses({_obj, schemas, autoHeight}) {
  const minHeight = Math.floor(autoHeight / 2);
  return [
    <div key="ts_glasses" style={{height: minHeight}}>
      <TabularSection  _obj={_obj} _tabular="glasses" scheme={schemas.glasses} denyAddDel denyReorder/>
    </div>,
    <div key="ts_glass_spec" style={{height: minHeight}}>
      <TabularSection _obj={_obj} _tabular="glass_specification" scheme={schemas.glass_specification} denyAddDel denyReorder/>
    </div>
  ];
}
