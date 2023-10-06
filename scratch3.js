

//DON'T FORGET TO INCLUDE THIS FUNCTION
function extractLastHexStrings(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const innerArray = arr[i];
    if (innerArray.length > 0) {
      const lastHexString = innerArray[innerArray.length - 1];
      result.push(lastHexString);
    }
  }
  return result;
}

         btcOperator.signTx_1 = function (tx, privkeys, sighashtype = 1) {
      //  tx = deserializeTx(tx); //THIS PART HAS CHANGED FROM ORIGINAL
        if (!Array.isArray(privkeys))
            privkeys = [privkeys];
        for (let i in privkeys)
            if (privkeys[i].length === 64)
                privkeys[i] = coinjs.privkey2wif(privkeys[i]);
        new Set(privkeys).forEach(key => tx.sign(key, sighashtype)); //Sign the tx using private key WIF
        return tx.serialize();
    }

//THIS IS THE NEW MASTER FUNCTION
//ANOTER ITERATION
//COLLECT ANY PRIVATE KEY AMONG THE THREE

     btcOperator.editFee_1 = function (tx_id, address, new_fee, private_key, change_only = true) {
        return new Promise((resolve, reject) => {
            //1. FIND REDEEMSCRIPT
            //2. CHANGE OUTPUT VALUES
            //3. Call modified version of MultiSig.createTx_BTC_1 where the input taken is txhex rather than senders etc 
            //4. MultiSig.createTx_BTC_1 will in turn call btcOperator.createMultiSigTx_1(tx_hex). Check that Redeemscript information is present
            var mode, rs_array=[];
            mode="MultisigBech32Edit";
            if (mode == "MultisigBech32Edit") {rs_array = extractLastHexStrings(tx.witness);}; 

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
            let addr_type = btcOperator.validateAddress(address);
            if (addr_type != "multisig" && addr_type != "multisigBech32")
                return reject("Sender address is not a multisig");
            let decode = (addr_type == "multisig" ?
                coinjs.script().decodeRedeemScript : coinjs.script().decodeRedeemScriptBech32)(redeemScript);
            if (!decode || decode.address !== address || decode.type !== "multisig__")
                return reject("Invalid redeem-script");
            else if (!decode.pubkeys.includes(user.public.toLowerCase()) && !decode.pubkeys.includes(user.public.toUpperCase()))
                return reject("User is not a part of this multisig");
            else if (decode.pubkeys.length < decode.signaturesRequired)
                return reject("Invalid multisig (required is greater than users)");
            let co_owners = decode.pubkeys.map(p => floCrypto.getFloID(p));
            let privateKey = await floDapps.user.private;
          
            //  let tx_hex = btcOperator.signTx_1(tx, privateKey);
            let tx_hex = tx.serialize();
                createPipeline(TYPE_BTC_MULTISIG, co_owners, 32, decode.pubkeys).then(pipeline => {
                    let message = encrypt(tx_hex, pipeline.eKey);
                    sendRaw(message, pipeline.id, "TRANSACTION", false)
                        .then(result => resolve(pipeline.id))
                        .catch(error => reject(error)) //SENDRAW
                }).catch(error => reject(error)) //CREATE PIPELINE




                    resolve(tx.serialize());
                }).catch(error => reject(error))
            }).catch(error => reject(error))
        })
    }   
       


//ALL IN MESSENGER .. START WITH tx_sign_removed RATHER than BLANK ADDRESSES .. NEEDED
      //create multisig tx for BTC
      //address is address of Multisig
    MultiSig.createTx_BTC_1= function (tx_sign_removed, address, redeemScript, receivers, amounts, fee = null, options = {}) {
        return new Promise(async (resolve, reject) => {
            let addr_type = btcOperator.validateAddress(address);
            if (addr_type != "multisig" && addr_type != "multisigBech32")
                return reject("Sender address is not a multisig");
            let decode = (addr_type == "multisig" ?
                coinjs.script().decodeRedeemScript : coinjs.script().decodeRedeemScriptBech32)(redeemScript);
            if (!decode || decode.address !== address || decode.type !== "multisig__")
                return reject("Invalid redeem-script");
            else if (!decode.pubkeys.includes(user.public.toLowerCase()) && !decode.pubkeys.includes(user.public.toUpperCase()))
                return reject("User is not a part of this multisig");
            else if (decode.pubkeys.length < decode.signaturesRequired)
                return reject("Invalid multisig (required is greater than users)");
            let co_owners = decode.pubkeys.map(p => floCrypto.getFloID(p));
            let privateKey = await floDapps.user.private;
          
               let tx_hex = btcOperator.signTx_1(tx, privateKey);
                createPipeline(TYPE_BTC_MULTISIG, co_owners, 32, decode.pubkeys).then(pipeline => {
                    let message = encrypt(tx_hex, pipeline.eKey);
                    sendRaw(message, pipeline.id, "TRANSACTION", false)
                        .then(result => resolve(pipeline.id))
                        .catch(error => reject(error)) //SENDRAW
                }).catch(error => reject(error)) //CREATE PIPELINE
          
        })
    }

  

   





 


