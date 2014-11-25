---
layout: post
---

Let $R$ be a ring.

## Semi-group Algebra

Let $M$ be a semi-group, $f : M \to R$.
we write $f = \sum f\_m x^m$ formally and call $f\_m \in R$ the coefficient of $f$ at $x^m$,
where $f_m$ is the image of $m$ in $R$ under $f$.

Let
$$R[[M]] = \\\{f \mid f : M \to R\\\}$$
the algebra of formal series,
and
$$R[M] = \\\{f \mid f : M \to R, \\\# \\\{m \mid f(m) = 0 \\\} < +\infty \\\}$$
the algebra of polynomials.

_Notice that $R[[M]]$ is the free $R$-module with basis $M$. $R[M]$ are those elements with finite support._

Define a binary operation on $R\[\[M\]\]$
$$fg = \sum (\sum\_{hk = m} f\_h g_k) x^m$$
It's easy to verify that this operation is associative.

### Examples
Now take $G = (\mathbb N, +)$, the semi-ring of natural numbers, with addition operation,
then $R[G]$ is right the polynomial ring of one variable, we usually denoted by $R\[X\_1\]$.
The formal sum $\sum f\_m x^m$ now becomes the generating function of the coefficient sequence.

When $G = \mathbb Z$, $R[G]$ becomes the Laurrent series.

When $G = (\mathbb N, \ast)$, $R[G]$ becomes the algrbra of arithmetic functions,
and the product is the Dirichlet convolution.

## Semi-groupoid Algebra

But the incidence algebra can not be defined in this way, which needs further genralization.

Recall the definition of incidence algebra:
Let $P$ be a poset, $Q = \\\{(g, h) \mid g \leq h\\\} \subset P \times P$,
$\alpha, \beta : Q \to R$,
$$\alpha\beta = \sum (\sum\_{g\leq k \leq h} \alpha\_{(g,k)} \beta\_{(k,h)})x^{(g,h)}$$

We can define an associative partial binary operation $\circ$ on $Q$,
$$\circ : Q \times Q \to Q$$
$$(x, y) \circ (y, z) \to (x, z)$$
It doesn't make $Q$ into a semi-group, this kind of algebra struture is called a semi-groupoid.
A semi-group is the special case of a semi-groupoid.

Note that the operation for $\alpha\beta$ above is still a total binary operation on $R[Q]$.
therefore we may generalize the definition of semi-group algebra
to semi-groupoid algebra and still use the notation $R[Q]$ for the incidence algebra of $P$.


## $R$-Algebra
Both semi-group algebra and semi-groupoid algebra are just $R$-algebras, where $R$ is a ring.
The general definition is, an $R$-algebra $A$ is a ring and also an $R$-module.
Which means, we have associative operations $A \times A \to A$ and $R \times A \to A$,
and the operation $A \times A \to A$ is $R$-bilinear.

The set of square matrics of order $n$, $M\_n(R)$ is a classical example of $R$-algebra.
It can be view as $R[I\_n^2]$, where $I\_n^2 = \\\{(i, j) \mid 1 \leq i, j \leq n \\\}$.
We will find that $I\_n^2$ also admits a semi-groupoid structure.

First write a matrix as $a = \sum a\_{ij} x^{ij}$, then the multiplication
$$c\_{ij} = \sum a\_{ik}b\_{kj}$$
can be rewrite as
$$\sum c\_{ij}x^{ij} = \sum (\sum a\_{ik}b\_{kj}) x^{ij}$$

Now it's clear that the partial binary operation on $I\_n^2$ is
$$(i, k) \circ (k, j) \to (i, j)$$
Which looks exactly the same as the operation on $Q$.

Think of $I\_n^2$ and $Q$ are edges of some graphs.
$I\_n^2$ is the set of edges of a clique, $Q$ is the set of edges of a digraph.
For edge $(x, y)$ and $(y, z)$, their connection is just $(x, z)$.
Two edges can be connected if and only if the first edges ends at where the seconds edge starts.

This leads to the concept of path algebra.
