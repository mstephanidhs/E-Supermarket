const mysql = require("mysql2");
const { readBitField } = require("../utils/readBitField");

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DATABASE_PORT,
});

exports.insertReaction = (req, res) => {
  const { userId, offerId, isLike } = req.body;

  const insertReactionQuery =
    "INSERT INTO reaction(user_id, offer_id, is_like) VALUES (?, ?, ?)";

  db.query(
    insertReactionQuery,
    [userId, offerId, isLike],
    async (error, result) => {
      if (error) {
        console.log(error.message);
        return;
      }

      return res
        .status(200)
        .json({ message: "Reaction inserted successfully!" });
    }
  );
};

exports.getMyReaction = (req, res) => {
  const { userId, offerId } = req.params;

  const getMyReactionQuery =
    "SELECT r.is_like FROM reaction r INNER JOIN user u ON r.user_id = u.user_id WHERE u.user_id = ? AND r.offer_id = ?";

  db.query(getMyReactionQuery, [userId, offerId], async (error, result) => {
    if (error) {
      console.log(error.message);
      return;
    }

    return res.status(200).json({
      message: "Reaction fetched successfully!",
      reaction: result.length > 0 ? readBitField(result[0].is_like) : [],
    });
  });
};

exports.changeReaction = (req, res) => {
  const { userId, offerId, reaction } = req.body;

  const changeReactionQuery =
    "UPDATE reaction SET is_like = ? WHERE offer_id = ? AND user_id = ?";

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
        .json({ message: "Reaction updated successfully!" });
    }
  );
};