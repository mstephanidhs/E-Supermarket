import { useEffect, useState } from 'react';

import axios from 'axios';

import { Alert, Snackbar, CircularProgress } from '@mui/material';

import OffersTable from '../components/ProfileForms/OffersTable';
import PerformanceForm from '../components/ProfileForms/AccountPerformance/PerformanceForm';

import { passwordStrength } from '../util/checkPassword';
import Reactions from '../components/ProfileForms/AccountPerformance/Reactions';
import AccountDetailsForm from '../components/ProfileForms/AccountDetails/AccountDetailsForm';

function Profile() {
  const [username, setUsername] = useState('');

  const [reactions, setReactions] = useState([]);
  const [currentScore, setCurrentScore] = useState('');
  const [totalScore, setTotalScore] = useState('');
  const [previousTokens, setPreviousTokens] = useState('');
  const [totalTokens, setTotalTokens] = useState('');

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [offers, setOffers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [alert, setAlert] = useState({
    flag: false,
    message: '',
    severity: 'error',
  });
  const [openAlert, setOpenAlert] = useState(true);

  const token = 'Bearer ' + sessionStorage.getItem('token');
  const config = {
    headers: {
      authorization: token,
    },
  };

  useEffect(() => {
    getReactions();
    getScore();
    getTokens();
    offersByUserID();
  }, []);

  const getReactions = () => {
    axios
      .get(
        `http://localhost:5000/profile/GetReactions/${sessionStorage.getItem(
          'userId'
        )}`,
        config
      )
      .then((res) => {
        setReactions(res.data.reactions);
      })
      .catch((error) => {
        if (error.response) console.log(error.response.data.message);
      });
  };

  const getScore = () => {
    axios
      .get(
        `http://localhost:5000/profile/GetScores/${sessionStorage.getItem(
          'userId'
        )}`,
        config
      )
      .then((res) => {
        setCurrentScore(res.data.current_score);
        setTotalScore(res.data.past_score);
      })
      .catch((error) => {
        if (error.response) console.log(error.response.data.message);
      });
  };

  const getTokens = () => {
    axios
      .get(
        `http://localhost:5000/profile/GetTokens/${sessionStorage.getItem(
          'userId'
        )}`,
        config
      )
      .then((res) => {
        setPreviousTokens(res.data.previous_month_tokens);
        setTotalTokens(res.data.total_tokens);
      })
      .catch((error) => {
        if (error.response) console.log(error.response.data.message);
      });
  };

  const offersByUserID = () => {
    axios
      .get(
        `http://localhost:5000/offer/offersByUser/${sessionStorage.getItem(
          'userId'
        )}`,
        config
      )
      .then((res) => {
        setOffers(res.data.offersByUser);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response) console.log(error.response.data.message);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;

    setOpenAlert(false);
  };

  const validateUsername = () => {
    setAlert({ flag: false, message: '', severity: 'error' });
    setOpenAlert(true);

    if (username.length === 0)
      return setAlert({
        severity: 'error',
        flag: true,
        message: 'You must fill the Username field!',
      });

    axios
      .put(
        'http://localhost:5000/profile/changeUsername',
        {
          newName: username,
        },
        config
      )
      .then((res) => {
        if (res.status === 200) {
          sessionStorage.setItem('name', username);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
          return setAlert({
            flag: true,
            message: res.data.message,
            severity: 'success',
          });
        }
      })
      .catch((error) => {
        if (error.response) {
          return setAlert({
            severity: 'error',
            flag: true,
            message: error.response.data.message,
          });
        }
      });
  };

  const validatePassword = () => {
    setAlert({ flag: false, message: '', severity: 'error' });
    setOpenAlert(true);

    if (
      oldPassword.length === 0 &&
      newPassword.length === 0 &&
      rePassword.length === 0
    )
      return setAlert({
        severity: 'error',
        flag: true,
        message: 'Invalid Form, you must fill the fields!',
      });

    if (oldPassword.length === 0)
      return setAlert({
        severity: 'error',
        flag: true,
        message: 'Invalid Form, Old Password field cannot be empty!',
      });

    if (newPassword.length === 0)
      return setAlert({
        severity: 'error',
        flag: true,
        message: 'Invalid Form, New Password field cannot be empty!',
      });

    if (rePassword.length === 0)
      return setAlert({
        severity: 'error',
        flag: true,
        message: 'Invalid Form, Re-Password field cannot be empty!',
      });

    if (passwordStrength(newPassword) !== 4)
      return setAlert({
        severity: 'error',
        flag: true,
        message: 'Password is not strong enough!',
      });

    if (newPassword !== rePassword)
      return setAlert({
        severity: 'error',
        flag: true,
        message: 'Passwords do not match!',
      });

    axios
      .put(
        'http://localhost:5000/profile/changePassword',
        {
          oldPass: oldPassword,
          newPass: newPassword,
          rePass: rePassword,
        },
        config
      )
      .then((res) => {
        if (res.status === 200) {
          return setAlert({
            flag: true,
            message: res.data.message,
            severity: 'success',
          });
        }
      })
      .catch((error) => {
        if (error.response) {
          return setAlert({
            severity: 'error',
            flag: true,
            message: error.response.data.message,
          });
        }
      });
  };

  return (
    <>
      {alert.flag ? (
        <Snackbar open={openAlert} onClose={handleClose}>
          <Alert onClose={handleClose} severity={alert.severity}>
            {alert.message}
          </Alert>
        </Snackbar>
      ) : null}
      <AccountDetailsForm
        setUsername={setUsername}
        validateUsername={validateUsername}
        setOldPassword={setOldPassword}
        setNewPassword={setNewPassword}
        setRePassword={setRePassword}
        validatePassword={validatePassword}
      />
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <OffersTable offers={offers} />
          <PerformanceForm
            currentScore={currentScore}
            totalScore={totalScore}
            totalTokens={totalTokens}
            previousTokens={previousTokens}
          />
          <Reactions reactions={reactions} />
        </>
      )}
    </>
  );
}

export default Profile;
