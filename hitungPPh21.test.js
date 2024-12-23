const { hitungPPh21, validasiInput } = require("./hitungPPh21");

describe("hitungPPh21", () => {
    test("should return 0 if input is invalid", () => {
        const result = hitungPPh21({
            penghasilanPerBulan: -1000,
            status: "LAJANG",
            tanggungan: 1,
        });
        expect(result).toBe(0);
    });

    test("should return 0 if PKP is less than or equal to 0", () => {
        const result = hitungPPh21({
            penghasilanPerBulan: 1000000,
            status: "LAJANG",
            tanggungan: 0,
        });
        expect(result).toBe(0);
    });

    test("should calculate PPh21 correctly for LAJANG with no dependents", () => {
        const result = hitungPPh21({
            penghasilanPerBulan: 10000000,
            status: "LAJANG",
            tanggungan: 0,
        });
        expect(result).toBe(3900000);
    });

    test("should calculate PPh21 correctly for KAWIN with dependents", () => {
        const result = hitungPPh21({
            penghasilanPerBulan: 50000000,
            status: "KAWIN",
            tanggungan: 2,
        });
        expect(result).toBe(103750000);
    });
});

describe("validasiInput", () => {
    test("should return invalid for negative penghasilanPerBulan", () => {
        const validation = validasiInput({
            penghasilanPerBulan: -1000,
            status: "LAJANG",
            tanggungan: 1,
        });
        expect(validation.is_valid).toBe(false);
        expect(validation.error_message).toBe(
            "penghasilan [-1000] tidak valid."
        );
    });

    test("should return invalid for invalid status", () => {
        const validation = validasiInput({
            penghasilanPerBulan: 10000000,
            status: "INVALID",
            tanggungan: 1,
        });
        expect(validation.is_valid).toBe(false);
        expect(validation.error_message).toBe(
            "status [INVALID] bukan LAJANG atau KAWIN."
        );
    });

    test("should return invalid for invalid tanggungan", () => {
        const validation = validasiInput({
            penghasilanPerBulan: 10000000,
            status: "LAJANG",
            tanggungan: 5,
        });
        expect(validation.is_valid).toBe(false);
        expect(validation.error_message).toBe(
            "tanggungan [5] bukan di antara 0 sampai 3."
        );
    });

    test("should return valid input for correct data", () => {
        const validation = validasiInput({
            penghasilanPerBulan: 10000000,
            status: "LAJANG",
            tanggungan: 1,
        });
        expect(validation.is_valid).toBe(true);
    });
});
