new Vue({
	el: '#home',
	data: {
		current_sample: 0,
		samples: [
			"pink",
			"olive",
			"salmon",
			"cornflowerblue",
			"orange"
		]
	},
	created: function(){
		this.startSampleCycle();
	},
	methods: {
		startSampleCycle: function(){
			setInterval( () =>{
				if( this.current_sample < 4 ){
					this.current_sample++;
				} else {
					this.current_sample = 0;
				}
			}, 4000 );
		}
	}
});