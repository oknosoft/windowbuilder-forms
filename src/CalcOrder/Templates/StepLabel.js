import React from 'react';

export default function StepLabelText({classes, label, index, templates}) {

  const {calc_order} = templates._select_template;
  return <div className={classes.full}>{index === 0 && calc_order ?
    <>
      {label}
      <br/>
      <span style={{
        cursor: 'pointer',
        textDecoration: 'underline',
        fontWeight: 400,
      }} onClick={(ev) => {
        navigator.clipboard.writeText(calc_order.ref);
        ev.preventDefault();
        ev.stopPropagation();
      }}>{`${calc_order.number_doc} (${calc_order.note})`}</span>
    </> :
    label}</div>;
}
