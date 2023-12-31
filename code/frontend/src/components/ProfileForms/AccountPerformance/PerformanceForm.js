import { Paper, Typography } from '@mui/material';
import Reactions from './Reactions';
import Score from './Score';
import Token from './Token';

function PerformanceForm({
  currentScore,
  totalScore,
  totalTokens,
  previousTokens,
}) {
  return (
    <div style={{ textAlign: 'center', width: '60vw', margin: '4.8rem auto' }}>
      <Paper elevation={2} style={{ padding: '2.2rem', borderRadius: '20px' }}>
        <Typography
          variant='h4'
          color='primary'
          style={{ marginBottom: '1.8rem' }}
        >
          Αccount Performance
        </Typography>
        <Score currentScore={currentScore} totalScore={totalScore} />
        <Token totalTokens={totalTokens} previousTokens={previousTokens} />
      </Paper>
    </div>
  );
}

export default PerformanceForm;
