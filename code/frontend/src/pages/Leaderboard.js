import axios from 'axios';

import LeaderBoardTable from '../components/LeaderboardTable';
import { useEffect, useState } from 'react';
import { LinearProgress } from '@mui/material';

function Leaderboard() {
  const [leaderboardUsers, setLeaderboardUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = 'Bearer ' + sessionStorage.getItem('token');
  const config = {
    headers: {
      authorization: token,
    },
  };

  const getLeaderboardUsers = () => {
    setLoading(true);

    axios
      .get('http://localhost:4000/leaderboard/getUsers', config)
      .then((res) => {
        setLeaderboardUsers(res.data.usersPoints);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response) console.log(error.response.data.message);
      });
  };

  useEffect(() => {
    getLeaderboardUsers();
  }, []);
  return (
    <>
      {loading ? (
        <LinearProgress />
      ) : (
        <LeaderBoardTable leaderboardUsers={leaderboardUsers} />
      )}
    </>
  );
}

export default Leaderboard;
