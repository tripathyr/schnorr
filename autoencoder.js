// Sigmoid activation function
function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

// Autoencoder network
function Autoencoder(inputSize, hiddenSize) {
    var self = this;

    self.inputSize = inputSize;
    self.hiddenSize = hiddenSize;

    // Initialize weights and biases randomly between -1 and 1
    self.weightsInputHidden = [];
    self.biasesHidden = [];
    self.weightsHiddenOutput = [];
    self.biasOutput = Math.random() * 2 - 1;

    for (var i = 0; i < self.inputSize; i++) {
        self.weightsInputHidden.push(Math.random() * 2 - 1);
    }

    for (var j = 0; j < self.hiddenSize; j++) {
        self.biasesHidden.push(Math.random() * 2 - 1);
        self.weightsHiddenOutput.push(Math.random() * 2 - 1);
    }
}

// Encode input data
Autoencoder.prototype.encode = function(input) {
    var self = this;
    var hiddenLayerOutput = 0;

    for (var i = 0; i < self.inputSize; i++) {
        hiddenLayerOutput += self.weightsInputHidden[i] * input[i];
    }

    for (var j = 0; j < self.hiddenSize; j++) {
        hiddenLayerOutput += self.biasesHidden[j];
    }

    return sigmoid(hiddenLayerOutput);
};

// Decode hidden representation
Autoencoder.prototype.decode = function(hiddenOutput) {
    var self = this;
    var output = 0;

    for (var j = 0; j < self.hiddenSize; j++) {
        output += self.weightsHiddenOutput[j] * hiddenOutput;
    }

    output += self.biasOutput;

    return sigmoid(output);
};

// Training the autoencoder using backpropagation
Autoencoder.prototype.train = function(input, learningRate) {
    var self = this;

    // Forward pass
    var hiddenOutput = self.encode(input);
    var reconstructedOutput = self.decode(hiddenOutput);

    // Backpropagation: Calculate error and update weights and biases
    var outputError = hiddenOutput - reconstructedOutput;
    var hiddenError = 0;

    for (var j = 0; j < self.hiddenSize; j++) {
        hiddenError += self.weightsHiddenOutput[j] * outputError;
    }

    // Update weights and biases
    self.biasOutput += learningRate * outputError * (1 - reconstructedOutput) * reconstructedOutput;

    for (var i = 0; i < self.inputSize; i++) {
        self.weightsInputHidden[i] += learningRate * hiddenError * hiddenOutput * (1 - hiddenOutput) * input[i];
    }

    for (var j = 0; j < self.hiddenSize; j++) {
        self.weightsHiddenOutput[j] += learningRate * outputError * hiddenOutput * (1 - hiddenOutput);
        self.biasesHidden[j] += learningRate * hiddenError * (1 - hiddenOutput) * hiddenOutput;
    }
};

// Example usage
var inputSize = 10;
var hiddenSize = 5;
var learningRate = 0.1;
var numIterations = 1000;

var autoencoder = new Autoencoder(inputSize, hiddenSize);

var autoencoder = new Autoencoder(inputSize, hiddenSize);

// Training the autoencoder
for (var iteration = 0; iteration < numIterations; iteration++) {
    // Generate random input data (for demonstration purposes)
    var input = [];

    for (var i = 0; i < inputSize; i++) {
        input.push(Math.random());
    }

    // Train the autoencoder
    autoencoder.train(input, learningRate);
}

// Test the trained autoencoder
var testInput = [];

for (var i = 0; i < inputSize; i++) {
    testInput.push(Math.random());
}

var encodedOutput = autoencoder.encode(testInput);
var decodedOutput = autoencoder.decode(encodedOutput);

console.log("Original Input:", testInput);
console.log("Encoded Output:", encodedOutput);
console.log("Decoded Output:", decodedOutput);