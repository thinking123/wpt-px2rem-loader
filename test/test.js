const chai = require("chai");
const chaiCss = require("chai-css");
const { runLoaders } = require("loader-runner");
const path = require("path");

const expect = chai.expect;

chai.use(chaiCss);

const fixtures = path.resolve(__dirname, "fixtures");

describe("Px to Rem", function() {
  it("5 px to 1 rem", function(done) {
    const rem = 5;
    runLoaders(
      {
        resource: path.resolve(fixtures, "remtopx_5_unit.css"),
        loaders: [
          {
            loader: path.resolve(__dirname, "../src", "index.js"),
            options: {
              rem,
              exclude: []
            }
          }
        ]
      },
      function(err, result) {
        if (err) {
          return done(err);
        }

        console.log("res : ", result.result);

        const h = `${100/rem}rem`;
        const w = `${21/rem}rem`;
        const f = `${20/rem}rem`;
        expect(result.result)
          .to.have.rule(".p")
          .to.have.decl("height", h)
          .to.have.decl("width", w)
          .to.have.decl("font-size", f);

        done();
      }
    );
  });

  it("norem ignore ", function(done) {
    const rem = 10;
    runLoaders(
      {
        resource: path.resolve(fixtures, "norem_ignore.css"),
        loaders: [
          {
            loader: path.resolve(__dirname, "../src", "index.js"),
            options: {
              rem,
              exclude: []
            }
          }
        ]
      },
      function(err, result) {
        if (err) {
          return done(err);
        }

        console.log("res : ", result.result);

        const h = `${100/rem}rem`;
        const w = `21px`;
        const f = `20px`;

        expect(result.result)
          .to.have.rule("p")
          .to.have.decl("height", h)
          .to.have.decl("width", w)
          .to.have.decl("font-size", f);

        done();
      }
    );
  });

  it("exclude width fontsize", function(done) {
    const rem = 10;
    runLoaders(
      {
        resource: path.resolve(fixtures, "exclude_width.css"),
        loaders: [
          {
            loader: path.resolve(__dirname, "../src", "index.js"),
            options: {
              rem,
              exclude: ['font-size', 'width']
            }
          }
        ]
      },
      function(err, result) {
        if (err) {
          return done(err);
        }

        console.log("res : ", result.result);

        const h = `${100/rem}rem`;
        const w = `21px`;
        const f = `20px`;

        expect(result.result)
          .to.have.rule("p")
          .to.have.decl("height", h)
          .to.have.decl("width", w)
          .to.have.decl("font-size", f);

        done();
      }
    );
  });

  it("ignore  file  ", function(done) {
    const rem = 10;
    runLoaders(
      {
        resource: path.resolve(fixtures, "ignore_file.css"),
        loaders: [
          {
            loader: path.resolve(__dirname, "../src", "index.js"),
            options: {
              rem,
              exclude: ['font-size', 'width']
            }
          }
        ]
      },
      function(err, result) {
        if (err) {
          return done(err);
        }

        console.log("res : ", result.result);

        const h = `100px`;
        const w = `21px`;
        const f = `20px`;

        expect(result.result)
          .to.have.rule(".p")
          .to.have.decl("height", h)
          .to.have.decl("width", w)
          .to.have.decl("font-size", f);

        done();
      }
    );
  });

  it("remtopx 13 unit ", function(done) {
    const rem = 13;
    runLoaders(
      {
        resource: path.resolve(fixtures, "remtopx_13_unit.css"),
        loaders: [
          {
            loader: path.resolve(__dirname, "../src", "index.js"),
            options: {
              rem,
              exclude: []
            }
          }
        ],
      },
      function(err, result) {
        if (err) {
          return done(err);
        }

        console.log("res : ", result.result);

  
        function fixed4(num){
            return parseFloat(num.toFixed(4));
        }
        const h = `${fixed4(100/rem)}rem`;
        const w = `${fixed4(21/rem)}rem`;
        const f = `${fixed4(20/rem)}rem`;

        expect(result.result)
          .to.have.rule(".p")
          .to.have.decl("height", h)
          .to.have.decl("width", w)
          .to.have.decl("font-size", f);

        done();
      }
    );
  });

  
});
