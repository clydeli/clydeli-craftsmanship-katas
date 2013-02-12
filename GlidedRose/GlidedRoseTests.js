// Define the testing pattern
function test_update_quality_function(then, expected, update_times) {
	GlidedRose.setItems(then);
	for(var i=0; i<update_times; ++i){
		GlidedRose.updateQuality();
	}
	deepEqual(GlidedRose.getItems(), expected);
}

test("Test if it at least works as the original code", function() {
	test_update_quality_function(
		[ new Item("+5 Dexterity Vest", 10, 20),
		  new Item("Aged Brie", 2, 0),
		  new Item("Elixir of the Mongoose", 5, 7),
		  new Item("Sulfuras, Hand of Ragnaros", 0, 80),
		  new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20)
		],
		[ new Item("+5 Dexterity Vest", 9, 19),
		  new Item("Aged Brie", 1, 1),
		  new Item("Elixir of the Mongoose", 4, 6),
		  new Item("Sulfuras, Hand of Ragnaros", 0, 80),
		  new Item("Backstage passes to a TAFKAL80ETC concert", 14, 21)
		],
		1
	);
});

test("Once the sell by date has passed, Quality degrades twice as fast", function() {
	test_update_quality_function(
		[ new Item("Elixir of the Mongoose", 0, 7) ],
		[ new Item("Elixir of the Mongoose", -3, 1) ],
		3
	);
});

test("The Quality of an item is never negative", function() {
	test_update_quality_function(
		[ new Item("Elixir of the Mongoose", 5, 2) ],
		[ new Item("Elixir of the Mongoose", 2, 0) ],
		3
	);
	test_update_quality_function(
		[ new Item("Elixir of the Mongoose", 0, 7) ],
		[ new Item("Elixir of the Mongoose", -5, 0) ],
		5
	);
});

test("'Aged Brie' actually increases in Quality the older it gets", function() {
	test_update_quality_function(
		[ new Item("Aged Brie", 2, 0) ],
		[ new Item("Aged Brie", 1, 1) ],
		1
	);
	test_update_quality_function(
		[ new Item("Aged Brie", 2, 0) ],
		[ new Item("Aged Brie", -1, 3) ],
		3
	);
});

test("The Quality of an item is never more than 50", function() {
	test_update_quality_function(
		[ new Item("Aged Brie", 10, 48) ],
		[ new Item("Aged Brie", 5, 50) ],
		5
	);
});

test("'Sulfuras', being a legendary item, never has to be sold or decreases in Quality", function() {
	test_update_quality_function(
		[ new Item("Sulfuras, Hand of Ragnaros", 0, 80) ],
		[ new Item("Sulfuras, Hand of Ragnaros", 0, 80) ],
		3
	);
});

test("'Backstage passes', like aged brie, increases in Quality as it’s SellIn value approaches; Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but Quality drops to 0 after the concert", function() {
	test_update_quality_function(
		[ new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20) ],
		[ new Item("Backstage passes to a TAFKAL80ETC concert", 14, 21) ],
		1
	);
	test_update_quality_function(
		[ new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20),
		  new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20),
		  new Item("Backstage passes to a TAFKAL80ETC concert", 1, 20)
		],
		[ new Item("Backstage passes to a TAFKAL80ETC concert", 7, 26),
		  new Item("Backstage passes to a TAFKAL80ETC concert", 2, 29),
		  new Item("Backstage passes to a TAFKAL80ETC concert", -2, 0)
		],
		3
	);
});

test("'Conjured' items degrade in Quality twice as fast as normal items", function() {
	test_update_quality_function(
		[ new Item("Conjured Mana Cake", 3, 6), new Item("Conjured Mana Cake", 0, 6) ],
		[ new Item("Conjured Mana Cake", 2, 4), new Item("Conjured Mana Cake", -1, 2) ],
		1
	);
});


test("Regexp for Sulfuras, Backstage passes, and Conjured", function() {
	test_update_quality_function(
		[ new Item("Sulfuras, Foot of Ragnaros", 0, 80) ],
		[ new Item("Sulfuras, Foot of Ragnaros", 0, 80) ],
		3
	);

	test_update_quality_function(
		[ new Item("Backstage passes to a Shinsei Kamattechan concert", 1, 20) ],
		[ new Item("Backstage passes to a Shinsei Kamattechan concert", -2, 0) ],
		3
	);
	test_update_quality_function(
		[ new Item("Conjured Mana Waffle", 0, 6) ],
		[ new Item("Conjured Mana Waffle", -1, 2) ],
		1
	);
});