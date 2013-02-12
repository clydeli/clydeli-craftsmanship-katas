test("Prime Factors Test", function() {
	// Define the testing pattern
	function generate_prime_factors(then, expected) {
		deepEqual(PrimeFactors.generate(then), expected);
	}

	// Test case examples from kata description
	generate_prime_factors(1, []);
	generate_prime_factors(30, [2, 3, 5]);

	// Test boundary cases
	generate_prime_factors(0, []);
	generate_prime_factors(-1, []);

	// Test some prime numbers
	generate_prime_factors(5, [5]);
	generate_prime_factors(17, [17]);

	// Test some numbers with duplicate prime factors
	generate_prime_factors(8, [2, 2, 2]);
	generate_prime_factors(18, [2, 3, 3]);
	generate_prime_factors(84, [2, 2, 3, 7]);
});