// Define the testing pattern
function assert_execution(rover ,then, expected) {
  deepEqual(rover.execute(then), expected);
}

test("Test example cases", function() {
  var mars = new MarsRover.Mars();
  var rover1 = new MarsRover.Rover(mars);
  assert_execution( rover1, "ffrff",  [2, 2]);
});

test("Test other simple cases", function() {
  var mars = new MarsRover.Mars();
  var rover1 = new MarsRover.Rover(mars);
  var rover2 = new MarsRover.Rover(mars);
  assert_execution( rover1, "rffflffflf", [2, 3]);
  assert_execution( rover2, "frffflffblbbrbff", [5, 3]);
  assert_execution( rover1, "brfff", [3, 6]);
});

test("Test wrapping of edges", function() {
  var mars = new MarsRover.Mars();
  var rover1 = new MarsRover.Rover(mars);
  assert_execution( rover1, "b", [0, 99]);
  assert_execution( rover1, "lf", [99, 99]);
  assert_execution( rover1, "lb", [99, 0]);
  assert_execution( rover1, "rrrf", [0, 0]);
});

test("Test colission with obstacles", function() {
  var mars = new MarsRover.Mars();
  mars.setObstacle([2, 2]);
  var rover1 = new MarsRover.Rover(mars);
  assert_execution( rover1, "ffrff", "Collision detected at 2,2, rover stopped at 1,2");
  assert_execution( rover1, "r", [1, 2]);
});

test("Test colission with other rovers", function() {
  var mars = new MarsRover.Mars();
  var rover1 = new MarsRover.Rover(mars);
  rover1.execute("ffrff");
  var rover2 = new MarsRover.Rover(mars);
  assert_execution( rover2, "ffrff", "Collision detected at 2,2, rover stopped at 1,2");
  assert_execution( rover2, "r", [1, 2]);
});
