import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImBin } from 'react-icons/im';
import { useTheme } from '../context/ThemeContext';

const API = "https://crud-backend-nhxa.onrender.com/api/users";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const fetchUsers = async () => {
    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error('Failed to fetch users');
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const remove = async (id) => {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    fetchUsers();
  };

  const editUser = (id) => {
    if (!id) {
      console.error('No ID found for edit!');
      return;
    }
    navigate(`/edit/${id}`);
  };

  return (
    <div className={`min-h-screen p-8 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-indigo-100 to-purple-100'}`}>
      <div className={`max-w-4xl mx-auto ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-xl p-6`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-3xl font-bold ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}`}>
            User List
          </h2>
          <button
            onClick={() => navigate('/')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition"
          >
            Add New User
          </button>
        </div>
        {users.length === 0 ? (
          <p className="text-center text-gray-500">No users yet. <button onClick={() => navigate('/')} className="text-indigo-600 underline">Add one!</button></p>
        ) : (
          <ul className="space-y-3">
            {users.map(u => (
              <li
                key={u._id}
                className={`flex justify-between items-center p-3 rounded shadow-sm ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
              >
                <div>
                  <p className="font-medium">{u.name}</p>
                  <p className="text-sm text-gray-500">{u.email}</p>
                  {u.age && <p className="text-sm text-gray-400">Age: {u.age}</p>}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => editUser(u._id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => remove(u._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <ImBin />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserList;










// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ImBin } from 'react-icons/im';
// import { useTheme } from '../context/ThemeContext';

// const API = "https://crud-backend-nhxa.onrender.com/api/users";

// const UserList = () => {
//     const [users, setUsers] = useState([]);
//     const navigate = useNavigate();
//     const { darkMode } = useTheme();

//     const fetchUsers = async () => {
//         try {
//             const res = await fetch(API);
//             const data = await res.json();
//             console.log('Fetched users:', data);  // Add this
//             setUsers(data);
//         } catch (err) {
//             console.error('Fetch error:', err);  // Add this
//         }
//     };

//     // const fetchUsers = async () => {
//     //     const res = await fetch(API);
//     //     setUsers(await res.json());
//     // };

//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     const remove = async (id) => {
//         await fetch(`${API}/${id}`, { method: 'DELETE' });
//         fetchUsers();
//     };

//     const editUser = (id) => {
//         console.log('Editing user ID:', id);  // Add this
//         if (!id) {
//             console.log('No ID found!');  // Add this
//             return;
//         }
//         navigate(`/edit/${id}`);
//         console.log('Navigated to:', `/edit/${id}`);  // Add this
//     };

//     //   const editUser = (id) => {
//     //     navigate(`/edit/${id}`);  // Now uses /edit/:id
//     //   };

//     return (
//         <div className={`min-h-screen p-8 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-indigo-100 to-purple-100'}`}>
//             <div className={`max-w-4xl mx-auto ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-xl p-6`}>
//                 <div className="flex justify-between items-center mb-6">
//                     <h2 className={`text-3xl font-bold ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}`}>
//                         User List
//                     </h2>
//                     <button
//                         onClick={() => navigate('/')}  // Back to form
//                         className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition"
//                     >
//                         Add New User
//                     </button>
//                 </div>

//                 {users.length === 0 ? (
//                     <p className="text-center text-gray-500">No users yet. <button onClick={() => navigate('/')} className="text-indigo-600 underline">Add one!</button></p>
//                 ) : (
//                     <ul className="space-y-3">
//                         {users.map(u => (
//                             <li
//                                 key={u._id}
//                                 className={`flex justify-between items-center p-3 rounded shadow-sm ${darkMode ? 'bg-gray-700' : 'bg-gray-50'
//                                     }`}
//                             >
//                                 <div>
//                                     <p className="font-medium">{u.name}</p>
//                                     <p className="text-sm text-gray-500">{u.email}</p>
//                                     {u.age && <p className="text-sm text-gray-400">Age: {u.age}</p>}
//                                 </div>

//                                 <div className="flex gap-3">
//                                     <button
//                                         onClick={() => editUser(u._id)}
//                                         className="text-blue-500 hover:text-blue-700"
//                                     >
//                                         Edit
//                                     </button>
//                                     <button
//                                         onClick={() => remove(u._id)}
//                                         className="text-red-500 hover:text-red-700"
//                                     >
//                                         <ImBin />
//                                     </button>
//                                 </div>
//                             </li>
//                         ))}
//                     </ul>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default UserList;









// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ImBin } from 'react-icons/im';
// import { useTheme } from '../context/ThemeContext';

// const API = "https://crud-backend-nhxa.onrender.com/api/users";

// const UserList = () => {
//   const [users, setUsers] = useState([]);
//   const navigate = useNavigate();
//   const { darkMode } = useTheme();

//   const fetchUsers = async () => {
//     const res = await fetch(API);
//     setUsers(await res.json());
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const remove = async (id) => {
//     await fetch(`${API}/${id}`, { method: 'DELETE' });
//     fetchUsers();
//   };

//   const editUser = (id) => {
//     navigate(`/add/${id}`);
//   };

//   return (
//     <div className={`min-h-screen p-8 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-indigo-100 to-purple-100'}`}>
//       <div className={`max-w-4xl mx-auto ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-xl p-6`}>
//         <div className="flex justify-between items-center mb-6">
//           <h2 className={`text-3xl font-bold ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}`}>
//             User List
//           </h2>
//           <button
//             onClick={() => navigate('/add')}
//             className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition"
//           >
//             Add New User
//           </button>
//         </div>

//         {users.length === 0 ? (
//           <p className="text-center text-gray-500">No users yet. Add one!</p>
//         ) : (
//           <ul className="space-y-3">
//             {users.map(u => (
//               <li
//                 key={u._id}
//                 className={`flex justify-between items-center p-3 rounded shadow-sm ${
//                   darkMode ? 'bg-gray-700' : 'bg-gray-50'
//                 }`}
//               >
//                 <div>
//                   <p className="font-medium">{u.name}</p>
//                   <p className="text-sm text-gray-500">{u.email}</p>
//                   {u.age && <p className="text-sm text-gray-400">Age: {u.age}</p>}
//                 </div>

//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => editUser(u._id)}
//                     className="text-blue-500 hover:text-blue-700"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => remove(u._id)}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     <ImBin />
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserList;