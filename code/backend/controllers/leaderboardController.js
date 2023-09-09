const { db } = require('./../lib/dbConfig');

exports.fetchUsersLeaderboard = (req, res) => {
  const usersQuery =
    'SELECT u.username, t.previous_month_tokens, t.total_tokens, s.past_score, s.current_score, u.user_id AS id FROM user u INNER JOIN tokens t ON t.user_id = u.user_id INNER JOIN score s ON s.user_id = u.user_id';

  db.query(usersQuery, async (error, result) => {
    if (error) {
      console.log(error.message);
      return;
    }

    const usersPoints = result.map((user) => ({
      ...user,
      // Add a new property 'score_sum' which is the sum of past_score and current_score
      score_sum: user.past_score + user.current_score,
    }));

    return res.status(200).json({
      message: 'Users for the Leaderboard are fetched!',
      usersPoints,
    });
  });
};
