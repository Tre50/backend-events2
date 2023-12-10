// import React, { useState, useEffect } from 'react';
// import firebase from 'firebase/app';
// import 'firebase/firestore';

// const PostComponent = () => {
//   const [posts, setPosts] = useState([]);

//   // Function to fetch posts from Firestore
//   const fetchPosts = async () => {
//     try {
//       const postsRef = firebase.firestore().collection('posts');
//       const snapshot = await postsRef.get();
//       const postsData = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setPosts(postsData);
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//     }
//   };

//   // Fetch posts when the component mounts
//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const deletePost = async (postId) => {
//     try {
//       await firebase.firestore().collection('posts').doc(postId).delete();
//       fetchPosts(); // Refresh posts after deletion
//     } catch (error) {
//       console.error('Error deleting post:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Posts</h1>
//       <ul>
//         {posts.map((post) => (
//           <li key={post.id}>
//             <p>{post.content}</p>
//             <button onClick={() => deletePost(post.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default PostComponent;
