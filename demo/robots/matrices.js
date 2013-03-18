/*

A simple matrix function library, taken from my other project, superbigle.

In every function the `mat` parameter will hold the result but it's optional and
will be created automatically if not passed. Use it when you want to avoid
memory allocation.

*/

ns('matrices', function () {
  'use strict';

  this.fns(zero, identity, frustum, multiply, scale, translate);

  function zero (mat) {
    if (mat) {
      for (var i = 0; i < 16; ++i) {
        mat[i] = 0;
      }
      return mat;
    } else {
      return new Float32Array(16);
    }
  }

  function identity (mat) {
    mat = zero(mat);

    mat[0]  = 1;
    mat[5]  = 1;
    mat[10] = 1;
    mat[15] = 1;

    return mat;
  }

  function frustum (width, height, near, far, mat) {
    mat = zero(mat);

    mat[0]  = 2 * near / width;
    mat[5]  = 2 * near / height;
    mat[10] = (far + near) / (far - near);
    mat[11] = 1;
    mat[14] = (-2 * far * near) / (far - near);

    return mat;
  }

  function multiply (a, b, mat) {
    mat = mat || new Float32Array(16);

    var i, j, k = 0;

    for (i = 0; i < 16; ++i) {
      j = i % 4;

      mat[i] =
        a[j]      * b[k]     +
        a[j + 4]  * b[k + 1] +
        a[j + 8]  * b[k + 2] +
        a[j + 12] * b[k + 3];

      // after a column:
      if (j === 3) {
        k += 4;
      }
    }

    return mat;
  }

  function scale (x, y, z, mat) {
    mat = mat || identity(mat);

    mat[0]  *= x;
    mat[5]  *= y;
    mat[10] *= z;

    return mat;
  }

  function translate (x, y, z, mat) {
    mat = mat || identity();

    mat[12] += x;
    mat[13] += y;
    mat[14] += z;

    return mat;
  }
});
