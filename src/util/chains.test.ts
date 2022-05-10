import { chains, getChainAddress, getChainName } from "./chains";

describe("chains.ts", () => {
    it("should return the address as string for a valid chain key", () => {
        expect(getChainAddress(chains[0].key))
            .toBe(chains[0].address);
    });
    it("should return undefined as address for an invalid chain key", () => {
        expect(getChainAddress("If I’m not back in five minutes, just wait longer."))
            .toBe(undefined);
    });
    it("should return the name as string for a valid chain key", () => {
        expect(getChainName(chains[0].key))
            .toBe(chains[0].name);
    });
    it("should return undefined as name for an invalid chain key", () => {
        expect(
            getChainName(
                "Does it disturb anyone else that ‘The Los Angeles Angels’ baseball team translates directly to ‘The The Angels Angels’?"
            )
        ).toBe(undefined);
    });
});