import { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import Axios from 'axios';
import './RmPassword.css';

const SERVER = 'https://passwordmanager-l5wn.onrender.com/removePass';

const RmPassword = () => {
	const [website, setWebsite] = useState('');
	const [email, setEmail] = useState('');
	const [isClicked, setIsClicked] = useState(false);



	const removePass = () => {
		return new Promise((resolve, reject) => {
			Axios.post(SERVER, {
				site: website,
				email: email
			}).then((response) => {
				console.log(response.data);
				if (response.data === 'REMOVED') {
					resolve(1);
				} else {
					resolve(0);
				}
			}).catch((err) => {
				console.error(err);
				reject();
			});
		})
	}




	const removePassFunc = () => {
		isEmpty().then(() => {
			removePass().then((response) => {
				if (response === 1) {
					setTimeout(() => {
						clear(document.getElementById('site'));
						notifySuccess();
					}, 800);
					setTimeout(clear(document.getElementById('email')), 900);
					setTimeout(clear(document.getElementById('pass')), 1000);
				} else {
					notifyFailure()
				}
			}).catch((err) => console.error('error' +err));
		}).catch(() => notifyFieldFailure());
	}




	const clear = target => {
		if (target.value != null)
			target.value = "";
	}




	const handleClick = () => {
		if (!isClicked) {
			removePassFunc();
		}
		setIsClicked(true);
	}




	const isEmpty = () => {
		return new Promise((resolve, reject) => {
			if (website.length === 0 || email.length === 0) {
				reject();
			} else resolve();

		})
	}




	const notifyFieldFailure = () => {
		toast.warn('All fields are required!', {
			position: "top-center",
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "dark",
		});
		setTimeout(setIsClicked(false), 2000);
	}




	const notifyFailure = () => {
		toast.error('Password dons\'t exist!', {
			position: "top-center",
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "dark",
		});
	}



	const notifySuccess = () => {
		toast.success("Password removed successfully!", {
			position: "top-center",
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "dark",
		});
	}



	return (
		<div className='rm-container'>
			<div className="rm-form">
				<h4 style={{ color: 'white' }}>Remove Password</h4>
				<hr />
				<label htmlFor="site">Website</label>
				<input type="text" id="site"
					placeholder='e.g. linkedIn'
					onChange={(event) => {
						setWebsite(event.target.value);
					}} required='required' />

				<label htmlFor="email">Email/Username</label>
				<input type="text" id="email"
					placeholder="email/username"
					onChange={(event) => {
						setEmail(event.target.value);
					}} required='required' />

				<button type="submit" onClick={handleClick} disabled={isClicked}>
					Remove Password</button>
				<ToastContainer />
				<p>&#9734; refresh before removing any password</p>
			</div>
		</div>
	)
};
export default RmPassword;