//===
// BELOW THIS MAY NOT BE NEEDED


 //OLDER VERSION -- DO NOT USE
    MultiSig.createTx_BTC_2= function (tx_sign_removed, address, redeemScript, receivers, amounts, fee = null, options = {}) {
        return new Promise(async (resolve, reject) => {
            let addr_type = btcOperator.validateAddress(address);
            if (addr_type != "multisig" && addr_type != "multisigBech32")
                return reject("Sender address is not a multisig");
            let decode = (addr_type == "multisig" ?
                coinjs.script().decodeRedeemScript : coinjs.script().decodeRedeemScriptBech32)(redeemScript);
            if (!decode || decode.address !== address || decode.type !== "multisig__")
                return reject("Invalid redeem-script");
            else if (!decode.pubkeys.includes(user.public.toLowerCase()) && !decode.pubkeys.includes(user.public.toUpperCase()))
                return reject("User is not a part of this multisig");
            else if (decode.pubkeys.length < decode.signaturesRequired)
                return reject("Invalid multisig (required is greater than users)");
            let co_owners = decode.pubkeys.map(p => floCrypto.getFloID(p));
            let privateKey = await floDapps.user.private;
            btcOperator.createMultiSigTx_1(tx).then(({ tx }) => {  //REMOVED
                tx_hex = btcOperator.signTx_1(tx, privateKey);
                createPipeline(TYPE_BTC_MULTISIG, co_owners, 32, decode.pubkeys).then(pipeline => {
                    let message = encrypt(tx_hex, pipeline.eKey);
                    sendRaw(message, pipeline.id, "TRANSACTION", false)
                        .then(result => resolve(pipeline.id))
                        .catch(error => reject(error)) //SENDRAW
                }).catch(error => reject(error)) //CREATE PIPELINE
            }).catch(error => reject(error)) //createMultiSigTx_1 //REMOVED
        })
    }


//OLD NOTES FIRST
//ADD Multisig.editFeeMultisigBech32 in messenger taking from btcOperator, and with modifications
//MODIFY MultiSig.createTx_BTC_editFee from messenger itself taking into account tx_sign_removed as source of initial data
// JUST THE ABOVE TWO CHANGES SHOULD BE NEEDED




// BASE FUNCTION IN btcoperator .. WILL NOT BE NEEDED >> JUST FOR REFERENCE
     btcOperator.editFee = function (tx_hex, new_fee, private_keys, change_only = true) {
        return new Promise((resolve, reject) => {
            if (!Array.isArray(private_keys))
                private_keys = [private_keys];
            tx_fetch_for_editing(tx_hex).then(tx => {
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
                    resolve(tx.serialize());
                }).catch(error => reject(error))
            }).catch(error => reject(error))
        })
    }

//Address is Multisig address being used here
        MultiSig.createTx_BTC_editFee = function (address, redeemScript, receivers, amounts, fee = null, options = {}) {
        return new Promise(async (resolve, reject) => {
            let addr_type = btcOperator.validateAddress(address);
            if (addr_type != "multisig" && addr_type != "multisigBech32")
                return reject("Sender address is not a multisig");
            let decode = (addr_type == "multisig" ?
                coinjs.script().decodeRedeemScript : coinjs.script().decodeRedeemScriptBech32)(redeemScript);
            if (!decode || decode.address !== address || decode.type !== "multisig__")
                return reject("Invalid redeem-script");
            else if (!decode.pubkeys.includes(user.public.toLowerCase()) && !decode.pubkeys.includes(user.public.toUpperCase()))
                return reject("User is not a part of this multisig");
            else if (decode.pubkeys.length < decode.signaturesRequired)
                return reject("Invalid multisig (required is greater than users)");
            let co_owners = decode.pubkeys.map(p => floCrypto.getFloID(p));
            let privateKey = await floDapps.user.private;
            btcOperator.createMultiSigTx_1(tx_hex).then(({ tx_hex }) => { //ROHIT CHECK IF REDEEMSCRIPT INFORMATION EXISTS
                // I need just this part signTx 
                tx_hex = btcOperator.signTx(tx_hex, privateKey);
                createPipeline(TYPE_BTC_MULTISIG, co_owners, 32, decode.pubkeys).then(pipeline => {
                    let message = encrypt(tx_hex, pipeline.eKey);
                    sendRaw(message, pipeline.id, "TRANSACTION", false)
                        .then(result => resolve(pipeline.id))
                        .catch(error => reject(error))
                }).catch(error => reject(error))
            }).catch(error => reject(error))
        })
    }


