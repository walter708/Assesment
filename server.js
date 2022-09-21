import app from "./app.js"
const port  = 5000;
    // SERVER LAUNCH
    app.listen(process.env.PORT || port, () => {
      console.log("listening to port " + (port));
    })


