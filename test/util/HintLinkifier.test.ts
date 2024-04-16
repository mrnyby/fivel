import { describe, expect, it } from "vitest";
import HintLinkifier from "../../src/util/HintLinkifier";

describe("HintLinkifier", () => {
    const testCases = [
        {
            input: "I've got no links to hold me down.",
            output: [
                { text: "I've got no links to hold me down.", href: null },
            ],
        },
        {
            input: "mrnyby.github.io/fivel",
            output: [
                { text: "mrnyby.github.io/fivel", href: "http://mrnyby.github.io/fivel" },
            ],
        },
        {
            input: "mrnyby.github.io/fivel is cool",
            output: [
                { text: "mrnyby.github.io/fivel", href: "http://mrnyby.github.io/fivel" },
                { text: " is cool", href: null },
            ],
        },
        {
            input: "cool is mrnyby.github.io/fivel",
            output: [
                { text: "cool is ", href: null },
                { text: "mrnyby.github.io/fivel", href: "http://mrnyby.github.io/fivel" },
            ],
        },
        {
            input: "some cool things are gorillagroove.net and mrnyby.github.io/fivel",
            output: [
                { text: "some cool things are ", href: null },
                { text: "gorillagroove.net", href: "http://gorillagroove.net" },
                { text: " and ", href: null },
                { text: "mrnyby.github.io/fivel", href: "http://mrnyby.github.io/fivel" },
            ],
        },
        {
            input: "gorillagroove.net and mrnyby.github.io/fivel are some cool things",
            output: [
                { text: "gorillagroove.net", href: "http://gorillagroove.net" },
                { text: " and ", href: null },
                { text: "mrnyby.github.io/fivel", href: "http://mrnyby.github.io/fivel" },
                { text: " are some cool things", href: null },
            ],
        },
        {
            input: "one cool thing is gorillagroove.net and mrnyby.github.io/fivel is another cool thing",
            output: [
                { text: "one cool thing is ", href: null },
                { text: "gorillagroove.net", href: "http://gorillagroove.net" },
                { text: " and ", href: null },
                { text: "mrnyby.github.io/fivel", href: "http://mrnyby.github.io/fivel" },
                { text: " is another cool thing", href: null },
            ],
        },
    ];

    testCases.forEach((testCase) => {
        it(`properly linkifies "${testCase.input}"`, () => {
            expect(HintLinkifier.linkify(testCase.input)).toStrictEqual(testCase.output);
        });
    });
});
