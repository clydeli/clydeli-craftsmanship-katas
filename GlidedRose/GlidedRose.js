// Translated from Item.java 
var Item = function(name, sellIn, quality){
	this.setName( name || "");
	this.setSellIn( sellIn || 0);
	this.setQuality( quality || 0);
};

Item.prototype = {
    getName : function(){ return this.name; },
    setName : function(name){ this.name = name; },
    getSellIn : function(){ return this.sellIn; },
    setSellIn : function(sellIn){ this.sellIn = sellIn; },
    getQuality : function(){ return this.quality; },
    setQuality : function(quality){ this.quality = quality; }
};

// Translated from GlidedRose.java
var GlidedRose = GlidedRose || {};
(function(){
	var items = [];
	items.push(new Item("+5 Dexterity Vest", 10, 20));
	items.push(new Item("Aged Brie", 2, 0));
	items.push(new Item("Elixir of the Mongoose", 5, 7));
	items.push(new Item("Sulfuras, Hand of Ragnaros", 0, 80));
	items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20));
	items.push(new Item("Conjured Mana Cake", 3, 6));

	// Added items getter/setter for testing
	GlidedRose.getItems = function(){ return items; }
	GlidedRose.setItems = function(newItems){ items = newItems; }

	GlidedRose.updateQuality = function(){
		for(var i=0; i<items.length; ++i){

			// If Sulfuras ... skip this turn
			if( /^Sulfuras/.test(items[i].getName())){ continue; }

			// Set default quality offset
			var quality_offset = -1;

			// Some special items handling
			if( items[i].getName() == "Aged Brie"){ quality_offset = 1; }
			else if( /^Conjured/.test(items[i].getName())){ quality_offset *= 2; }
			else if( /^Backstage passes/.test(items[i].getName())){
				quality_offset = 1;
				if( items[i].getSellIn() < 0){ quality_offset *= -items[i].getQuality(); }
				else if( items[i].getSellIn() <= 5){ quality_offset = 3; }
				else if( items[i].getSellIn() <= 10){ quality_offset = 2; }
			}

			// Globally, the quality degrades twice as fast when SellIn <= 0
			if( items[i].getSellIn()<=0 && quality_offset<0){ quality_offset *= 2; }

			// Limit quality range
			var final_quality = items[i].getQuality() + quality_offset;
			if(final_quality > 50){ final_quality = 50; }
			else if( final_quality < 0){ final_quality = 0; }
			
			// Update attributes 
			items[i].setQuality( final_quality );
			items[i].setSellIn( items[i].getSellIn()-1 );
			
		}
	}

	GlidedRose.updateQuality();

})();