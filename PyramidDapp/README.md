Pyramid Scheme:

the contract builds a binary tree
we are the root

to join the tree you have to pay the contract 1 dollar (or some other currency)
this money is split between your ancestors in the following way:
your i-th ancestor gets 2^-i of that dollar (and the root gets the remaining)

for example if my depth is 3 (root is 0), then my dollar is split (0.5, 0.25, 0.25) to my ancestors up to root

notice to break even you need 2 children
you get 1 dollar for each full rank added to your subtree

possible improvments:
 - pay more to get a higher in the tree (buy someone else's place).
 - change constant (3 children per node, change division policy, etc.)