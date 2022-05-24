const _ = require('lodash')
const axios = require('axios')

const getTags = tagsString =>{
  tags = tagsString.split(",");
  
  for(let i = 0 ; i < tags.length; i++){
    tags[i] = tags[i].trim();
  }
  
  return tags
}

const addNewPost = (uniquePosts , newPost) =>{
  for(let i = 0 ; i < newPost.length; i++){
    added = false;
    
    for(let j = 0 ; j < uniquePosts.length; j++){
      if (_.isEqual(uniquePosts[j] , newPost[i])){
        added = true;
        break;
      }
    }
    
    if(!added){
      uniquePosts.push(newPost[i])
    }
    
    
  }
  return uniquePosts;
}


const fetchData = async (tagsString) =>{
  posts = []
  
  const tags = getTags(tagsString);
  
  const request = tags.map((tag)=>{
       axios.get("https://api.hatchways.io/assessment/blog/posts?tag="+tag)
  });
  
  try{
    const result = await Promise.all(request)
    
    result.map(item => {
      posts = addNewPost(posts , item.data.posts)
    })  
  }
  catch(err){
    return [false , err]
  }
  
  return [true , posts]
}


module.exports = {fetchData}