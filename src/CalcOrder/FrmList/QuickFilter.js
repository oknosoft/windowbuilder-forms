
import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import { makeStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import Tip from '../../Common/Tip';
import Params from './Params';


const useStyles = makeStyles((theme) => ({
  paper: {
    border: '1px solid',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function QuickFilter({scheme, handleFilterChange}) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'popper-filter' : undefined;
  const handleClick = (event) => {
    if(anchorEl) {
      setAnchorEl(null);
      handleFilterChange();
    }
    else {
      setAnchorEl(event.currentTarget);
    }

  };
  const classes = useStyles();

  return <div>
    <Tip title="Быстрый фильтр>">
      <IconButton aria-describedby={id} onClick={handleClick}><i className="fa fa-filter fa-fw"></i></IconButton>
    </Tip>
    <Popper
      id={id}
      open={open}
      anchorEl={anchorEl}
      placement="bottom-start"
      onClose={handleClick}
      style={{zIndex: 1}}
    >
      <div className={classes.paper}>
        <Params scheme={scheme} handleFilterChange={handleFilterChange}/>
        <DialogActions>
          <Button variant="contained" onClick={handleClick} color="primary">
            Применить
          </Button>
        </DialogActions>
      </div>
    </Popper>
  </div>;
}

QuickFilter.propTypes = {
  scheme: PropTypes.object.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
};
