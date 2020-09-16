

const filterByTerm = require("../src/filterByTerm.js")

describe("Filter function", () => {
    test("it should filter by a search term (link)", () => {
        const input = [{
                id: 1,
                url: "https://bit.ly/3gDKdlO"
            },
            {
                id: 2,
                url: "https://bit.ly/31GMGri"
            },
            {
                id: 3,
                url: "https://bit.ly/31JcNxP"
            }
        ];

        const output = [
            {
                id: 3,
                url: "https://bit.ly/31JcNxP"
            }
        ];

        expect(filterByTerm(input, "link")).toEqual(output);
    });
});

