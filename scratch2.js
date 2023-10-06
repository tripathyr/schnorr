  btcOperator.editFee_1 = function (tx_id, new_fee, private_key, change_only = true) {
    return new Promise((resolve, reject) => {
        tx_fetch_for_editing(tx_id)
            .then(tx => {
                parseTransaction(tx)
                    .then(tx_parsed => {
                        // ... (synchronous operations)
                        
                        // Resolve the promise with the result
                        resolve(tx.serialize());
                    })
                    .catch(error => reject(error));
            })
            .catch(error => reject(error));
    });
}

btcOperator.editFee_1 = function (tx_id, new_fee, private_key, change_only = true) {
    return new Promise((resolve, reject) => {
        tx_fetch_for_editing(tx_id)
            .then(tx => {
                parseTransaction(tx)
                    .then(tx_parsed => {
                        // ... (synchronous operations)
                        
                        // Resolve the promise with the result
                        resolve(tx.serialize());
                    })
                    .catch(error => reject(error));
            })
            .catch(error => reject(error));
    });
}



  btcOperator.editFee_1 = function (tx_id, new_fee, private_key, change_only = true) {
        return new Promise((resolve, reject) => {
            //1. FIND REDEEMSCRIPT
            //2. CHANGE OUTPUT VALUES
            //3. Call modified version of MultiSig.createTx_BTC_1 where the input taken is txhex rather than senders etc 
            //4. MultiSig.createTx_BTC_1 will in turn call btcOperator.createMultiSigTx_1(tx_hex). Check that Redeemscript information is present



            if (!Array.isArray(private_keys))
                private_keys = [private_keys];
            tx_fetch_for_editing(tx_id).then(tx => {
                parseTransaction(tx).then(tx_parsed => {
                    if (tx_parsed.fee >= new_fee)
                        return reject("Fees can only be increased");

                    //editable addresses in output values (for fee increase)
                    var edit_output_address = new Set();
                    if (change_only === true) //allow only change values (ie, sender address) to be edited to inc fee
                        tx_parsed.inputs.forEach(inp => edit_output_address.add(inp.address));
                    else if (change_only === false) //allow all output values to be edited
                        tx_parsed.outputs.forEach(out => edit_output_address.add(out.address));
                    else if (typeof change_only == 'string') // allow only given receiver id output to be edited
                        edit_output_address.add(change_only);
                    else if (Array.isArray(change_only))    //allow only given set of receiver id outputs to be edited
                        change_only.forEach(id => edit_output_address.add(id));

                    //edit output values to increase fee
                    let inc_fee = util.BTC_to_Sat(new_fee - tx_parsed.fee);
                    if (inc_fee < MIN_FEE_UPDATE)
                        return reject(`Insufficient additional fee. Minimum increment: ${MIN_FEE_UPDATE}`);
                    for (let i = tx.outs.length - 1; i >= 0 && inc_fee > 0; i--)   //reduce in reverse order
                        if (edit_output_address.has(tx_parsed.outputs[i].address)) {
                            let current_value = tx.outs[i].value;
                            if (current_value instanceof BigInteger)    //convert BigInteger class to inv value
                                current_value = current_value.intValue();
                            //edit the value as required
                            if (current_value > inc_fee) {
                                tx.outs[i].value = current_value - inc_fee;
                                inc_fee = 0;
                            } else {
                                inc_fee -= current_value;
                                tx.outs[i].value = 0;
                            }
                        }
                    if (inc_fee > 0) {
                        let max_possible_fee = util.BTC_to_Sat(new_fee) - inc_fee; //in satoshi
                        return reject(`Insufficient output values to increase fee. Maximum fee possible: ${util.Sat_to_BTC(max_possible_fee)}`);
                    }
                    tx.outs = tx.outs.filter(o => o.value >= DUST_AMT); //remove all output with value less than DUST amount

                    //remove existing signatures and reset the scripts
                    let wif_keys = [];
                    for (let i in tx.ins) {
                        var addr = tx_parsed.inputs[i].address,
                            value = util.BTC_to_Sat(tx_parsed.inputs[i].value);
                        let addr_decode = coinjs.addressDecode(addr);
                        //find the correct key for addr
                        var privKey = private_keys.find(pk => verifyKey(addr, pk));
                        if (!privKey)
                            return reject(`Private key missing for ${addr}`);
                        //find redeemScript (if any)
                        const rs = _redeemScript(addr, privKey);
                        rs === false ? wif_keys.unshift(privKey) : wif_keys.push(privKey); //sorting private-keys (wif)
                        //reset the script for re-signing
                        var script;
                        if (!rs || !rs.length) {
                            //legacy script (derive from address)
                            let s = coinjs.script();
                            s.writeOp(118); //OP_DUP
                            s.writeOp(169); //OP_HASH160
                            s.writeBytes(addr_decode.bytes);
                            s.writeOp(136); //OP_EQUALVERIFY
                            s.writeOp(172); //OP_CHECKSIG
                            script = Crypto.util.bytesToHex(s.buffer);
                        } else if (((rs.match(/^00/) && rs.length == 44)) || (rs.length == 40 && rs.match(/^[a-f0-9]+$/gi)) || addr_decode.type === 'multisigBech32') {
                            //redeemScript for segwit/bech32 and multisig (bech32)
                            let s = coinjs.script();
                            s.writeBytes(Crypto.util.hexToBytes(rs));
                            s.writeOp(0);
                            s.writeBytes(coinjs.numToBytes(value.toFixed(0), 8));
                            script = Crypto.util.bytesToHex(s.buffer);
                        } else //redeemScript for multisig (segwit)
                            script = rs;
                        tx.ins[i].script = coinjs.script(script);
                    }
                    tx.witness = false; //remove all witness signatures
                    console.debug("Unsigned:", tx.serialize());
                    //re-sign the transaction
                    new Set(wif_keys).forEach(key => tx.sign(key, 1 /*sighashtype*/)); //Sign the tx using private key WIF
                    //Call MultiSig.createTx_BTC_editFee(tx.serialize());
                    resolve(tx.serialize());
                }).catch(error => reject(error))
            }).catch(error => reject(error))
        })
    }   
   
   function outerPromise(A, B, C) {
    return new Promise((resolveOuter, rejectOuter) => {
        // A, B, and C are visible here
        console.log(`A: ${A}, B: ${B}, C: ${C} - Outermost Layer`);
        
        // Middle layer promise
        middlePromise(A,B)
            .then(result => {
                innerPromise(A).then(result => {console.log(`A: ${A}, B: ${B}, C: ${C}, Result: ${result}`) }).catch(error => rejectOuter(error));
                // A, B, and C are still visible here
                console.log(`A: ${A}, B: ${B}, C: ${C} - Middle Promise nested in Outer Layer`);
                resolveOuter(`Outer promise Resolution ${result}`);
            })
            .catch(error => rejectOuter(error));
    });
}

function middlePromise(A, B) {
    return new Promise((resolveMiddle, rejectMiddle) => {
        // A and B are visible here
        console.log(`A: ${A}, B: ${B} - Middle Layer`);
        
        // Innermost layer promise
        innerPromise(A)
            .then(result => {
                // A, B, and C are still visible here
                console.log(`A: ${A}, B: ${B} - Inner Promise nested in Middle Layer`);
                resolveMiddle(`Middle promise Resolution ${result}`);
            })
            .catch(error => rejectMiddle(error));
    });
}

function innerPromise(A) {
    return new Promise((resolveInner, rejectInner) => {
        // A is visible here
        console.log(`A: ${A} - Innermost Layer`);
        
        // Simulating some asynchronous operation
        setTimeout(() => {
            resolveInner(`Inner Promise Resolution ${A}`);
        }, 1000);
    });
}

// Usage
outerPromise("ValueA", "ValueB", "ValueC")
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.error(error);
    });