---
layout: post
---

The multiplicative group module $n$, $(\mathbb Z/n\mathbb Z)^\ast$,
is the group of reduced residue class modulo $n$.
It has $\phi(n)$ elements.

Unlike the group $\mathbb Z/n\mathbb Z \cong C\_n$,
which can can be understood by drawing a regular polygon with n vertices,
$(\mathbb Z/n\mathbb Z)^\ast$ is somehow less intitutive.

For $(m, n) = 1$, we have
$(\mathbb Z/mn\mathbb Z)^\ast \cong (\mathbb Z/m\mathbb Z)^\ast \oplus (\mathbb Z/n\mathbb Z)^\ast$
The isomorphism is explicitly given by
$$a \to ([a]\_m, [a]\_n)$$
$$([x]\_m, [y]\_n) \to [n[n^{-1}]\_m x + m[m^{-1}]\_n y]\_{mn}$$
where $[a]\_n$ is the image of a in the homomorhpism $\mathbb Z \to \mathbb Z/n \mathbb Z$.

When $n$ has primitive roots, the this group becomes a cyclic group.
But how can we find out a connection between $(\mathbb Z/p\mathbb Z)^\ast$ and a regular polygon of $p-1$ vertices?

On the other hand, when $(m, n) = 1$ the direct sum of $C\_m$ and $C\_n$ has a strong geometric sense.
Remember that the product of two circles as topological space is a torus.
Image we have a grid on a torus, with $m$ horizontal circles and $n$ vertical circles,
when we walk along the direction $(1, 1)$, we can traverse all grid points $(x, y)$ on
then torus and the path will become a circle of length $mn$.


For $(\mathbb Z/n\mathbb Z)^\ast$, an elegant result is that,
every finite abelian group can be embeded into such a group for some integer n.
Assume that abelian group G has cyclic decomposition $\bigoplus C\_i$,
we pick up distinct prime numbers $p\_i$ such that $|C\_i| \vert p\_i - 1$,
then there is an embeding $C\_i \to \mathbb Z/p\mathbb Z$.
The existence of $p\_i$ is granted by the Dirichlet theorem on arithmetic progress.

How every, there is not aways an embeding of $(\mathbb Z/n\mathbb Z)^\ast$ into the unit circle $S^1$,
which means not all abelian group admits a faithful one-dimensional representation.

Is there an intitutive way to express the group $(\mathbb Z/n \mathbb Z)^\ast$ analog to $\mathbb Z/n\mathbb Z$?


