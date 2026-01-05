import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddUser from './components/AddUser';
import UserList from './components/UserList';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function AppContent() {
  const { toggleTheme, darkMode } = useTheme();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-md z-50 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-300">MongoDB CRUD App</h1>
        <button
          onClick={toggleTheme}
          className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full transition"
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </nav>
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<AddUser />} />  {/* Home: Blank Add Form */}
          <Route path="/edit/:id" element={<AddUser />} />  {/* Edit: Pre-filled Form */}
          <Route path="/users" element={<UserList />} />  {/* List Page */}
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;









// import { useEffect, useState } from "react";
// import { ImBin } from "react-icons/im";

// const API = "https://crud-backend-nhxa.onrender.com/api/users";

// function App() {
//   const [users, setUsers] = useState([]);
//   const [form, setForm] = useState({ name: "", email: "", age: "" });
//   const [editingId, setEditingId] = useState(null);

//   const fetchUsers = async () => {
//     const res = await fetch(API);
//     setUsers(await res.json());
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const submit = async () => {
//     if (!form.name || !form.email) return;

//     if (editingId) {
//       // UPDATE
//       await fetch(`${API}/${editingId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });
//     } else {
//       // CREATE
//       await fetch(API, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });
//     }

//     setForm({ name: "", email: "", age: "" });
//     setEditingId(null);
//     fetchUsers();
//   };

//   const remove = async (id) => {
//     await fetch(`${API}/${id}`, { method: "DELETE" });
//     fetchUsers();
//   };

//   const editUser = (user) => {
//     setForm({
//       name: user.name,
//       email: user.email,
//       age: user.age || "",
//     });
//     setEditingId(user._id);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
//       <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
//           MongoDB CRUD App
//         </h2>

//         {/* Form */}
//         <div className="space-y-3">
//           <input
//             className="w-full border p-2 rounded focus:ring-2 focus:ring-indigo-400"
//             placeholder="Name"
//             value={form.name}
//             onChange={e => setForm({ ...form, name: e.target.value })}
//           />
//           <input
//             className="w-full border p-2 rounded focus:ring-2 focus:ring-indigo-400"
//             placeholder="Email"
//             value={form.email}
//             onChange={e => setForm({ ...form, email: e.target.value })}
//           />
//           <input
//             className="w-full border p-2 rounded focus:ring-2 focus:ring-indigo-400"
//             placeholder="Age"
//             value={form.age}
//             onChange={e => setForm({ ...form, age: e.target.value })}
//           />

//           <button
//             onClick={submit}
//             className={`w-full text-white py-2 rounded transition ${
//               editingId
//                 ? "bg-green-600 hover:bg-green-700"
//                 : "bg-indigo-600 hover:bg-indigo-700"
//             }`}
//           >
//             {editingId ? "Update User" : "Add User"}
//           </button>
//         </div>

//         {/* User List */}
//         <ul className="mt-6 space-y-3">
//           {users.map(u => (
//             <li
//               key={u._id}
//               className="flex justify-between items-center bg-gray-50 p-3 rounded shadow-sm"
//             >
//               <div>
//                 <p className="font-medium">{u.name}</p>
//                 <p className="text-sm text-gray-500">{u.email}</p>
//               </div>

//               <div className="flex gap-3">
//                 <button
//                   onClick={() => editUser(u)}
//                   className="text-blue-500 hover:text-blue-700"
//                 >
//                   ✏️
//                 </button>
//                 <button
//                   onClick={() => remove(u._id)}
//                   className="text-red-500 hover:text-red-700"
//                 >
//                   <ImBin />
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default App;
