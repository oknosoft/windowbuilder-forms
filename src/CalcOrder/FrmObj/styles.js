import { withStyles } from '@material-ui/core/styles';

const styles = ({transitions, palette, spacing, breakpoints}) => ({
  hovered: {
    transition: transitions.create('background-color', {
      duration: transitions.duration.shortest
    }),
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: palette.action.hover,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    },
    paddingBottom: spacing(),
    marginRight: spacing(),
  },
  left: {
    textAlign: 'left',
    alignItems: 'stretch',
  },
  height: {
    height: '100%',
  },
  margin: {
    margin: spacing(),
  },
  bottom: {
    paddingBottom: spacing(),
  },
  w160: {
    minWidth: 160,
    [breakpoints.down('sm')]: {
      width: 140,
    },
  },
  flex: {
    display: 'flex',
  },
  pointer: {
    cursor: 'pointer',
  },
  padding: {
    paddingLeft: spacing(),
    paddingRight: spacing(),
  },
});

export default withStyles(styles);
