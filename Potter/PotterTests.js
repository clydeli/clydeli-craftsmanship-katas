// Define the testing pattern
function assert_equal(expected, then) {
  Potter.Sets = [];
  deepEqual(Potter.calculatePrice(then), expected);
}

test("Test Basics", function() {
  assert_equal(0, []);
  assert_equal(8, [0]);
  assert_equal(8, [1]);
  assert_equal(8, [2]);
  assert_equal(8, [3]);
  assert_equal(8, [4]);
  assert_equal(8 * 2, [0, 0]);
  assert_equal(8 * 3, [1, 1, 1]);
});

test("Test Simple Discounts", function() {
  assert_equal(8 * 2 * 0.95, [0, 1]);
  assert_equal(8 * 3 * 0.9, [0, 2, 4]);
  assert_equal(8 * 4 * 0.8, [0, 1, 2, 4]);
  assert_equal(8 * 5 * 0.75, [0, 1, 2, 3, 4]);
});

test("Test Several Discounts", function() {
  assert_equal(8 + (8 * 2 * 0.95), [0, 0, 1]);
  assert_equal(2 * (8 * 2 * 0.95), [0, 0, 1, 1]);
  assert_equal((8 * 4 * 0.8) + (8 * 2 * 0.95), [0, 0, 1, 2, 2, 3]);
  assert_equal(8 + (8 * 5 * 0.75), [0, 1, 1, 2, 3, 4]);
});

test("Test Edge Cases", function() {
  assert_equal(2 * (8 * 4 * 0.8), [0, 0, 1, 1, 2, 2, 3, 4]);
  assert_equal(
    3 * (8 * 5 * 0.75) + 2 * (8 * 4 * 0.8), 
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4]);
});

test("Unordered input", function() {
  assert_equal((8 * 4 * 0.8) + (8 * 2 * 0.95), [3, 1, 2, 0, 0, 2]);
  assert_equal( 2 *(8 * 4 * 0.8), [0, 4, 1, 2, 3, 2, 1, 0]);
});