// ORIGINAL AS IN MESSENGER .. UNCHANGED .. FOR REFERENCE
    //create multisig tx for BTC
    MultiSig.createTx_BTC = function (address, redeemScript, receivers, amounts, fee = null, options = {}) {
        return new Promise(async (resolve, reject) => {
            let addr_type = btcOperator.validateAddress(address);
            if (addr_type != "multisig" && addr_type != "multisigBech32")
                return reject("Sender address is not a multisig");
            let decode = (addr_type == "multisig" ?
                coinjs.script().decodeRedeemScript : coinjs.script().decodeRedeemScriptBech32)(redeemScript);
            if (!decode || decode.address !== address || decode.type !== "multisig__")
                return reject("Invalid redeem-script");
            else if (!decode.pubkeys.includes(user.public.toLowerCase()) && !decode.pubkeys.includes(user.public.toUpperCase()))
                return reject("User is not a part of this multisig");
            else if (decode.pubkeys.length < decode.signaturesRequired)
                return reject("Invalid multisig (required is greater than users)");
            let co_owners = decode.pubkeys.map(p => floCrypto.getFloID(p));
            let privateKey = await floDapps.user.private;
            btcOperator.createMultiSigTx(address, redeemScript, receivers, amounts, fee, options).then(({ tx_hex }) => {
                tx_hex = btcOperator.signTx(tx_hex, privateKey);
                createPipeline(TYPE_BTC_MULTISIG, co_owners, 32, decode.pubkeys).then(pipeline => {
                    let message = encrypt(tx_hex, pipeline.eKey);
                    sendRaw(message, pipeline.id, "TRANSACTION", false)
                        .then(result => resolve(pipeline.id))
                        .catch(error => reject(error))
                }).catch(error => reject(error))
            }).catch(error => reject(error))
        })
    }


//TAKE FROM btcOPerator .. Import into messenger lib .. YES NEEDED
    btcOperator.editFeeMultisigBech32 = function (tx_hex, new_fee, private_keys=[], change_only = false) {
        return new Promise((resolve, reject) => {
            var mode, rs_array=[];
            if (!Array.isArray(private_keys))
                private_keys = [private_keys];

            if (private_keys.length == 0 ) { mode="MultisigBech32Edit";}

            tx_fetch_for_editing(tx_hex).then(tx => {
                   
                parseTransaction(tx).then(tx_parsed => {
                    if (mode == "MultisigBech32Edit") {rs_array = extractLastHexStrings(tx.witness);}; 

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
                       
                    if (mode == "MultisigBech32Edit") {rs = rs_array[0]} else { //We are assuming all redeemscripts in witness are same. This works for Messenger
                        //find the correct key for addr
                        var privKey = private_keys.find(pk => verifyKey(addr, pk));
                        if (!privKey)
                            return reject(`Private key missing for ${addr}`);
                        //find redeemScript (if any)
                        const rs = _redeemScript(addr, privKey);
                        rs === false ? wif_keys.unshift(privKey) : wif_keys.push(privKey); //sorting private-keys (wif)
                       }

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
                    
   
                    if (mode == "MultisigBech32Edit") {
                           //Either of these              
                       // btcOperator.createMultiSigTx ;
                       // MultiSig.createTx_BTC ;
                       //  MultiSig.signTx_BTC;
                       resolve("Sent to Messenger Pipeline"); // Figure output side of this later
                    } 
                        else { 
                    //re-sign the transaction
                    new Set(wif_keys).forEach(key => tx.sign(key, 1 /*sighashtype*/)); //Sign the tx using private key WIF
                    resolve(tx.serialize());
                    }

                    
                }).catch(error => reject(error))
            }).catch(error => reject(error))
        })
    }




          // THIS IS THE BASE FUNCTION USED 

       btcOperator.createMultiSigTx = function (sender, redeemScript, receivers, amounts, fee = null, options = {}) {
        return new Promise((resolve, reject) => {
            //validate tx parameters
            let addr_type = validateAddress(sender);
            if (!(["multisig", "multisigBech32"].includes(addr_type)))
                return reject("Invalid sender (multisig):" + sender);
            else {
                let script = coinjs.script();
                let decode = (addr_type == "multisig") ?
                    script.decodeRedeemScript(redeemScript) :
                    script.decodeRedeemScriptBech32(redeemScript);
                if (!decode || decode.address !== sender)
                    return reject("Invalid redeem-script");
            }
            try {
                ({
                    receivers,
                    amounts
                } = validateTxParameters({
                    receivers,
                    amounts,
                    fee,
                    change_address: options.change_address
                }));
            } catch (e) {
                return reject(e)
            }
            //create transaction
            createTransaction([sender], [redeemScript], receivers, amounts, fee, options.change_address || sender, options.fee_from_receiver).then(result => {
                result.tx_hex = result.transaction.serialize();
                delete result.transaction;
                resolve(result);
            }).catch(error => reject(error))

        })
    }

