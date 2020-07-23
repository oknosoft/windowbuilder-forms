/**
 * Строка заказа с указанием шаблона или номенклатуры, цвета, размеров
 *
 * @module TemplateRow
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/List';
import Checkbox from '@material-ui/core/Checkbox';

import withStyles from 'wb-forms/dist/CalcOrder/FrmObj/styles';

function TemplateRow({row, classes, handleSelect, handleNext, selected}) {
  const {nom, characteristic: ox} = row;
  const {scale_svg} = $p.utils;

  return (
    <ListItem className={classes.hovered} onDoubleClick={() => {
      handleSelect();
      handleNext();
    }} >
      <Grid container className={classes.left}>
        <Grid item xs={4} sm={3}>
          <div dangerouslySetInnerHTML={{__html: ox.svg ? scale_svg(ox.svg, {width: 90, height: 90, zoom: 0.2}, 0) : 'нет эскиза'}}/>
        </Grid>
        <Grid item xs={7} sm={8}>
          <Typography variant="h6">{nom.name}</Typography>
          <Typography variant="body2">{`Ширина: ${ox.x}, Высота: ${ox.y}`}</Typography>
          <Typography variant="body2">{ox.note}</Typography>
        </Grid>
        <Grid item xs={1}>
          <Checkbox
            checked={selected}
            onChange={handleSelect}
            value="primary"
          />
        </Grid>
      </Grid>
    </ListItem>
  );
}

TemplateRow.propTypes = {
  row: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  handleSelect: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
};

export default withStyles(TemplateRow);
