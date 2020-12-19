import React from 'react' 
import {  FormControlLabel, Switch } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 200,
    height: 100,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(100px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: '#52d869',
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#52d869',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 98,
    height: 98,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});
 
const GiantSwitch = ({state, setState, handleChange}) => {
  return (
      <div>
        <FormControlLabel
            control={<IOSSwitch checked={state.checkedA} onChange={handleChange} name="checkedB" />}
        />
      </div>
  )
}
export default GiantSwitch