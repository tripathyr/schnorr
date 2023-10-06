should('SignatureHash tests', () => {
  const regtest = { bech32: 'bcrt', pubKeyHash: 0x6f, scriptHash: 0xc4 };
  const tx = new btc.Transaction({
    allowLegacyWitnessUtxo: true,
  });
  const BTCamount = 10n ** 8n; // 1btc
  const txid = hex.decode('5d315414e5772696366f21e383d8306b668d0bfc4d2bbc66bcf8f13403f501f4');

  // Out addr
  const privOut = hex.decode('0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e');
  // TODO: btc.getPublic with types or something?
  const pubOut = secp256k1.getPublicKey(privOut, true);
  const out = btc.p2wpkh(pubOut, regtest);
  deepStrictEqual(out.address, 'bcrt1q37eawpk6wtn39jxnnmat0ggf85f0h6mtuhxxu3');

  const privKey = hex.decode('0101010101010101010101010101010101010101010101010101010101010101');
  const P1 = secp256k1.getPublicKey(privKey, true);
  const P1S = secp256k1_schnorr.getPublicKey(privKey);
  const S1 = btc.p2pkh(P1, regtest);
  const S2 = btc.p2wpkh(P1, regtest);
  const S3 = btc.p2tr(P1S, undefined, regtest);
  const spends = [S1, S2, S3];
  // console.log(
  //   'SPENDS',
  //   spends.map((i) => i.address)
  // );
  const auxRand = new Uint8Array(32);
  let index = 0;
  const addInput = (spend, sighash) => {
    tx.addInput({
      ...spend,
      txid,
      index: index++,
      witnessUtxo: { script: spend.script, amount: 150000000 },
      sighashType: sighash,
    });
  };
  const signIdx = (idx) => {
    tx.signIdx(privKey, idx, [tx.inputs[idx].sighashType], auxRand);
  };

  // Inputs
  // NONE + ANYONE  -- specific input + no outputs
  for (const s of spends) {
    addInput(s, btc.SignatureHash.NONE | btc.SignatureHash.ANYONECANPAY);
    // Should sign, since we don't care about outputs
    signIdx(index - 1);
  }
  // Add ouputs, since they are not signed.
  // NOTE: very problematic tx, because miner/pool can replce outputs with whatever it wants and re-send tx.
  for (const s of spends) tx.addOutputAddress(out.address, 1n * BTCamount, regtest);
  // Change last output 1 -> 1.5. This is fine, since output is unsigned
  tx.updateOutput(2, { amount: 1.5*10n**8n });
  let curIndex = index;
  for (const s of spends) addInput(s, btc.SignatureHash.SINGLE | btc.SignatureHash.ANYONECANPAY);
  // Throw because not corresponding outputs
  for (let i = curIndex; i < curIndex + 3; i++) throws(() => signIdx(i));
  // Let's add corresponding outputs
  for (const s of spends) tx.addOutputAddress(out.address, 1n * BTCamount, regtest);
  // Now sign is fine!
  for (let i = curIndex; i < curIndex + 3; i++) signIdx(i);
  // Cannot do that (output is signed)
  //throws(() => tx.updateOutput(5, { amount: btc.Decimal.decode('1.5') }));

   deepStrictEqual(tx.signStatus(), {
    addInput: true,
    addOutput: true,
    inputs: [0, 1, 2, 3, 4, 5],
    outputs: [3, 4, 5], // 0,1,2 is not signed, we can modify them
  });
  // Add outputs since we cannot add them after sign
  for (const s of spends) tx.addOutputAddress(out.address, 1n * BTCamount, regtest);
  for (const s of spends) {
    addInput(s, btc.SignatureHash.ALL | btc.SignatureHash.ANYONECANPAY);
    // Still can add inputs after sign, because of ANYONE
    signIdx(index - 1);
  }
  // Cannot add output, since they signed
  throws(() => tx.addOutputAddress(out.address, 1n * BTCamount, regtest));
  curIndex = index;
  // Default sighash all
  for (const s of spends) addInput(s, btc.SignatureHash.ALL);
  for (let i = curIndex; i < curIndex + 3; i++) signIdx(i);
  throws(() => tx.addOutputAddress(out.address, 1n * BTCamount, regtest));
  // Throws too, because no ANYONE in previous output
  throws(() => addInput(S1, btc.SignatureHash.ALL));
  tx.finalize();
  const txHex = hex.encode(tx.extract());
  // Verified against bitcoin core regnet (see test_noble3.py).
  // If breaks test, please re-test before changing
  deepStrictEqual(
    txHex,
    '0200000000010cf401f50334f1f8bc66bc2b4dfc0b8d666b30d883e3216f36962677e51454315d000000006b483045022100b740ffd61cd149d4cc16df56418813531db907ec78bbb5a7a092bd54590ec0ec022020217910b904bf8d1e7a7ac6dda61481aaac220ad6d95db7baafc6fd2b2cc2988221031b84c5567b126440995d3ed5aaba0565d71e1834604819ff9c17f5e9d5dd078ffffffffff401f50334f1f8bc66bc2b4dfc0b8d666b30d883e3216f36962677e51454315d0100000000fffffffff401f50334f1f8bc66bc2b4dfc0b8d666b30d883e3216f36962677e51454315d0200000000fffffffff401f50334f1f8bc66bc2b4dfc0b8d666b30d883e3216f36962677e51454315d030000006b483045022100f5eb8ff874eb0a56ea15f6032807c40aae44fa7ca8506d10a0b04b584f64d2b9022036674720c93cb331fbf2296b0c25476949cd53dedea86b8ac1c02f714e3803e98321031b84c5567b126440995d3ed5aaba0565d71e1834604819ff9c17f5e9d5dd078ffffffffff401f50334f1f8bc66bc2b4dfc0b8d666b30d883e3216f36962677e51454315d0400000000fffffffff401f50334f1f8bc66bc2b4dfc0b8d666b30d883e3216f36962677e51454315d0500000000fffffffff401f50334f1f8bc66bc2b4dfc0b8d666b30d883e3216f36962677e51454315d060000006a4730440220643eadb5498abf506542994b91edb80ae4b5642416a01b4b230789f2d450ea72022043004aea51367e89afab915e687880d50a4734cd62036e87fff1f3d37819f9598121031b84c5567b126440995d3ed5aaba0565d71e1834604819ff9c17f5e9d5dd078ffffffffff401f50334f1f8bc66bc2b4dfc0b8d666b30d883e3216f36962677e51454315d0700000000fffffffff401f50334f1f8bc66bc2b4dfc0b8d666b30d883e3216f36962677e51454315d0800000000fffffffff401f50334f1f8bc66bc2b4dfc0b8d666b30d883e3216f36962677e51454315d090000006b483045022100940d419d66b904b17e1b80bc347c397b44a93b797d45abc14b6c50d20485bad4022012314f3a430b32ff45d52c5875f210a2a4610d81f5c9f05f2024a9a18f8860110121031b84c5567b126440995d3ed5aaba0565d71e1834604819ff9c17f5e9d5dd078ffffffffff401f50334f1f8bc66bc2b4dfc0b8d666b30d883e3216f36962677e51454315d0a00000000fffffffff401f50334f1f8bc66bc2b4dfc0b8d666b30d883e3216f36962677e51454315d0b00000000ffffffff0900e1f505000000001600148fb3d706da72e712c8d39efab7a1093d12fbeb6b00e1f505000000001600148fb3d706da72e712c8d39efab7a1093d12fbeb6b80d1f008000000001600148fb3d706da72e712c8d39efab7a1093d12fbeb6b00e1f505000000001600148fb3d706da72e712c8d39efab7a1093d12fbeb6b00e1f505000000001600148fb3d706da72e712c8d39efab7a1093d12fbeb6b00e1f505000000001600148fb3d706da72e712c8d39efab7a1093d12fbeb6b00e1f505000000001600148fb3d706da72e712c8d39efab7a1093d12fbeb6b00e1f505000000001600148fb3d706da72e712c8d39efab7a1093d12fbeb6b00e1f505000000001600148fb3d706da72e712c8d39efab7a1093d12fbeb6b00024730440220415127cbbe534a8ffbf4e314ee0a9d2abffb7f64fdbd5135dd263b5ce3f67d5802203189fb2db5569dc850671085b3c25c24f278aa5cc0453d24b0c4a3fc1454afbe8221031b84c5567b126440995d3ed5aaba0565d71e1834604819ff9c17f5e9d5dd078f0141507f628d3ef46e70b9243434b8ca539274731c87a14ec88fa65dfd7b2037e60b3e416babe7ef276cb273833ed8042291914c26334feeb9a55cc8f9efa35be41d8200024730440220539211d3ad931874083b2bc952a49eb9aa8fea75502527f29fd5ae48c46b8c9202200f7579cf758ea7e1e899418164d632d8107dd1ba9f4a90bcbfa1bb98ae64cb3f8321031b84c5567b126440995d3ed5aaba0565d71e1834604819ff9c17f5e9d5dd078f01411b437539d56e59b0dbde2cfab5564d51d39891ed8519def0d59cbd2789125eb12aa1530d087802cd3dd0078e4c0b18c9fbdf2a2f6fdf2d76c4df31ca4aaa79c78300024830450221008afa156f9d47d122c30232e258ffebf0a8e266343981277ff9d0790ef2a3329002204b066ee4271098e4b016aa129de3de2bcab8c68f0fa29e7fb796abcf588686ea8121031b84c5567b126440995d3ed5aaba0565d71e1834604819ff9c17f5e9d5dd078f0141a8b9f0b486db7ceab2599b4bb3f010a2869ebeae1710952f2abd48ff7addf8cfb275e1f224a264ab1874b31c210d7cba6a64eb32ca0c99c0e6eb1f667a219696810002483045022100f6d3c2e18b703d7947bc4f6dee0dd263bd08dbbeb035da3cfbb7dbbeea3d1805022011ff20cb91194d7bcb4da5a0b73f466abe26b63ea0fbaf496cac2fdefe6e9cbc0121031b84c5567b126440995d3ed5aaba0565d71e1834604819ff9c17f5e9d5dd078f014114298569294ef1a933df44e1cb24657c31fc2806689e3aad5b47e527d6cf058fdffdb4b79227e663a448e4dc16615cedb1cfce1c79ebb76474bbb12d908d548c0100000000'
  );
});