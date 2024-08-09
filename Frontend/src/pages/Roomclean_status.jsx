import React from 'react';

const Roomclean_status = () => {
  const dummyData = [
    { name: 'Alice', block: 'A', room: '101', date: '2024-08-01', status: 'Pending' },
    { name: 'Bob', block: 'B', room: '202', date: '2024-08-02', status: 'Done' },
    { name: 'Charlie', block: 'C', room: '303', date: '2024-08-03', status: 'Pending' },
    { name: 'David', block: 'D', room: '404', date: '2024-08-04', status: 'Done' },
  ];

  return (
    <div className="min-h-screen  px-1 py-3 md:p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Room Cleaning Status</h1>
        <div className="bg-white p-4  rounded-lg shadow-lg">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Block</th>
                <th className="px-4 py-2">Room</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {dummyData.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2 text-center">{item.block}</td>
                  <td className="px-4 py-2 text-center">{item.room}</td>
                  <td className="px-4 py-2 text-center">{item.date}</td>
                  <td className="px-4 py-2 text-center">
                    <span
                      className={`inline-block px-2 py-1 text-sm font-semibold rounded-full ${
                        item.status === 'Done' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Roomclean_status;
