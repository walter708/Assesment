# BLOG API

## This is a simple BLOG API

### Description
Hi, fellow developers, thank you for checking this out. This is a JSON API that provides access to blog posts. 
This is my solution to hatchways online assement which I have updated with Feedbacks.
I used ExpressJS and NodeJS to create and use JEST for testing the API. 
The main reason I choose this frameworks was because i am confortable programming with Javascript.

### Endpoints
When running on your local system 

```localhost:3000/api/ping ```

```localhost:3000/api/posts/?tag=tech```

```localhost:3000/api/posts/?tag=science```

```localhost:3000/api/posts/?tag=tech&sortBy=id?```
```localhost:3000/api/posts/?tag=science&sortBy=reads?```

 You can also access through this link ``` https://walnut-assesment.herokuapp.com/api/posts/?tag=tech```
 
 Here is a description of the query arguments 
 
 
 <pre>
 Field                Type                 Description                           Default       Example 
 
 tags                 String               A comma separated list of tags         NA           science,tech
 
 sortBy               String              The field to sort the posts by.         id           popularity
                                          The accepteble fields are:
                                                 a id
                                                 b reads
                                                 c likes 
                                                 d popularity
                                                 
  direction          String(optional)     The direction for sorting.The            asc           asc 
                                          acceptable fields are:
                                                a decs
                                                b asc
                         
 
 </pre>
                            


### How to Install and Run the Project
Clone the repository

To run the project use ``` npm start```
