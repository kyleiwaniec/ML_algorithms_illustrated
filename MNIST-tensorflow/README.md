To train the MNIST NN, run:

`python MNIST.py`  

This will run 1000 steps by default. It will output the following files:   
 _biases_.txt   
 _cross_entropy_.txt   
 _weights_.txt   
 
 you can specify parameters such as:   
 --max_steps   
 --learning_rate   
 --dropout   
 
 for example:   
 
 `python MNIST.py --max_steps 100`   

To serialize the output from summaries, run   

`rm -r /tmp/serialized-mnist`   
`python serialize.py --logdir /tmp/mnist_logs --target /tmp/serialized-mnist`   

