import React from "react";
import './nav-bar.css'
import {Paper, Tab, Tabs, TabPanel} from "@material-ui/core";
import {BrowserRouter, Route, Switch, Link} from "react-router-dom";
import Feed from "../feed/feed";
import Contact from "../contact/contact";
import About from "../about/about";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


export default function NavBar() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div class="nav-bar">
          <Paper>
            <BrowserRouter>
                <Tabs value={value} onChange={handleChange} variant="fullWidth" centered >
                    <Tab label="FEED" {...a11yProps(0)} />                            
                    <Tab label="ABOUT" {...a11yProps(1)} />                            
                    <Tab label="CONTACT" {...a11yProps(2)} />
                </Tabs>
            </BrowserRouter>
          </Paper>

          <TabPanel value={value} index={0} >
              <Feed/>
          </TabPanel>

          <TabPanel value={value} index={1} >
              <About/>
          </TabPanel>
          
          <TabPanel value={value} index={2} >
              <Contact/>
          </TabPanel>
          
        </div>
    );

    function TabPanel(props) {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            class="test"
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box sx={{ p: 3 }}>
                <Typography>{children}</Typography>
              </Box>
            )}
          </div>
        );
      }

    function a11yProps(index) {
        return {
            id: `vertical-tab-${index}`,
            'aria-controls': `vertical-tabpanel-${index}`,
        };
    }
    
}
