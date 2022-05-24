const _ = require('lodash')
const axios = require('axios')

const getTags = tagsString =>{
  if (tagsString.indexOf(",") === -1){
    tags = tagsString
  }else{
  tags = tagsString.split(",");
  }
  
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
  console.log(tags)
  const requests = tags.map((tag)=>
       axios.get("https://api.hatchways.io/assessment/blog/posts?tag="+ tag)
  );
  console.log(requests)
  try{
    const result = await Promise.all(requests)
    
    result.map(item => {
      posts = addNewPost(posts , item.data.posts)
    })  
  }
  catch(err){
    return [false , err]
  }
  
  return [true , posts]
}



// const sort = (query , posts) =>{
  
//   const sortByParameters = ['id', 'reads' , 'likes' , 'popularity']
//   const directionParameters = ['asc', 'desc']
//   if((Object.keys(query).indexOf('sortBy') == -1) && (Object.keys(query).indexOf('direction') == -1)){
//     return [1 , sortValues(posts, "id", "asc")]
//   }
//   else if((Object.keys(query).indexOf('sortBy') != -1) && (Object.keys(query).indexOf('direction') == -1)){
//     if(sortByParameters.indexOf(query.sortBy) != -1){
//       return [1, sortValues(posts , query.sortBy,"asc")]
//     }else{
//       return [-1 , {"error": "sortBy parameter is invalid"}]
//     }
    
//   }
//   else if((Object.keys(query).indexOf('sortBy') == -1) && (Object.keys(query).indexOf('direction') != -1)){
//     if(directionParameters.indexOf(query.direction) != -1){
//       return [1, sortValues(posts ,"id", query.direction)]
//     }else{
//       return [-1 , {"error": "direction parameter is invalid"}]
//     }
    
//   }
//   else if ((Object.keys(query).indexOf('sortBy') != -1) && (Object.keys(query).indexOf('direction') != -1)){
//     if((directionParameters.indexOf(query.direction) != -1)  && (sortByParameters.indexOf(query.sortBy) != -1)){
//       return [1, sortValues(posts ,query.sortBy, query.direction)]
//     }else if((directionParameters.indexOf(query.direction) != -1)){
//       return [-1 , {"error": "direction parameter is invalid"}]
      
//     }else if(sortByParameters.indexOf(query.sortBy) != -1){
//       return [-1 , {"error": "sortBy parameter is invalid"}]
//     }
    
//   }
  
  
  
// }
// const sortValues = (posts, sortBy , direction)=>{}

module.exports = {fetchData , sortBy}