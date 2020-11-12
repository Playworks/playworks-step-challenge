// import React, {useEffect, useState} from 'react';
// import axios from 'axios';
// import moment from 'moment';

// function VanillaFileUpload() {
//   const [files, setFiles] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [urls, setURLS] = useState([]);

//   // Load files on init
//   // useEffect(() => refreshFiles(), []);

//   const onFileSelect = async (evt) => {
//     // Show the "Uploading...." prompt
//     setIsLoading(true);

//     // Grab file from <input type="file" /> element
//     let file = evt.target.files[0];

//     // Ask our server to generate a "presigned" S3 request for us
//     // This will allow us to upload directly to S3,
//     // using axios.
//     // See server/routers/s3.router.js
//     let presignRes = await axios.post('/presign-upload', {
//       filename: file.name,
//     });

//     // Prepare our upload request.
//     let formData = new FormData();
//     // Include the actual file content in the request
//     // Include all of the fields from our presigned request.
//     // This is what authenticates our request, giving us access to the 
//     // bucket on S3
//     for (let key in presignRes.data.fields) {
//       formData.append(key, presignRes.data.fields[key]);
//     }
//     formData.append("file", file);
//     console.log('File', file);
    
    

//     // Upload the file, using the presigned URL
//     await axios.post(presignRes.data.url, formData, {
//       headers: {'Content-Type': 'multipart/form-data'}
//     });

//     console.log('RES', presignRes.data);

//     let photoData = {
//       s3: presignRes.data,
//       date: moment(Date()).format().substring(0,10),
//       challenges_id: 1,
//     }

//     console.log('Photo Data', photoData);
    

//     await axios.post('/api/photos', photoData);


//     // Grab the files from the server, so we can display
//     // images/videos on the DOM
//     refreshFiles();

//     // Hide the "Uploading...." prompt
//     setIsLoading(false);
//   }

//   const refreshFiles = async () => {
//     // See server/routers/s3.router.js
//     // We are also using pre-signed URLs for 
//     // viewing images from S3.
//     const res = await axios.get('/api/photos');
//     setFiles(res.data);
//   };

//   return (
//     <>
//       <h2>Submit Photos</h2>
//       <input type="file" onChange={onFileSelect} />

//       <p>
//       {isLoading && <marquee width="70">Uploading...</marquee>}
//       </p>

//       <h3>Files</h3>
//       {/* Render our uploaded files */}
//       {files.map(f => 
//         <>
//           <p>
//             Image:
//             <img src={f} />
//           </p>
//         </>
//       )}
//     </>
//   )
// }

// export default VanillaFileUpload;