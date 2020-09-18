

const filterByTerm = require("../src/filterByTerm.js")

describe("Filter function", () => {
    test("it should filter by a search term (link)", () => {
        const input = [


            
        ];

        expect(filterByTerm(input, "link")).toEqual(output);
    });
});

