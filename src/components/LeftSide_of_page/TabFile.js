import React from 'react';

// Importing different things from the material UI library for making the tabs
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// Material UI function for the tabpanels
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
// Material UI proptypes
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

// Material UI function
function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

// Material UI styling component, can be customized using the documentation online
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    height: "100%",
  },
  indicator: {
    backgroundColor: "white",
    height: "10px",
  },
}));

// The main componenet which has the tabs
export default function TabFile() {
  // getting the classes from Material UI
  const classes = useStyles();
  // Used to check the value of the tab
  const [value, setValue] = React.useState(0);

  //Handling change in the tab
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      {/* Material UI components */}
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="WhiteBoard" {...a11yProps(0)} />
          <Tab label="Notepad" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      {/*First Tab*/}
      <TabPanel value={value} index={0}>
        <div className="fill">
          WhiteBoard
        </div>
      </TabPanel>
      {/* Second Tab */}
      <TabPanel value={value} index={1}>
        Notepad
      </TabPanel>
    </div>
  );
}