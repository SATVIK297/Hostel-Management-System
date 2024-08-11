import RoomClean from "../models/roomclean.model.js";
import User from "../models/user.model.js";

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



export const signOut = (req, res, next) => {
  try {
    res
      .clearCookie('access_token')
      .status(200)
      .json('User has been signed out');
  } catch (error) {
    next(error);
  }
};

// export const deleteUser = async (req, res, next) => {
//   console.log("Reached here");
//   const id = req.params.id;
//   // try {
//   //   const user = await User.findByIdAndDelete(id);
//   //   if (!user) {
//   //     return res.status(404).json( 'User not found' );
//   //   }
//   //   res.status(200).json( 'User has been deleted' );
//   // } catch (error) {
//   //   next(error);
//   // }
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.json({ message: 'User deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

