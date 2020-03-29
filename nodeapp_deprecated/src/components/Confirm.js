import React, {
	Component
} from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import {
	List,
	ListItem,
	ListItemText
} from '@material-ui/core/';
import Button from '@material-ui/core/Button';

export class Confirm extends Component {
	continue = e => {
		e.preventDefault();
		// PROCESS FORM //
		this.props.nextStep();
	};

	back = e => {
		e.preventDefault();
		this.props.prevStep();
	};

	render() {
		const {
			values: {
				date,
				time,
				lat,
				long
			}
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
			AppBar title = "Confirm User Data" / >
			<
			List >
			<
			ListItem >
			<
			ListItemText primary = "Date"
			secondary = {
				date
			}
			/>  < /
			ListItem > <
			ListItem >
			<
			ListItemText primary = "Time"
			secondary = {
				time
			}
			/>  < /
			ListItem > <
			ListItem >
			<
			ListItemText primary = "Latitude"
			secondary = {
				lat
			}
			/>  < /
			ListItem > <
			ListItem >
			<
			ListItemText primary = "Longitude"
			secondary = {
				long
			}
			/>  < /
			ListItem > <
			/List> <
			br / >

			<
			Button color = "secondary"
			variant = "contained"
			onClick = {
				this.back
			} >
			Back < /Button>

			<
			Button color = "primary"
			variant = "contained"
			onClick = {
				this.continue
			} >
			Confirm & Continue < /Button> < /
			Dialog > <
			/React.Fragment> < /
			MuiThemeProvider >
		);
	}
}

export default Confirm;