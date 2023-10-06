function gfAdd(a, b) {
  return a ^ b;
}

function gfMultiply(a, b) {
  let p = 0;
  while (b) {
    if (b & 1) {
      p ^= a;
    }
    a <<= 1;
    if (a & 0b1000) {
      a ^= 0b1011; // This is the irreducible polynomial x^3 + x + 1 for GF(2^4)
    }
    b >>= 1;
  }
  return p;
}

function rsEncode(data, n, k) {
  if (data.length !== k) {
    throw new Error('Data length must be equal to k');
  }

  // Pad data with zeroes to create the message polynomial
  const messagePolynomial = data.concat(new Array(n - k).fill(0));

  // Generate generator polynomial
  const generatorPolynomial = [1];
  for (let i = 1; i < n - k + 1; i++) {
    generatorPolynomial.push(gfMultiply(generatorPolynomial[i - 1], 2));
  }

  // Perform polynomial division (data * x^(n-k)) / generatorPolynomial
  const { quotient, remainder } = polynomialDivision(messagePolynomial.concat(new Array(n - k).fill(0)), generatorPolynomial);

  // Compute the codeword by XORing the message polynomial with the remainder
  const codeword = [];
  for (let i = 0; i < n; i++) {
    codeword.push(gfAdd(messagePolynomial[i], remainder[i]));
  }

  return codeword;
}

function rsDecode(codeword, n, k, numErrors) {
  if (codeword.length !== n) {
    throw new Error('Codeword length must be equal to n');
  }

  // Pad codeword with zeroes to create the received polynomial
  const receivedPolynomial = codeword.concat(new Array(n - codeword.length).fill(0));

  // Generate syndrome polynomial
  const syndromePolynomial = new Array(n - k).fill(0);
  for (let i = 0; i < n - k; i++) {
    for (let j = 0; j < n; j++) {
      syndromePolynomial[i] ^= gfMultiply(receivedPolynomial[j], gfMultiply(j, 2 ** i));
    }
  }

  // Find error locator polynomial and error evaluator polynomial
  const { errorLocator, errorEvaluator } = berlekampMasseyAlgorithm(syndromePolynomial);

  // Find error locations using Chien's search
  const errorLocations = [];
  for (let i = 0; i < n; i++) {
    if (evaluatePolynomial(errorLocator, gfMultiply(i, 2)) === 0) {
      errorLocations.push(i);
    }
  }

  // Correct errors if the number of errors is within the correctable range
  if (errorLocations.length <= numErrors) {
    for (const i of errorLocations) {
      const errorValue = evaluatePolynomial(errorEvaluator, i);
      receivedPolynomial[i] ^= errorValue;
    }
  }

  // Extract original data from the corrected received polynomial
  const data = receivedPolynomial.slice(0, k);
  return data;
}

function polynomialDivision(dividend, divisor) {
  const quotient = new Array(dividend.length).fill(0);
  let remainder = dividend.slice();

  while (remainder.length >= divisor.length) {
    const ratio = remainder[0];
    for (let i = 0; i < divisor.length; i++) {
      remainder[i] ^= gfMultiply(divisor[i], ratio);
    }

    let shiftAmount = 0;
    while (remainder[0] === 0 && shiftAmount < remainder.length - divisor.length) {
      shiftAmount++;
      remainder.shift();
    }

    quotient[remainder.length - shiftAmount - divisor.length] = ratio;
  }

  return { quotient, remainder };
}

function evaluatePolynomial(polynomial, x) {
  let result = 0;
  for (const coefficient of polynomial) {
    result = gfMultiply(result, x) ^ coefficient;
  }
  return result;
}

function berlekampMasseyAlgorithm(syndromePolynomial) {
  const N = syndromePolynomial.length;
  let L = 0;
  let m = -1;
  const C = new Array(N).fill(0);
  const B = new Array(N).fill(0);
  C[0] = 1;
  B[0] = 1;

  for (let n = 0; n < N; n++) {
    let delta = syndromePolynomial[n];
    for (let i = 1; i <= L; i++) {
      delta ^= gfMultiply(C[i], syndromePolynomial[n - i]);
    }
    if (delta === 0) {
      m++;
    } else {
      const T = C.slice();
      for (let i = 0; i < N - n + m; i++) {
        C[n - m + i] ^= gfMultiply(delta, B[i]);
      }
      if (2 * L <= n) {
        L = n + 1 - L;
        m = n;
        B.set(T);
      }
    }
  }

  const errorLocator = C.slice(0, L + 1).reverse();
  const errorEvaluator = syndromePolynomial.slice(0, L).reverse();
  return { errorLocator, errorEvaluator };
}

// Toy Reed-Solomon code parameters
const n = 7; // Block length
const k = 4; // Message length
const numErrors = 1; // Number of errors to introduce for demonstration purposes

// Original data to encode
const data = [2, 7, 4, 5];

// Reed-Solomon encoding
const codeword = rsEncode(data, n, k);
console.log('Original Data:', data);
console.log('Codeword:', codeword);

// Introduce errors for decoding demonstration
const errorPositions = [1, 4]; // Positions where errors will be introduced
for (const position of errorPositions) {
  codeword[position] = (codeword[position] + 1) % 16; // Introduce errors in GF(2^4)
}

// Reed-Solomon decoding
const decodedData = rsDecode(codeword, n, k, numErrors);
console.log('Received Codeword:', codeword);
console.log('Decoded Data:', decodedData);
