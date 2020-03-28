import React, {
	Component
} from 'react';
import UserInputForm from './UserInputForm';
import Confirm from './Confirm';
import Success from './Success';

export class UserForm extends Component {
	state = {
		step: 1,
	};

	// Proceed to next step
	nextStep = () => {
		const {
			step
		} = this.state;
		this.setState({
			step: step + 1
		});
	};

	// Go back to prev step
	prevStep = () => {
		const {
			step
		} = this.state;
		this.setState({
			step: step - 1
		});
	};

	// Handle fields change
	handleChange = input => e => {
		this.setState({
			[input]: e.target.value
		});
	};

	render() {
		const {
			step
		} = this.state;
		const {
			date,
			time,
			lat,
			long
		} = this.state;
		const values = {
			date,
			time,
			lat,
			long
		};
		// eslint-disable-next-line

		switch (step) {
			case 1:
				return ( <
					UserInputForm nextStep = {
						this.nextStep
					}
					handleChange = {
						this.handleChange
					}
					values = {
						values
					}
					/>
				);
			case 2:
				return ( <
					Confirm nextStep = {
						this.nextStep
					}
					prevStep = {
						this.prevStep
					}
					values = {
						values
					}
					/>
				);
			case 3:
				return <Success / > ;
		}
	}
}

export default UserForm;
