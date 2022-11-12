import React from 'react';
import PropTypes from 'prop-types';
import DataField from './Editor';
import withStyles, {extClasses} from 'metadata-react/DataField/stylesPropertyGrid';

function FieldClr({classes, ...props}) {
  return <DataField extClasses={extClasses(classes)} fullWidth isTabular={false} {...props}/>;
}

FieldClr.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(FieldClr);
