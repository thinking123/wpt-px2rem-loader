const chai = require("chai");
const { runLoaders } = require("loader-runner");
const path = require("path");
describe("Px to Rem", function() {
  it("10 px to 1 rem", function(done) {
    runLoaders(
      {
        resource: path.resolve(__dirname, "px1.css"),
        loaders: [
          {
            loader: path.resolve(__dirname, "../src", "index.js"),
            options: {
              rem: 5,
              exclude:[]
            }
          }
        ]
      },
      function(err, result) {
        if (err) {
          return done(err);
        }

        console.log("res : ", result.result);
        done();
      }
    );
  });
});
