import React, {
	Component
} from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export class UserInputForm extends Component {
	continue = e => {
		e.preventDefault();
		this.props.nextStep();
	};

	render() {
		const {
			values,
			handleChange
		} = this.props;
		return ( <
			MuiThemeProvider >
			<
			React.Fragment >
			<
			Dialog open = "true"
			fullWidth = "true"
			maxWidth = 'sm' >
			<
			AppBar title = "Enter Setting" / >
			<
			form className = {
				FormSetting
			}
			noValidate >
			<
			TextField id = "date"
			label = "Date"
			type = "date"
			defaultValue = "2017-05-24"
			//  className={classes.textField}
			InputLabelProps = {
				{
					shrink: true,
				}
			}
			/> < /
			form >

			<
			form className = {
				FormSetting
			}
			noValidate >

			<
			TextField id = "time"
			label = "Time"
			type = "time"
			defaultValue = "07:30"
			//     className={classes.textField}
			InputLabelProps = {
				{
					shrink: true,
				}
			}
			inputProps = {
				{
					step: 300, // 5 min
				}
			}
			/> < /
			form > <
			br / >
			<
			TextField placeholder = "Enter Your Location (lat, long)"
			label = "Location"
			onChange = {
				handleChange('location')
			}
			defaultValue = {
				values.location
			}
			margin = "normal"
			fullWidth = "true" /
			>
			<
			br / >

			<
			Button color = "primary"
			variant = "contained"
			onClick = {
				this.continue
			} >
			Continue < /Button> < /
			Dialog > <
			/React.Fragment> < /
			MuiThemeProvider >
		);
	}
}

export default UserInputForm;