import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const API = "https://crud-backend-nhxa.onrender.com/api/users";

const AddUser = () => {
  const [form, setForm] = useState({ name: '', email: '', age: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { darkMode } = useTheme();

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`${API}/${id}`)
        .then(res => {
          if (!res.ok) throw new Error('User not found');
          return res.json();
        })
        .then(user => {
          if (user && user.name) {
            setForm({ name: user.name, email: user.email, age: user.age || '' });
            setEditingId(id);
          } else {
            throw new Error('Invalid user data');
          }
        })
        .catch(err => {
          console.error('Fetch error:', err);
          navigate('/users');
        })
        .finally(() => setLoading(false));
    }
  }, [id, navigate]);

  const submit = async () => {
    if (!form.name || !form.email) return;

    if (editingId) {
      await fetch(`${API}/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } else {
      await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    }

    setForm({ name: '', email: '', age: '' });
    setEditingId(null);
    navigate('/users');
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-indigo-100 to-purple-100'}`}>
        <p className="text-lg">Loading user data...</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-indigo-100 to-purple-100'}`}>
      <div className={`p-8 rounded-xl shadow-xl w-full max-w-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`text-2xl font-bold text-center mb-6 ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}`}>
          {editingId ? 'Edit User' : 'Add New User'}
        </h2>
        <div className="space-y-3">
          <input
            className={`w-full border p-2 rounded focus:ring-2 focus:ring-indigo-400 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
            placeholder="Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
          <input
            className={`w-full border p-2 rounded focus:ring-2 focus:ring-indigo-400 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
            placeholder="Email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
          <input
            className={`w-full border p-2 rounded focus:ring-2 focus:ring-indigo-400 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
            placeholder="Age"
            value={form.age}
            onChange={e => setForm({ ...form, age: e.target.value })}
          />
          <button
            onClick={submit}
            className={`w-full text-white py-2 rounded transition ${editingId ? 'bg-green-600 hover:bg-green-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
          >
            {editingId ? 'Update User' : 'Add User'}
          </button>
          <button
            onClick={() => navigate('/users')}
            className={`w-full text-white py-2 rounded transition bg-gray-500 hover:bg-gray-600`}
          >
            {editingId ? 'Cancel' : 'View List'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUser;








// import { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useTheme } from '../context/ThemeContext';

// const API = "https://crud-backend-nhxa.onrender.com/api/users";

// const AddUser = () => {
//     const [form, setForm] = useState({ name: '', email: '', age: '' });
//     const [editingId, setEditingId] = useState(null);
//     const navigate = useNavigate();
//     const { id } = useParams();  // Works for /edit/:id
//     const { darkMode } = useTheme();

//     //   useEffect(() => {
//     //     if (id) {
//     //       // Fetch user for editing
//     //       fetch(`${API}/${id}`)
//     //         .then(res => res.json())
//     //         .then(user => {
//     //           setForm({ name: user.name, email: user.email, age: user.age || '' });
//     //           setEditingId(id);
//     //         })
//     //         .catch(() => navigate('/users'));  // Redirect if invalid ID
//     //     }
//     //   }, [id]);

//     useEffect(() => {
//         console.log('Edit ID from params:', id);  // Add this line
//         if (id) {
//             fetch(`${API}/${id}`)
//                 .then(res => {
//                     console.log('Fetch response:', res);  // Add this
//                     return res.json();
//                 })
//                 .then(user => {
//                     console.log('Fetched user:', user);  // Add this
//                     if (user && user.name) {  // Add check
//                         setForm({ name: user.name, email: user.email, age: user.age || '' });
//                         setEditingId(id);
//                     } else {
//                         console.log('Invalid user data');
//                         navigate('/users');
//                     }
//                 })
//                 .catch(err => {
//                     console.error('Fetch error:', err);  // Add this
//                     navigate('/users');
//                 });
//         }
//     }, [id, navigate]);  // Add navigate to deps if needed

//     const submit = async () => {
//         if (!form.name || !form.email) return;

//         if (editingId) {
//             await fetch(`${API}/${editingId}`, {
//                 method: 'PUT',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(form),
//             });
//         } else {
//             await fetch(API, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(form),
//             });
//         }

//         setForm({ name: '', email: '', age: '' });
//         setEditingId(null);
//         navigate('/users');  // Always go to list after submit
//     };

//     return (
//         <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-indigo-100 to-purple-100'}`}>
//             <div className={`p-8 rounded-xl shadow-xl w-full max-w-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
//                 <h2 className={`text-2xl font-bold text-center mb-6 ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}`}>
//                     {editingId ? 'Edit User' : 'Add New User'}
//                 </h2>

//                 <div className="space-y-3">
//                     <input
//                         className={`w-full border p-2 rounded focus:ring-2 focus:ring-indigo-400 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
//                         placeholder="Name"
//                         value={form.name}
//                         onChange={e => setForm({ ...form, name: e.target.value })}
//                     />
//                     <input
//                         className={`w-full border p-2 rounded focus:ring-2 focus:ring-indigo-400 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
//                         placeholder="Email"
//                         value={form.email}
//                         onChange={e => setForm({ ...form, email: e.target.value })}
//                     />
//                     <input
//                         className={`w-full border p-2 rounded focus:ring-2 focus:ring-indigo-400 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
//                         placeholder="Age"
//                         value={form.age}
//                         onChange={e => setForm({ ...form, age: e.target.value })}
//                     />

//                     <button
//                         onClick={submit}
//                         className={`w-full text-white py-2 rounded transition ${editingId
//                                 ? 'bg-green-600 hover:bg-green-700'
//                                 : 'bg-indigo-600 hover:bg-indigo-700'
//                             }`}
//                     >
//                         {editingId ? 'Update User' : 'Add User'}
//                     </button>

//                     <button
//                         onClick={() => navigate('/users')}
//                         className={`w-full text-white py-2 rounded transition bg-gray-500 hover:bg-gray-600`}
//                     >
//                         {editingId ? 'Cancel' : 'View List'}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AddUser;









// import { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useTheme } from '../context/ThemeContext';

// const API = "https://crud-backend-nhxa.onrender.com/api/users";

// const AddUser = () => {
//   const [form, setForm] = useState({ name: '', email: '', age: '' });
//   const [editingId, setEditingId] = useState(null);
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const { darkMode } = useTheme();

//   useEffect(() => {
//     if (id) {
//       fetch(`${API}/${id}`)
//         .then(res => res.json())
//         .then(user => {
//           setForm({ name: user.name, email: user.email, age: user.age || '' });
//           setEditingId(id);
//         });
//     }
//   }, [id]);

//   const submit = async () => {
//     if (!form.name || !form.email) return;

//     if (editingId) {
//       await fetch(`${API}/${editingId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(form),
//       });
//     } else {
//       await fetch(API, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(form),
//       });
//     }

//     setForm({ name: '', email: '', age: '' });
//     setEditingId(null);
//     navigate('/');
//   };

//   return (
//     <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-indigo-100 to-purple-100'}`}>
//       <div className={`p-8 rounded-xl shadow-xl w-full max-w-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
//         <h2 className={`text-2xl font-bold text-center mb-6 ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}`}>
//           {editingId ? 'Edit User' : 'Add New User'}
//         </h2>

//         <div className="space-y-3">
//           <input
//             className={`w-full border p-2 rounded focus:ring-2 focus:ring-indigo-400 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
//             placeholder="Name"
//             value={form.name}
//             onChange={e => setForm({ ...form, name: e.target.value })}
//           />
//           <input
//             className={`w-full border p-2 rounded focus:ring-2 focus:ring-indigo-400 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
//             placeholder="Email"
//             value={form.email}
//             onChange={e => setForm({ ...form, email: e.target.value })}
//           />
//           <input
//             className={`w-full border p-2 rounded focus:ring-2 focus:ring-indigo-400 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
//             placeholder="Age"
//             value={form.age}
//             onChange={e => setForm({ ...form, age: e.target.value })}
//           />

//           <button
//             onClick={submit}
//             className={`w-full text-white py-2 rounded transition ${
//               editingId
//                 ? 'bg-green-600 hover:bg-green-700'
//                 : 'bg-indigo-600 hover:bg-indigo-700'
//             }`}
//           >
//             {editingId ? 'Update User' : 'Add User'}
//           </button>

//           <button
//             onClick={() => navigate('/')}
//             className={`w-full text-white py-2 rounded transition bg-gray-500 hover:bg-gray-600`}
//           >
//             Cancel / View List
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddUser;