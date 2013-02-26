// Define the testing pattern
function assert_equal(then, expected) {
  deepEqual(CoinChange.calculate(then[0], then[1]), expected);
}

test("Test Example Cases", function() {
  assert_equal( [15, [1, 5, 10, 25, 100]],  [0, 1, 1, 0, 0]);
  assert_equal( [40, [1, 5, 10, 25, 100]],  [0, 1, 1, 1, 0]);
});

test("Test no Solution Cases", function() {
  assert_equal( [15, [2, 6, 10, 16]], false);
  assert_equal( [17, [3, 9, 12, 19]], false);
});

test("Test Special Cases", function() {
  assert_equal( [12, [1, 5, 7, 9]],  [0, 1, 1, 0]);
  assert_equal( [14, [2, 6, 9]],  [1, 2, 0]);
});

test("Invalid Input", function() {
  assert_equal( [-1, [1, 5, 10, 25, 100]], false);
  assert_equal( [1, [-1, 5, 10, 25, 100]], false);
  assert_equal( [1, [0, 5, 10, 25, 100]], false);
});