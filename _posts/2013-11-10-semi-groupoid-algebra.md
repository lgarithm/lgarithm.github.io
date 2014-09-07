---
layout: post
---

Let $R$ be a ring.

## Semi-group Algebra

Let $M$ be a semi-group, $f : M \to R$.
we write $f = \sum f\_m x^m$ formally and call $f\_m \in R$ the coefficient of $f$ at $x^m$,
where $f_m$ is the image of $m$ in $R$ under $f$.

Let
$$R\[\[M\]\] = \\\{f \vert f : M \to R\\\}$$
the algebra of formal series,
and
$$R\[M\] = \\\{f \vert f : M \to R, \\\# \\\{m \vert f(m) = 0 \\\} < +\infty \\\}$$
then algebra of polynomials.

_Notice that $R\[\[M\]\]$ is the free $R$-module with basis $M$._

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
Let $P$ be a poset, $Q = \\\{(g, h) \vert g \leq h\\\} \subset P \times P$,
$\alpha, \beta : Q \to R$,
$$\alpha\beta = \sum (\sum\_{g\leq k \leq h} \alpha\_{(g,k)} \beta\_{(k,h)})x^{(g,h)}$$

We can define an associative partial binary operation $\circ$ on $Q$,
$$\circ : Q \times Q \to Q$$
$$(x, y) \circ (y, z) \to (x, z)$$
but it doesn't make $Q$ into a semi-group.
This kind of algebra struture is called a semi-groupoid.
Howevery a semi-group is the special case of a semi-groupoid,
therefore we may generatlize the definition of semi-group algebra
to semi-groupoid algebra and still use the notation $R[Q]$ for the incidence algebra of $P$.
