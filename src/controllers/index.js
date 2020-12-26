const { validationResult } = require("express-validator");

exports.filterPayload = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const records = await req.context.models.Record.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(req.body.startDate),
            $lte: new Date(req.body.endDate),
          },
        },
      },
      {
        $addFields: {
          totalCount: {
            $sum: "$counts",
          },
        },
      },
      {
        $match: {
          totalCount: {
            $gte: req.body.minCount,
            $lte: req.body.maxCount,
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalCount: "$totalCount",
          createdAt: "$createdAt",
          key: "$key",
        },
      },
    ]);
    return res.status(200).json({
      code: 0,
      msg: "Success",
      records,
    });
  } catch (err) {
    console.error(err);
    error.statusCode = 400;
    next(error);
  }
};
