import RoomClean from "../models/roomclean.model.js";

export const roomCleanStatus = async (req, res, next) => {
  
    if (!req.user.isAdmin) {
      return next(errorHandler(403, 'You are not allowed to see all room cleaning requests'));
    }
  
    try {
      const startIndex = parseInt(req.query.startIndex) || 0;
      const limit = parseInt(req.query.limit) || 10;
      const sortDirection = req.query.sort === 'asc' ? 1 : -1;
  
      // Fetch room cleaning requests with sorting and pagination
      const requests = await RoomClean.find()
        .sort({ createdAt: sortDirection }) // Sort by createdAt field, descending or ascending
        .skip(startIndex) // Skip number of documents for pagination
        .limit(limit); // Limit number of documents for pagination
  
      // Optionally, you can count total documents and filter last month's requests if needed
      const totalRequests = await RoomClean.countDocuments();
      const lastMonthRequests = await RoomClean.countDocuments({
        createdAt: {
          $gte: new Date(new Date().setMonth(new Date().getMonth() - 1))
        }
      });
  
      const formattedRequests = requests.map((request) => {
        const { _id, userId, room, block, date, time, status } = request;
        return {
          id: _id,
          userId,
          room,
          block,
          date,
          time,
          status,
        };
      });
  
      res.status(200).json({
        requests: formattedRequests,
        totalRequests,
        lastMonthRequests,
      });
    } catch (error) {
      next(error);
    }
  
  
};
