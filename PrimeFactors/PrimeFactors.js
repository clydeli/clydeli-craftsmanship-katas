var PrimeFactors = {
	generate : function(x){
		var results = [];
		for(var i=2; x>1;){
			if((x%i) == 0){
				results.push(i);
				x /= i;
			} else { ++i; }
		}
		return results;
	}
}