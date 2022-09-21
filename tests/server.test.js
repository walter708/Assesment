const request = require('supertest');
import app from '../app.js'
jest.mock('../http')
describe("Back-end Assessment", () => {
  
describe("Testing the ping end-point", () => {
  
  it("Will return the correct respond body", async () => {
    // arrange 
    const result = {"success" : true};
    // act
    const res = await request(app).get("/api/ping")
    // asssert
    expect(res.body).toEqual(result)
    
  })
  
  it("api_ping function will return the correct status", async () => {
    // arrange 
    const result = {"success" : true};
    // act
    const res = await request(app).get("/api/ping");
    // asssert
    expect(res.statusCode).toBe(200);
    
  })

  it("Will return the correct status code where route is incorrect", async () => {
    // arrange 
    const result = {"success" : true};
    // act
    const res = await request(app).get("/api/pings");
    // asssert
    expect(res.statusCode).toBe(404);
    
  })
  
})

describe("Testing api/posts end-points",  function () {
  
  it("Will return the proper status code for the correct posts end-point", async function () {
    const res = await request(app).get("/api/posts/?tags=tech");
    expect(res.statusCode).toBe(200)
  })
  
  it("Will return the correct status code for posts where end-points does not have a tag", async function () {
    const res = await request(app).get("/api/posts/");
    expect(res.statusCode).toBe(400)
  }) 
  
  it("Will return the correct status code for posts where sortBy (value ='likes' is like) is invalid", async function () {
    const res = await request(app).get("/api/posts/?tags=tech,health&sortBy=like&direction=desc");
    expect(res.statusCode).toBe(400)
  })
  
  it("Will return the correct status code for posts where route exits", async function () {
    const res = await request(app).get("/api/posts/?tags=tech,health&sortBy=likes&direction=desc");
    expect(res.statusCode).toBe(200)
  })
  
  it("Will  pass this test if the each post id is unique", async function () {
    
    const res = await request(app).get("/api/posts/?tags=tech,history");
    let posts = res.body;
    let postCount = new Set();
    let check = false;
    
    for(let i = 0; i < posts.length; i++){
      if(postCount.has(posts[i].id)){
        check = true
      }else{
        postCount.add(posts[i].id)
      }
    }    
    expect(check).toBe(false)
  });
  
  
  it("Will pass this test if posts are sorted by reads in ascending order ", async function () {

    const res = await request(app).get("/api/posts/?tags=tech,history&sortBy=reads");
    let posts = res.body;
    let checkSort = false
    
    for(let i = 0; i < posts.length - 1; i++){
      let item1 = posts[i].reads
      let item2 = posts[i+1].reads
      if (item1 > item2){
        checkSort = true;
      }
    }
    expect(checkSort).toBe(false)
  });
  
  it("Will pass this test if posts are sorted by reads in descending order ", async function () {

    const res = await request(app).get("/api/posts/?tags=tech,history&sortBy=reads&direction=desc");
    let posts = res.body.posts;
    let checkSort = false
    for(let i = 0; i < posts.length - 1; i++){
      let item1 = posts[i].reads;
      let item2 = posts[i+1].reads;
      if (item1 < item2){
        checkSort = true;
      }
    }
    expect(checkSort).toBe(false)
  });
})
})
