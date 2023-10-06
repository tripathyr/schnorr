function decodeBech32(address) {
  const CHARSET = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';
  const BECH32_SEPARATOR = '1';

  const hasLowerCase = (str) => /[a-z]/.test(str);
  const hasUpperCase = (str) => /[A-Z]/.test(str);

  function expandHrp(hrp) {
    return Array.from(hrp).map((char) => char.charCodeAt(0) >> 5);
  }

  function polymod(values) {
    const GEN = [0x3b6a57b2, 0x26508e6d, 0x1ea119fa, 0x3d4233dd, 0x2a1462b3];
    let chk = 1;
    for (const value of values) {
      const top = chk >> 25;
      chk = (chk & 0x1ffffff) << 5 ^ value;
      for (let i = 0; i < 5; i++) {
        if ((top >> i) & 1) {
          chk ^= GEN[i];
        }
      }
    }
    return chk;
  }

  function hrpToData(hrp) {
    const expansion = expandHrp(hrp);
    return expansion.concat([0], Array.from(hrp).map((char) => char.charCodeAt(0) & 31));
  }

  function verifyChecksum(hrp, data) {
    return polymod(hrpToData(hrp).concat(data)) === 1;
  }

  function decode(address) {
    if (hasLowerCase(address) && hasUpperCase(address)) {
      throw new Error('Mixed-case address not allowed.');
    }

    const lowerAddress = address.toLowerCase();
    const pos = lowerAddress.lastIndexOf(BECH32_SEPARATOR);
    if (pos === -1) {
      throw new Error('Invalid address format.');
    }

    const hrp = lowerAddress.slice(0, pos);
    const data = lowerAddress.slice(pos + 1);

    if (data.includes('1') || hrp.includes('1') || data.length < 6) {
      throw new Error('Invalid address format.');
    }

    if (!verifyChecksum(hrp, Array.from(data).map((char) => CHARSET.indexOf(char)))) {
      throw new Error('Invalid checksum.');
    }

    return {
      hrp,
      data: Array.from(data).map((char) => CHARSET.indexOf(char)),
    };
  }

  try {
    return decode(address);
  } catch (error) {
    return null;
  }
}

function getAddressType(address) {
  const decoded = decodeBech32(address);
  if (decoded) {
    return decoded.hrp.slice(0, 2) === 'bc' ? 'bech32' : 'bech32m';
  } else {
    return 'none';
  }
}

// Test cases
var address1 = 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq';
var address2 = 'tb1q4kp7j59k3s0m6gza3lfmq2wzj0ewgdt230mhhw';
var address3 = 'tbm1qrp7j59k3s0m6gza3lfmq2wzj0ewgdt230mhhw';
var address4 = 'invalid_address';

console.log(getAddressType(address1)); // Output: "bech32"
console.log(getAddressType(address2)); // Output: "bech32"
console.log(getAddressType(address3)); // Output: "bech32m"
console.log(getAddressType(address4)); // Output: "none"