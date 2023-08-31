const { readBitField } = require('../utils/readBitField');
const { db } = require('./../lib/dbConfig');

exports.insertReaction = (req, res) => {
  const { offerUserId, reactionUserId, offerId, isLike } = req.body;

  console.log(reactionUserId);

  const insertReactionQuery =
    'INSERT INTO reaction(user_id, offer_id, is_like) VALUES (?, ?, ?)';

  const substractScoreQuery =
    'UPDATE score SET current_score = CASE WHEN current_score > 0 THEN current_score - 1 ELSE current_score END WHERE user_id = ?';

  const addScoreQuery =
    'UPDATE score SET current_score = current_score + 5 WHERE user_id = ?';

  db.query(
    insertReactionQuery,
    [reactionUserId, offerId, isLike],
    async (error, result) => {
      if (error) {
        console.log(error.message);
        return;
      }

      db.query(
        isLike === 1 ? addScoreQuery : substractScoreQuery,
        [offerUserId],
        async (error, result) => {
          if (error) {
            console.log(error.message);
            return;
          }

          return res
            .status(200)
            .json({ message: 'Reaction inserted successfully!' });
        }
      );
    }
  );
};

exports.getMyReaction = (req, res) => {
  const { userId, offerId } = req.params;

  const getMyReactionQuery =
    'SELECT r.is_like FROM reaction r INNER JOIN user u ON r.user_id = u.user_id WHERE u.user_id = ? AND r.offer_id = ?';

  db.query(getMyReactionQuery, [userId, offerId], async (error, result) => {
    if (error) {
      console.log(error.message);
      return;
    }

    return res.status(200).json({
      message: 'Reaction fetched successfully!',
      reaction: result.length > 0 ? readBitField(result[0].is_like) : [],
    });
  });
};

exports.changeReaction = (req, res) => {
  const { userId, offerId, reaction } = req.body;

  const changeReactionQuery =
    'UPDATE reaction SET is_like = ? WHERE offer_id = ? AND user_id = ?';

  db.query(
    changeReactionQuery,
    [reaction, offerId, userId],
    async (error, result) => {
      if (error) {
        console.log(error.message);
        return;
      }

      return res
        .status(200)
        .json({ message: 'Reaction updated successfully!' });
    }
  );
};
