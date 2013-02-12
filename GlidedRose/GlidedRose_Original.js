// Translated from Item.java 
var Item = function(name, sellIn, quality){
	this.setName(name || "");
	this.setSellIn(sellIn || 0);
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

	GlidedRose.updateQuality = function(){
		for (var i=0; i<items.length; i++){
            
            if (items[i].getName() != "Aged Brie" && items[i].getName() != "Backstage passes to a TAFKAL80ETC concert") {
                if (items[i].getQuality() > 0) {
                    if (items[i].getName() != "Sulfuras, Hand of Ragnaros") {
                        items[i].setQuality(items[i].getQuality() - 1);
                    }
                }
            } else {
                if (items[i].getQuality() < 50) {
                    items[i].setQuality(items[i].getQuality() + 1);
                    if (items[i].getName() == "Backstage passes to a TAFKAL80ETC concert") {
                        if (items[i].getSellIn() < 11) {
                            if (items[i].getQuality() < 50) {
                                items[i].setQuality(items[i].getQuality() + 1);
                            }
                        }

                        if (items[i].getSellIn() < 6) {
                            if (items[i].getQuality() < 50) {
                                items[i].setQuality(items[i].getQuality() + 1);
                            }
                        }
                    }
                }
            }

            if (items[i].getName() != "Sulfuras, Hand of Ragnaros") {
                items[i].setSellIn(items[i].getSellIn() - 1);
            }

            if (items[i].getSellIn() < 0) {
                if (items[i].getName() != "Aged Brie") {
                    if (items[i].getName() != "Backstage passes to a TAFKAL80ETC concert") {
                        if (items[i].getQuality() > 0) {
                            if (items[i].getName() != "Sulfuras, Hand of Ragnaros") {
                                items[i].setQuality(items[i].getQuality() - 1);
                            }
                        }
                    } else {
                        items[i].setQuality(items[i].getQuality() - items[i].getQuality());
                    }
                } else {
                    if (items[i].getQuality() < 50) {
                        items[i].setQuality(items[i].getQuality() + 1);
                    }
                }
            }
        }
	}

	GlidedRose.updateQuality();
    console.log(items);

})();