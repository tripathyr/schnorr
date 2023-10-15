    var Keccak = function() {
        var RC = [
            0x0000000000000001, 0x0000000000008082, 0x800000000000808a,
            0x8000000080008000, 0x000000000000808b, 0x0000000080000001,
            0x8000000080008081, 0x8000000000008009, 0x000000000000008a,
            0x0000000000000088, 0x0000000080008009, 0x000000008000000a,
            0x000000008000808b, 0x800000000000008b, 0x8000000000008089,
            0x8000000000008003, 0x8000000000008002, 0x8000000000000080,
            0x000000000000800a, 0x800000008000000a, 0x8000000080008081,
            0x8000000000008080, 0x0000000080000001, 0x8000000080008008
        ];

        var r = [
            [10,  7, 11, 17, 18, 3,  5, 16,  8, 21, 24,  4, 15, 23, 19, 13, 12,  2, 20, 14, 22,  9,  6,  1],
            [11,  6,  8, 20, 12, 4, 21, 18, 25,  3,  1, 13,  7,  9,  6, 27, 14,  5, 19, 24,  2, 16, 23, 10, 22],
            [12, 23,  2, 24, 16, 10, 27,  8,  5, 13,  1,  6, 25, 22,  4, 17,  9, 20, 18,  3,  7, 21, 15, 26, 11],
            [13,  3, 12, 14, 11, 15,  6, 21, 10,  5,  7, 20, 18, 26, 19, 24, 27,  2,  1, 22,  8, 17, 16,  9,  4],
            [14,  4, 13, 22,  9,  2, 18, 11, 23,  6,  7, 24, 15, 21,  5,  8, 12, 19,  3,  1, 10, 27, 25, 16, 26],
            [15, 24,  5,  8,  2, 26, 18, 12, 10, 11, 22,  9, 23, 13, 19, 21, 16, 27,  7,  3, 20, 14, 25,  4,  6],
            [16, 12, 22,  7,  5,  1, 10, 15, 17, 25,  6,  2, 13, 27,  9,  1,  3, 24, 14, 20,  8, 26,  4, 23, 11],
            [17,  9,  3,  1, 26, 14, 24, 25, 19,  2,  8, 23, 12,  7, 10, 18,  6, 15, 21,  5, 20,  4, 13, 22, 16],
        ];

        var state = new Array(25);
        var words = new Array(1600);

        function keccakF1600() {
            var C = new Array(5);
            var D = new Array(5);
            var B = new Array(5);
            var t, x, y;
            for (t = 0; t < 24; t++) {
                // θ step
                for (x = 0; x < 5; x++) {
                    C[x] = state[x];
                    for (y = 1; y < 5; y++) {
                        C[x] ^= state[x + y * 5];
                    }
                }
                for (x = 0; x < 5; x++) {
                    D[x] = C[(x + 4) % 5] ^ ((C[(x + 1) % 5] << 1) ^ ((C[(x + 1) % 5] & 0x8000000000000000) ? 0x71 : 0));
                }
                for (x = 0; x < 5; x++) {
                    for (y = 0; y < 5; y++) {
                        state[x + y * 5] ^= D[x];
                    }
                }
                // ρ and π steps
                x = 1;
                y = 0;
                var current = state[1];
                for (t = 0; t < 24; t++) {
                    var tempX = x;
                    x = y;
                    y = (2 * tempX + 3 * y) % 5;
                    var shiftValue = current;
                    current = state[x + y * 5];
                    state[x + y * 5] = ((shiftValue << r[x][y]) | (shiftValue >>> (64 - r[x][y])));
                }
                // χ step
                for (y = 0; y < 5; y++) {
                    for (x = 0; x < 5; x++) {
                        B[x] = state[x + y * 5];
                    }
                    for (x = 0; x < 5; x++) {
                        state[x + y * 5] = B[x] ^ ((~B[(x + 1) % 5]) & B[(x + 2) % 5]);
                    }
                }
                // ι step
                state[0] ^= RC[t];
            }
        }

        function keccak1600(input, outputLen) {
            var i, j, offset, block, part, inputLen = input.length;
            for (i = 0; i < 25; i++) {
                state[i] = 0;
            }
            for (i = 0; i < inputLen; i++) {
                state[i >> 3] ^= (input[i] & 0xFF) << ((i % 8) * 8);
            }
            state[inputLen >> 3] ^= 0x06; // padding
            state[(((inputLen + 1) % 72) + 72 - 17) >> 3] ^= 0x80; // padding
            keccakF1600();
            var output = new Uint8Array(outputLen);
            for (i = 0; i < outputLen; ) {
                offset = i % 200;
                block = offset < 136 ? 136 - offset : 200 - offset;
                if (block > outputLen - i) {
                    block = outputLen - i;
                }
                for (j = 0; j < block; ) {
                    part = 200 - offset < block - j ? 200 - offset : block - j;
                    for (; part; part--) {
                        output[i++] = (state[offset++] & 0xFF);
                    }
                    offset = 0;
                    keccakF1600();
                }
            }
            return output;
        }

        return {
            digest: function(input) {
                return keccak1600(input, 32);
            }
        };
    };

    // Example usage:
    var keccak = Keccak();
    var input = "Hello, Keccak!";
    var hash = keccak.digest(input);
    console.log("Keccak-256 Hash: ", arrayBufferToHex(hash));

    function arrayBufferToHex(buffer) {
        var hex = "";
        var view = new DataView(buffer);
        for (var i = 0; i < buffer.byteLength; i += 4) {
            var value = view.getUint32(i);
            hex += value.toString(16).padStart(8, "0");
        }
        return hex;
    }

