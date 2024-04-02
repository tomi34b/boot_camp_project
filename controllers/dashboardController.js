import asyncHandler from "express-async-handler";
import FirstTimer from "../mongodb/models/firstTimerModel.js";
import { allMonths } from "../utils/data.js";

// @desc Get menbers count
// @route GET /api/v1/dashboard/members_count
// @access Private
export const getMembersCount = asyncHandler(async (req, res) => {
  try {
    const count = await FirstTimer.countDocuments();
    res.status(200).json({ count, success: true });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// @desc Get baptized members count
// @route GET /api/v1/dashboard/baptized_members_count
// @access Private
export const getBaptizedMembersCount = asyncHandler(async (req, res) => {
  try {
    const count = await FirstTimer.countDocuments({ baptised: true });
    res.status(200).json({ count, success: true });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// @desc Get unbaptized members count
// @route GET /api/v1/dashboard/unbaptized_members_count
// @access Private
export const getUnBaptizedMembersCount = asyncHandler(async (req, res) => {
  try {
    const count = await FirstTimer.countDocuments({ baptised: false });
    res.status(200).json({ count, success: true });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// @desc Get gender distribution
// @route GET /api/v1/dashboard/gender_distribution
// @access Private
export const getGenderDistribution = asyncHandler(async (req, res) => {
  try {
    const male = await FirstTimer.countDocuments({ gender: "Male" });
    const female = await FirstTimer.countDocuments({ gender: "Female" });
    const others = await FirstTimer.countDocuments({ gender: "Others" });
    res.status(200).json({ success: true, data: { male, female, others } });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// @desc Get additional Info
// @route GET /api/v1/dashboard/additional_info
// @access Private
export const getAdditionalInfo = asyncHandler(async (req, res) => {
  try {
    const worshipped_with_us = await FirstTimer.countDocuments({
      worshipped_with_us: true,
    });
    const not_worshipped_with_us = await FirstTimer.countDocuments({
      worshipped_with_us: false,
    });
    const attended_word_of_faith_bible_school = await FirstTimer.countDocuments(
      {
        attended_word_of_faith_bible_school: true,
      }
    );
    const not_attended_word_of_faith_bible_school =
      await FirstTimer.countDocuments({
        attended_word_of_faith_bible_school: false,
      });

    res.status(200).json({
      success: true,
      data: {
        worshipped_with_us,
        not_worshipped_with_us,
        attended_word_of_faith_bible_school,
        not_attended_word_of_faith_bible_school,
      },
    });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// @desc Get first timers per month
// @route GET /api/v1/dashboard/first_timers_per_month
// @access Private
export const getFirstTimersPerMonth = asyncHandler(async (req, res) => {
  try {
    const monthlyFirstTimers = await FirstTimer.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(new Date().getFullYear(), 0, 1),
            $lt: new Date(new Date().getFullYear() + 1, 0, 1),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          month: {
            $switch: {
              branches: allMonths.map((monthName, index) => ({
                case: { $eq: ["$_id", index + 1] },
                then: monthName,
              })),
              default: "Unknown", // If month is not found, use 'Unknown'
            },
          },
          count: 1,
        },
      },
      {
        $sort: { month: 1 },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        monthlyFirstTimers,
      },
    });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});
