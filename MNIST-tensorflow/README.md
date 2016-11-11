To train the MNIST NN, run:

`python MNIST.py`  


To serialize the output from summaries, run   

`rm -r /tmp/serialized-mnist`   
`python serialize.py --logdir /tmp/mnist_logs --target /tmp/serialized-mnist`   
