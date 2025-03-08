// import { LoaderFunctionArgs } from "react-router-dom"; // You might need to install @types/react-router-dom for the types
// import { listData } from "./data";

// interface Post {
//     id: number;
//     // Define other properties based on your data structure
// }

// export const singlePlaceDetailLoader = async ({ params }: LoaderFunctionArgs): Promise<Post> => {
//     const { id } = params;
//     console.log(typeof id);

//     const post = listData.find((item) => item.id.toString() === id);

//     if (!post) {
//         throw new Response("Post not found", { status: 404 });
//     }

//     return post;
//     // const res = await apiRequest("/place/" + params.id);
//     // return res.data;
// };
