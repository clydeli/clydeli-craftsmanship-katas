var Potter = Potter || {};

Potter.Definition = {
	unitPrice : 8,
	Discount : [1, 0.95, 0.9, 0.8, 0.75],
	getDiscount : function(setCount){
		if(setCount > 1 && setCount <= Potter.Definition.Discount.length){
			return (
				1-(setCount*Potter.Definition.Discount[setCount-1]-
				(setCount-1)*Potter.Definition.Discount[setCount-2])
			);
		} else { return 0; }
	},
	Set : function(vol){
		this.size = 0;
		this.vols = {};
		this.insertVol(vol);
	}
}
Potter.Definition.Set.prototype = {
	has : function(vol){ return this.vols.hasOwnProperty(vol); },
	insertVol : function(vol){ 
		this.size++;
		this.vols[vol] = true;
		this.nextDiscount = Potter.Definition.getDiscount(this.size+1);
	},
	price : function(){
		return Potter.Definition.unitPrice*this.size*Potter.Definition.Discount[this.size-1]; 
	}
}

Potter.Sets = [];
Potter.createSet = function(vol){ 
	Potter.Sets.push( new Potter.Definition.Set(vol));		
};

Potter.calculatePrice = function(array){
	if(array.length <= 0){ return 0; }

	var volCountHash = {};
	for(var i=0; i<array.length; ++i){ // O(n)
		if(volCountHash.hasOwnProperty(array[i])){ volCountHash[array[i]] += 1; }
		else { volCountHash[array[i]] = 1; }
	}

	for(var key in volCountHash){
		for(var i=0; i<volCountHash[key]; ++i){ // O(n)
			var maxDiscountSet = -1, maxDiscount = 0;
			// Search for the best (highest discount) set
			for(var j=0; j<Potter.Sets.length; ++j){
				if(!Potter.Sets[j].has(key) && Potter.Sets[j].nextDiscount > maxDiscount){
					maxDiscountSet = Potter.Sets[j];
					maxDiscount = Potter.Sets[j].nextDiscount;
				}
			}
			// If no set fit for the current volume, create new set for all the rest
			if(maxDiscountSet === -1){
				for(;i<volCountHash[key];++i){ Potter.createSet(key); }
			}
			// else push it into the best set found
			else { maxDiscountSet.insertVol(key); }
		}
	}

	var totalPrice = 0;
	for(var i=0; i<Potter.Sets.length; ++i){
		totalPrice += Potter.Sets[i].price();
	}
	return totalPrice;
};