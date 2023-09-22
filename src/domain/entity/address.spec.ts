import Address from "./address";

describe("Address unit tests", () => {

    it("should throw an error when the Street is empty", () => {
        expect(() => {
            const address = new Address("", 1, "123", "São Paulo");
        }).toThrowError("Street is required");
    });

    it("should throw an error when the Number is empty", () => {
        expect(() => {
            const address = new Address("Blue Street", 0, "123", "São Paulo");
        }).toThrowError("Number is required");
    });

    it("should throw an error when the Zip is empty", () => {
        expect(() => {
            const address = new Address("Blue Street", 1, "", "São Paulo");
        }).toThrowError("Zip is required");
    });

    it("should throw an error when the City is empty", () => {
        expect(() => {
            const address = new Address("Blue Street", 1, "123", "");
        }).toThrowError("City is required");
    });

    it("should format the Address properly", () => {

        // Arrange
        const address = new Address("Blue Street", 1, "123", "São Paulo");

        // Act
        const formattedAddress = address.toString();

        // Assert
        expect(formattedAddress).toBe("Blue Street, 1, 123, São Paulo");

    });

});