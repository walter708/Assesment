import  axios from "axios" ;

export const getPosts = async (tag) =>{
 const response = await axios.get("https://api.hatchways.io/assessment/blog/posts?tag=" + tag)
 return response.data.posts
}