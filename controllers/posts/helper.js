import {getPosts} from "../../api/posts.js" 

// A function for query preprocessing 
const getTags = (tagsString) => {
  
  let tags = "";
  
  if (tagsString.includes(",")) {
    
    tags = tagsString.split(",");
    
    for (let i = 0; i < tags.length; i++) {
      
      tags[i] = tags[i].trim();
      
    }
    
  } 
  else {
    
    tags = tagsString;
    
    tags.trim();
    
  }

  return tags;
  
};

// A function to remove duplicates and return a array of unique posts 

const addNewPost = (uniquePosts, newPost) => {
  const postMap = {};
  
  for(let post of uniquePosts){
    postMap[post.id] = post;
  }
  
  for(let post of newPost){
    if(!(post.id in postMap)){
      uniquePosts.push(post);
    }
  }
  return uniquePosts;
};

// This function fetchs data from the provided api in a concurrent way

export const fetchData = async (query) => {
  if(query === undefined || query === null){
    console.log("loading")
  }else{
    if (Object?.keys(query)?.indexOf("tags") !== -1) {
    
      let posts = [];
      
      let result = [];
      
      const tags = getTags(query.tags);
      
  
      if (tags === "") {
        
        return [400, "Tags parameter is required"];
        
      }
      
      else if (typeof(tags) === "string") {
        
        result = await getPosts(tags)
        posts = addNewPost(posts, result);
        
      } else {
        
        const requests = tags.map((tag) =>
           getPosts(tag)
        );
        
        try {
          
          result = await Promise.all(requests);
  
          result.map((item) => {
            
            posts = addNewPost(posts, item);
            
          });
          
        } 
        catch (err) {
          
          return [500, err];
          
        }
        
      }
      
      return arrangeData(query, posts);
      
    } else {
      
      return [400, "Tags parameter is required"];
      
    }
  }
  
  
};



// This function sort the posts 
const arrangeData = (query, posts) => {
  
  const sortByParameters = ["id", "reads", "likes", "popularity"];
  
  const directionParameters = ["asc", "desc"];

  if (
    
    Object.keys(query).indexOf("sortBy") === -1 &&
    Object.keys(query).indexOf("direction") === -1
    
  ) 
  {
    return [200, sortValues(posts, "id", "asc")];
    
  } 
  else if (
    Object.keys(query).indexOf("sortBy") !== -1 &&
    Object.keys(query).indexOf("direction") === -1
    
  ) 
  {
    if (sortByParameters.indexOf(query.sortBy) !== -1) {
      
      return [200, sortValues(posts, query.sortBy, "asc")];
      
    } else {
      
      return [400, "sortBy parameter is invalid"];
      
    }
    
  } else if (
    
    Object.keys(query).indexOf("sortBy") === -1 &&
    Object.keys(query).indexOf("direction") !== -1
    
  ) {
    
    if (directionParameters.indexOf(query.direction) !== -1) {
      
      return [200, sortValues(posts, "id", query.direction)];
      
    } 
    else {
      return [400, "direction parameter is invalid"];
      
    }
  } 
  else if (
    Object.keys(query).indexOf("sortBy") !== -1 &&
    Object.keys(query).indexOf("direction") !== -1
    
  ) {
    
    if (sortByParameters.indexOf(query.sortBy) === -1) {
      
      return [400, "sortBy parameter is invalid"];
      
    } else if (directionParameters.indexOf(query.direction) === -1) {
      
      return [400, "direction parameter is invalid"];
      
    }
     else {
       
      return [200, sortValues(posts, query.sortBy, query.direction)];
      
    }
  }
};

const sortValues = (posts, sortBy, direction) => {
  
  if (direction === "desc") {
    
    posts = posts.sort((a, b) => (b[sortBy] > a[sortBy] ? 1 : -1));
  
    return posts;
    
  } 
  else {
    
    posts = posts.sort((a, b) => (b[sortBy] < a[sortBy] ? 1 : -1));
    
    return posts;
  }
};

// module.exports = { fetchData };
fetchData()
