import ChangeUsernameForm from './ChangeUsernameForm';
import ChangePasswordForm from './ChangePasswordForm';

import { Grid, Paper, Chip } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

function AccountDetailsForm({
  setUsername,
  validateUsername,
  setOldPassword,
  setNewPassword,
  setRePassword,
  validatePassword,
}) {
  return (
    <div
      style={{
        textAlign: 'center',
        width: '50vw',
        margin: '0 auto',
        marginTop: '10vh',
      }}
    >
      <Paper elevation={3} style={{ padding: '4rem', borderRadius: '20px' }}>
        <Chip
          label='Account Details'
          color='primary'
          variant='outlined'
          icon={<AccountBoxIcon />}
          size='medium'
          style={{
            marginTop: '0.6rem',
            marginBottom: '3rem',
            fontWeight: 600,
            letterSpacing: '0.75px',
            padding: '0 0.6rem',
          }}
        />
        <Grid container spacing={12} justifyContent='center'>
          <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            <ChangeUsernameForm
              setUsername={setUsername}
              validateUsername={validateUsername}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            <ChangePasswordForm
              setOldPassword={setOldPassword}
              setNewPassword={setNewPassword}
              setRePassword={setRePassword}
              validatePassword={validatePassword}
            />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default AccountDetailsForm;
