// 'use client';
// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { auth } from '../../firebase/config';
// import { FaSpinner } from "react-icons/fa";
// import { getFirestore, collection, query, where, getDocs, orderBy } from "firebase/firestore";
// import app from "../../firebase/config";

// export default function Dashboard() {
//   const router = useRouter();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [complaints, setComplaints] = useState([]);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(async (user) => {
//       if (user) {
//         setUser(user);
//         // Fetch only the logged-in user's complaints from Firestore
//         const db = getFirestore(app);
//         const q = query(
//           collection(db, "dashboardWeb"),
//           where("userId", "==", user.uid),
//           orderBy("timestamp", "desc")
//         );
        
//         const querySnapshot = await getDocs(q);
//         const complaintsData = querySnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data()
//         }));
//         setComplaints(complaintsData);
//       } else {
//         router.push('/login');
//       }
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, [router]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#FDFBF1]">
//         <FaSpinner className="animate-spin text-4xl text-[#0E2517]" />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#FDFBF1] text-[#0E2517] p-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold">My Complaints</h1>
//           <button
//             onClick={() => window.open('https://clean-campus-dae8b.web.app/', '_blank')}
//             className="bg-[#81F18E] text-[#0E2517] px-4 py-2 rounded transition relative overflow-hidden group"
//           >
//             <span className="relative z-10">New Complaint</span>
//             <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#81F18E] to-[#83E4E8]"></span>
//           </button>
//         </div>

//         {/* Status Summary */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//           <div className="bg-white p-4 rounded-lg shadow">
//             <h3 className="text-[#0E2517] mb-2">Total Complaints</h3>
//             <p className="text-2xl font-bold">{complaints.length}</p>
//           </div>
//           <div className="bg-white p-4 rounded-lg shadow">
//             <h3 className="text-[#0E2517] mb-2">Pending</h3>
//             <p className="text-2xl font-bold text-yellow-500">
//               {complaints.filter(c => c.status === 'Pending').length}
//             </p>
//           </div>
//           <div className="bg-white p-4 rounded-lg shadow">
//             <h3 className="text-[#0E2517] mb-2">Resolved</h3>
//             <p className="text-2xl font-bold text-green-500">
//               {complaints.filter(c => c.status === 'Resolved').length}
//             </p>
//           </div>
//         </div>

//         {/* Complaints List */}
//         <div className="bg-white rounded-lg overflow-hidden shadow">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="bg-gray-100">
//                   <th className="px-6 py-3 text-left text-xs font-medium text-[#0E2517] uppercase tracking-wider">Image</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-[#0E2517] uppercase tracking-wider">Title</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-[#0E2517] uppercase tracking-wider">Location</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-[#0E2517] uppercase tracking-wider">Status</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-[#0E2517] uppercase tracking-wider">Date</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-[#0E2517] uppercase tracking-wider">Description</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {complaints.map((complaint) => (
//                   <tr key={complaint.id} className="hover:bg-gray-50 transition">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {complaint.image && (
//                         <img src={complaint.image} alt="Complaint" className="w-16 h-16 object-cover rounded" />
//                       )}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">{complaint.title || "-"}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">{complaint.location}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                         complaint.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-500' :
//                         complaint.status === 'In Progress' ? 'bg-blue-500/20 text-blue-500' :
//                         'bg-green-500/20 text-green-500'
//                       }`}>
//                         {complaint.status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">{complaint.timestamp && complaint.timestamp.toDate ? complaint.timestamp.toDate().toLocaleString() : "-"}</td>
//                     <td className="px-6 py-4">{complaint.description}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// } 