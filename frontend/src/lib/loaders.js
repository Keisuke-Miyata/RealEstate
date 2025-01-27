// import {defer} from "react-router-dom"
// import apiRequest from "./apiRequest"
import {listData} from "../lib/data.js"

export const singlePlaceDetailLoader = async({params}) => {
    const { id } = params;
    console.log(typeof(id))
    const post = listData.find((item) => item.id.toString() === id);
    if(!post) {
        throw new Response("Post not found", {status: 404});
    }
    return post
    // const res = await apiRequest("/place/" + params.id)
    // return res.data
}