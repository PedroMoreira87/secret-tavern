import React from "react";
import {TextField} from "@material-ui/core";
import { styled } from '@mui/material/styles';
import { withStyles } from '@mui/styles';

const styles = theme => ({
  cssLabel: {
    color: "lightgray",
  },
});

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& label.Mui-focused': {
      color: 'black',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'lightgray',
      },
      '&:hover fieldset': {
        borderColor: 'black',
      },
      '&:hover label': {
          borderColor: 'black',
        },
      '&.Mui-focused fieldset': {
        borderColor: 'black',
      },
    },

}))

class MedievalTextField extends React.Component {
  
  constructor(props) {
    super(props)
  }

  render () {
    let props = this.props;
    const { classes } = this.props;
    return (
      <StyledTextField
          label = {props.label}
          className = {props.className}
          id="outlined-basic"
          id = {props.id}
          variant= {props.variant}
          variant="outlined"
          fullWidth
      />
    );
  }
}

export default withStyles(styles)(MedievalTextField)
