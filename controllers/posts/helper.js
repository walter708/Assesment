import {getPosts} from "../../http.js";
import  Redis  from 'ioredis';
import dotenv from 'dotenv';
dotenv.config()

const cache = async (tags, id, data = []) => {
  const client = new Redis({
    port: process.env.REDIS_PORT, // Redis port
    host: process.env.REDIS_HOST, // Redis host
    username: "default", // needs Redis >= 6
    password: process.env.REDIS_PASSWORD,
    db: 0, // Defaults to 0
  });
    let key = "";
    let outcome = '';
    if (!(typeof(tags) === "string")){
      key = JSON.stringify(tags)
    }else{
      key = tags;
    }
    
    if (id === "get"){
    outcome = await client.del(key)
    outcome = await client.get(key)
    if(outcome){
      client.quit()
      console.log(JSON.parse(outcome))
      return JSON.parse(outcome);
    }else{
      return null
    }
  }else{
    const response = await client.setex(key, 2000, JSON.stringify(data))
    console.log(response)
    client.quit();
  }
  
}

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
    if (Object?.keys(query)?.indexOf("tags") !== -1) {
      
      let posts = [];
      let result = [];
      const tags = getTags(query.tags);
      
      if (tags === "") {
        return [400, "Tags parameter is required"];
      }
       
      const cachedValue = await cache(tags, "get");
      if(cachedValue !== null){
        return cachedValue;
      }

      
     if (typeof(tags) === "string") {
        result = await getPosts(tags)
        console.log(typeof(result)) 
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
      
      const data = arrangeData(query, posts);
      const response = await cache(tags, "set", data);
      console.log(response);
      return data;
      
    } else {
      
      return [400, "Tags parameter is required"];
      
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

// compareFn(a, b) return value   	sort order
//                   > 0	          sort a after b
//                   < 0	          sort a before b
//                  === 0	          keep original order of a and b
const sortValues = (posts, sortBy, direction) => {
  
  if (direction === "desc") {
    
    posts = posts.sort((a, b) => (a[sortBy] > b[sortBy] ? -1 : 1));
  
    return posts;
    
  } 
  else {
    
    posts = posts.sort((a, b) => (a[sortBy] < b[sortBy] ? -1 : 1));
    
    return posts;
  }
};