//THIS FUNCTION MAY NOT BE NEEDED AT ALL
btcOperator.createMultiSigTx_1 = function (tx) {
        return new Promise((resolve, reject) => {
            /*
            //validate tx parameters
            let addr_type = validateAddress(sender);
            if (!(["multisig", "multisigBech32"].includes(addr_type)))
                return reject("Invalid sender (multisig):" + sender);
            else {
                let script = coinjs.script();
                let decode = (addr_type == "multisig") ?
                    script.decodeRedeemScript(redeemScript) :
                    script.decodeRedeemScriptBech32(redeemScript);
                if (!decode || decode.address !== sender)
                    return reject("Invalid redeem-script");
            }
            try {
                ({
                    receivers,
                    amounts
                } = validateTxParameters({
                    receivers,
                    amounts,
                    fee,
                    change_address: options.change_address
                }));
            } catch (e) {
                return reject(e)
            }
            */
            //create transaction
            /* createTransaction([sender], [redeemScript], receivers, amounts, fee, options.change_address || sender, options.fee_from_receiver).then(result => {
                result.tx_hex = result.transaction.serialize();
                delete result.transaction;
                resolve(result); */
 
                resolve(tx); 
 
            }).catch(error => reject(error))

       // })
    }


//FROM MESSENGER HOMEPAGE
        async function calculateBtcFees() {
            const [sender, receivers, amounts, redeemScript] = await getTransactionInputs().catch(e => {
                console.error(e)
                return
            });
            return btcOperator.createMultiSigTx(sender, redeemScript, receivers, amounts)

//FROM BTC OPERATOR
     btcOperator.signTx = function (tx, privkeys, sighashtype = 1) {
        tx = deserializeTx(tx);
        if (!Array.isArray(privkeys))
            privkeys = [privkeys];
        for (let i in privkeys)
            if (privkeys[i].length === 64)
                privkeys[i] = coinjs.privkey2wif(privkeys[i]);
        new Set(privkeys).forEach(key => tx.sign(key, sighashtype)); //Sign the tx using private key WIF
        return tx.serialize();
    }

    

       
 // FROM MESSENGER INDEX
 function signTransaction(pipeID) {
            getConfirmation('Sign transaction', { message: 'Are you sure you want to sign this transaction?', confirmText: 'Sign' }).then(async (res) => {
                if (!res) return
                const banner = getRef('messages_container').querySelector('.signing-banner')
                const button = banner.querySelector('button')
                buttonLoader(button, true)
                console.log('Signing transaction', pipeID);
                try {
                    switch (messenger.pipeline[pipeID].model) {
                        case 'flo_multisig':
                            await messenger.multisig.signTx_FLO(pipeID)
                            break;
                        case 'btc_multisig':
                            await messenger.multisig.signTx_BTC(pipeID)
                            break;
                    }
                    getRef('messages_container').querySelector('.signing-banner').remove()
                    notify('Transaction signed', 'success')
                    if (messenger.pipeline[pipeID].disabled)
                        document.getElementById('transaction_details').querySelector('h4').textContent = 'Transaction signatures complete'
                } catch (err) {
                    notify(err, 'error')
                    buttonLoader(button, false)
                }
            })
        }          

// THIS FUNCTION CAN CHECK BOTH TXID and TXHEX depending upon what is given
function tx_fetch_for_editing(tx) {
        return new Promise((resolve, reject) => {
            if (typeof tx == 'string' && /^[0-9a-f]{64}$/i.test(tx)) { //tx is txid
                getTx.hex(tx)
                    .then(txhex => resolve(deserializeTx(txhex)))
                    .catch(error => reject(error))
            } else resolve(deserializeTx(tx));
        })
    }


//OLDER VERSION
btcOperator.editFee_2 = function (tx_id, new_fee, private_key, change_only = true) {
        return new Promise((resolve, reject) => {
            //1. FIND REDEEMSCRIPT
            //2. CHANGE OUTPUT VALUES
            //3. Call modified version of MultiSig.createTx_BTC_1 where the input taken is txhex rather than senders etc 
            //4. MultiSig.createTx_BTC_1 will in turn call btcOperator.createMultiSigTx_1(tx_hex). Check that Redeemscript information is present
            var mode, rs_array=[];
            mode="MultisigBech32Edit";
            if (mode == "MultisigBech32Edit") {rs_array = extractLastHexStrings(tx.witness);}; 

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
       


