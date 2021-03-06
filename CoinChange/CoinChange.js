var CoinChange = CoinChange || {};

CoinChange = {

	calculate : function(amount, coinValueArray){
		// Check invalid input
		if(amount < 0 || coinValueArray.length === 0) return false;
		for(var i=0; i<coinValueArray.length; ++i){ if(coinValueArray[i] <= 0){ return false; } }

		this.coinValueArray = coinValueArray;
		this.minCoinCount = Infinity;
		this.minCoinCountArray = false;
		this.patternHash = {};

		var coinCountArray = coinValueArray.map(function(){ return 0;});
		this.addCoin(amount, coinCountArray, 0);
		
		return this.minCoinCountArray;
	},

	addCoin : function(amount, coinCountArray, coinCount){
		// filter by constraints
		if( 
			this.patternHash.hasOwnProperty(JSON.stringify(coinCountArray) )
			|| coinCount + amount/this.coinValueArray[this.coinValueArray.length-1] > this.minCoinCount
			|| amount < 0
		) { return false; }
			
		// if not yet an answer 
		if(amount !== 0) {
			this.patternHash[JSON.stringify(coinCountArray)] = true;
			for(var i=this.coinValueArray.length-1; i>=0; --i){
				++coinCountArray[i];
				this.addCoin(
					amount-this.coinValueArray[i],
					coinCountArray,
					coinCount+1
				);
				--coinCountArray[i];
			}
		} else {
			this.minCoinCount = coinCount;
			this.minCoinCountArray = coinCountArray.slice();
		}
	}

};