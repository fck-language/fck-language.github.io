# Matrix

```fck
type matrix {
    int this.width
    int this.height
}
```

The `matrix` type is an $n\times m$ matrix containing floating point values

## Initialisation

To create a `matrix` type, you can do one of the following:
- pass in an `array<array<float>>` where each sub array **must** be the same length
- pass in a width and height for the matrix. This will create a matrix with zeros in

## Indexing values

In accordance with general practice in maths, the upper left value in a matrix has the index (1,1), **not** (0,0). Accessing values is done in the same manner for lists and arrays:

```fck
matrix example :: matrix.new(5, 5)
example[1, 1]
```

## Traits

### Is square

```fck
trait is_square(this) -> bool { ... }
```

Returns `true` if the matrix is square, otherwise `false`. This is a shorthand for checking
is `this.width == this.height`

### Inverse

```{admonition} Possible error
:class: warning
This raises an error if the matrix is not square or if it is not invertible (has a [determinant](#determinant) of 0)
```

```fck
trait inverse(this) -> matrix { ... }
```

Returns the inverse of an invertible square matrix.  
This uses the Cayley-Hamilton method with Bell polynomials. The Bell polynomials are calculated as the determinant of a
matrix

### Trace

```{admonition} Possible error
:class: warning
This raises an error if the matrix is not square
```

```fck
trait trace(this) -> float { ... }
```

Returns the trace of a square matrix

### Determinant

```{admonition} Possible error
:class: warning
This raises an error if the matrix is not square
```

```fck
trait determinant(this) -> float { ... }
```

Returns the determinant of a square matrix

### Transpose

```fck
trait transpose(this) -> matrix { ... }
```

Returns the transposed matrix
