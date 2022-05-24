const _ = require('lodash')
const axios = require('axios')

const getTags = tagsString =>{
  let tags = ""
  if (tagsString.includes(",")){
    tags = tagsString.split(",");
    for(let i = 0 ; i < tags.length; i++){
      tags[i] = tags[i].trim();
    }
  }else{
    tags = tagsString 
    tags.trim()
  }
  
  console.log(typeof(tags))
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


const fetchData = async (query) =>{
  if (Object.keys(query).indexOf('tags') !== -1){
        let posts = []
        let result = []
        const tags = getTags(query.tags);
        
        
        if(tags === ""){
          return [400 , "Tags parameter is required"]
        }
        if(typeof(tags) === "string"){
          result = await axios.get("https://api.hatchways.io/assessment/blog/posts?tag="+ tags)
          posts = addNewPost(posts , result.data.posts)
        }else{
              const requests = tags.map((tag)=>
                   axios.get("https://api.hatchways.io/assessment/blog/posts?tag="+ tag)
              );
              try{
                result = await Promise.all(requests)
                
                result.map(item => {
                  posts = addNewPost(posts , item.data.posts)
                })  
              }
              catch(err){
                return [500 , err]
              }
            }
          return arrangeData(query , posts)
  }else{
    return [400 , "Tags parameter is required"]
  }
}



const arrangeData = (query , posts) =>{
    const sortByParameters = ['id', 'reads' , 'likes' , 'popularity']
    const directionParameters = ['asc', 'desc']
    
  if((Object.keys(query).indexOf('sortBy') === -1) && (Object.keys(query).indexOf('direction') === -1)){
    
    return [200 , sortValues(posts, "id", "asc")]
     
     }
    
  else if((Object.keys(query).indexOf('sortBy') !== -1) && (Object.keys(query).indexOf('direction') === -1)){
    
    if(sortByParameters.indexOf(query.sortBy) !== -1){
      
      return [200 , sortValues(posts , query.sortBy, "asc")]
      
    }
    else{
      
      return [400 , "sortBy parameter is invalid"]
      
    }
    
  }
  
  else if((Object.keys(query).indexOf('sortBy') === -1) && (Object.keys(query).indexOf('direction') !== -1)){
    
    if(directionParameters.indexOf(query.direction) !== -1){
      
      return [200 , sortValues(posts , "id", query.direction)]
      
    }
    else{
      
      return [400 , "direction parameter is invalid"]
      
    }
    
  }
  else if((Object.keys(query).indexOf('sortBy') !== -1) && (Object.keys(query).indexOf('direction') !== -1)){
    
    if(sortByParameters.indexOf(query.sortBy) === -1){
      
      return [400 , "sortBy parameter is invalid"]
      
    }
    else if(directionParameters.indexOf(query.direction) === -1){
      
      return [400 , "direction parameter is invalid"]
      
    }
    else{
      
      return [200 , sortValues(posts, query.sortBy, query.direction)]
      
    }
    
  }
}
  
const sortValues = (posts, sortBy , direction)=>{
  if(direction === "desc"){
    posts = posts.sort((a, b) => (b[sortBy] > a[sortBy] ? 1 : -1))
    return posts
  }else{
    posts = posts.sort((a, b) => (b[sortBy] < a[sortBy] ? 1 : -1))
    return posts
  }
}



module.exports = {fetchData}