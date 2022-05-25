const axios = require('axios');
const { response } = require('express');
const request = require("request");
const {BASE_URL , ping_api} = require("./api_call")
// const axios = require("axios");
// const { response } = require("express");


describe("Back-end Assessment", function () {
  
  describe("Testing api ping end-point", function () {
    
      it("api_ping function Will return the correct respond body", async function () {
        
        
        const result = await ping_api();
        
        expect(result.data).toEqual({"success" : true})

      })     
      
      it("api_ping function will return the correct status", async function () {
        
        
        const result = await ping_api();
        
        expect(result.status).toBe(200)

      })
      it("Will return the correct status code for step 1 where route is incorrect", async function () {
        
        request(
          `${BASE_URL}/pings`,
          function (error, response, body) {
            expect(response.statusCode).toBe(404);
          }
        );

      });
  });
  
  describe("Testing posts end-point",  function () {
  
    it("Will return the proper status code for the correct posts end-point", async function () {
      const result = await axios.get(`${BASE_URL}/posts/?tags=tech`)
      const ststus = result.status
      expect(ststus).toEqual(200)
    })
    
    it("Will return the correct status code for posts where route does not have a tag", async function () {
      request(
        `${BASE_URL}/posts`,
        function (error, response, body) {
          expect(response.statusCode).toBe(400);
        }
      );
    })
    
    it("Will return the correct status code for posts where sortBy (value ='likes' is like) i.e it is invalid", async function () {
      request(
        `${BASE_URL}/posts/?tags=tech,health&sortBy=like&direction=desc`,
        function (error, response, body) {
          expect(response.statusCode).toBe(400);
        }
      );
    })
    
    it("Will return the correct status code for posts where route exits", async function () {
      request(
        `${BASE_URL}/posts/?tags=tech,health&sortBy=likes&direction=desc`,
        function (error, response, body) {
          expect(response.statusCode).toBe(200);
        }
      );
    })
    it("Will  pass this test if the each post id unique", async function () {
      let posts = []
      let postCount = {}
      let check = true
      
      await axios.get(`${BASE_URL}/posts/?tags=tech,history`).
      then(response => {
        posts = response.data.posts
        postCount = {}
        check = true
        
         for(let i = 0; i < posts.length; i++){
           if(!(posts[i].id in postCount)){
             postCount[posts[i].id] = 0
            }
            
           postCount[post[i].id] += 1
         }
         
         for(const val of Object.values(postCount)) {
           if (val > 1){
             check = false
           }
         }
         expect(check).toBe(true)
      })
      .catch((error) => {
        console.log(error)
      })
      
      expect(check).toBe(true)
      
      
      
    });
    
    it("Will pass this test if they are sorted by reads in ascending order ", async function () {
      let posts = []
      let checkSort = true
      let readsArrAce = []
      
      await axios.get(`${BASE_URL}/posts/?tags=tech,history&sortBy=reads`)
      .then(response => {
        
        posts = response.data.posts
        
        
        for(let i = 0; i < posts.length; i++){
          readsArrAce.push(posts[i].reads)
        }
        
        for(let j = 0; j < (readsArrAce.length - 1); j++){
          if(readsArrAce[j] > readsArrAce[j+1]){
            checkSort = false
          }
        }
        
        
        
      }).catch((error) => {
        console.log(error)
      })
      
      expect(checkSort).toBe(true)
    });
    
    it("Will pass this test if they are sorted by reads in descending order ", async function () {
      let posts = []
      let checkSortDec = true
      let readsArr = []
      await axios.get(`${BASE_URL}/posts/?tags=tech,history&sortBy=reads&direction=desc`)
      .then(response => {
        
        posts = response.data.posts
               
        for(let i = 0; i < posts.length; i++){
          readsArr.push(posts[i].reads)
        }
        
        for(let j = 0; j < (readsArr.length - 1); j++){
          if(readsArr[j] < readsArr[j+1]){
            checkSortDec = false
          }
        }
        
        
        
      }).catch((error) => {
        console.log(error)
      })
      
      expect(checkSortDec).toBe(true)

      
      
      
      
    });
  })
});