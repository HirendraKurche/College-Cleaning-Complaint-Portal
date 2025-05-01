// 'use client';

// import { useState } from 'react';

// export default function ReportIssueSection() {
//     const [image, setImage] = useState(null);
//     const [previewUrl, setPreviewUrl] = useState('');
//     const [location, setLocation] = useState('');
//     const [category, setCategory] = useState('');
//     const [customCategory, setCustomCategory] = useState('');
//     const [selectedLocation, setSelectedLocation] = useState('');
//     const [customLocation, setCustomLocation] = useState('');

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         setImage(file);
//         if (file) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setPreviewUrl(reader.result);
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const handleLocationDetect = () => {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition((position) => {
//                 const { latitude, longitude } = position.coords;
//                 setLocation(`Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`);
//             });
//         } else {
//             alert('Geolocation is not supported by this browser.');
//         }
//     };

//     return (
//         <section id="report-issue-section" className="max-w-full bg-zinc-900 text-white py-20 px-6 ">
//             <div className="max-w-3xl mx-auto mb-8">
//                 <h2 className="text-5xl font-bold">Report an Issue</h2>
//             </div>

//             {/* Image Upload */} 
//             <div className="mb-3 flex flex-col items-center"> 
//                 <div className="w-xl h-[175px] bg-[#D9D9D9] rounded-[30px] flex items-center justify-center text-black font-medium">
//                     {previewUrl ? (
//                         <img src={previewUrl} alt="Preview" className="h-full object-contain rounded-[30px]" />
//                     ) : (
//                         'No image selected'
//                     )}
//                 </div>
//                 <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageChange}
//                     className="mt-3 text-sm text-gray-300"
//                 />
//             </div>

//             {/* Input Fields */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-3xl mx-auto mb-4">

//                 {/* Category Selection */}
//                 <div className="flex flex-col">
//                     <label className="text-sm mb-1 font-light mx-2 py-2">Category</label>
//                     <select
//                         className="bg-[#D9D9D9] text-black rounded-full px-4 py-3 w-full focus:outline-none"
//                         value={category}
//                         onChange={(e) => setCategory(e.target.value)}
//                     >
//                         <option value="">Select Category</option>
//                         <option value="Cleanliness">Cleanliness</option>
//                         <option value="Water Leakage">Water Leakage</option>
//                         <option value="Broken Furniture">Broken Furniture</option>
//                         <option value="Electric Issue">Electric Issue</option>
//                         <option value="Other">Other</option>
//                     </select>
//                     {category === 'Other' && (
//                         <input
//                             type="text"
//                             placeholder="Enter custom category"
//                             className="mt-2 bg-[#D9D9D9] text-black rounded-full px-4 h-[50px] focus:outline-none"
//                             value={customCategory}
//                             onChange={(e) => setCustomCategory(e.target.value)}
//                         />
//                     )}
//                 </div>

//                 {/* /* Location Dropdown + Custom Option */} 
//                 <div className="flex flex-col">

//                     <div className="flex items-center justify-between">
//                         <label className="text-sm mb-1 font-light mx-2 py-2">Location</label>
//                         <button
//                             onClick={handleLocationDetect}
//                             className="text-sm underline font-light">Use current location
//                         </button>
//                     </div>

//                     {location && (
//                         <p className="my-1 text-xs text-gray-400">📍 {location}</p>
//                     )}
//                     <select
//                         className="bg-[#D9D9D9] text-black rounded-full px-4 py-3 w-full focus:outline-none"
//                         value={selectedLocation}
//                         onChange={(e) => setSelectedLocation(e.target.value)}
//                     >
//                         <option value="">Select Location</option>
//                         <option value="NTB">NTB</option>
//                         <option value="LRC">LRC</option>
//                         <option value="HOSTEL-10">HOSTEL-10</option>
//                         <option value="Other">Other</option>
//                     </select>
//                     {selectedLocation === 'Other' && (
//                         <input
//                             type="text"
//                             placeholder="Enter custom location"
//                             className="mt-2 bg-[#D9D9D9] text-black rounded-full px-4 h-[50px] focus:outline-none"
//                             value={customLocation}
//                             onChange={(e) => setCustomLocation(e.target.value)}
//                         />
//                     )}
//                 </div>


//                 {/* Complaint Description */}
//                 <div className="flex flex-col">
//                     <label className="text-sm mb-1 font-light mx-2 py-2">Complaint Description</label>
//                     <textarea
//                         rows="3"
//                         placeholder="Describe the issue"
//                         className="bg-[#D9D9D9] text-black rounded-2xl px-4 py-3 w-full focus:outline-none resize-none"
//                     />
//                 </div>

//                 {/* Location Description */}
//                 <div className="flex flex-col">
//                     <label className="text-sm mb-1 font-light mx-2 py-2">Location Description</label>
//                     <textarea                                                                               
//                         rows="3"
//                         placeholder="Additional location details (Area/Block/Floor/Room No.)"
//                         className="bg-[#D9D9D9] text-black rounded-2xl px-4 py-3 w-full focus:outline-none resize-none"
//                     />
//                 </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex flex-col items-center gap-4">
//                 <button className="bg-[#D9D9D9] text-black rounded-full px-6 py-2 text-base hover:bg-white transition">
//                     Capture
//                 </button>
//                 <button className="bg-[#D9D9D9] text-black rounded-full px-6 py-2 text-base hover:bg-white transition">
//                     Submit Complaint
//                 </button>
//             </div>
//         </section>
//     );
// }
