var KeyHandler = function() {
	var keyListeners = {};
	
	this.add = function(key, repeat, callback) {
		if(keyListeners[key] == undefined) {
			keyListeners[key] = [];
		}
		
		keyListeners[key].push({
			repeat: repeat,
			callback: callback,
			interval: null,
			ready: true
		});
	}
	
	var forEachKey = function(key, fn) {
		if(keyListeners[key] != undefined) {
			for(i in keyListeners[key]) {
				fn(keyListeners[key][i]);
			}
		} else {
			console.log('No key added to:', key, 'Ignoring...');
		}
	}
	
	document.addEventListener('keydown', function(e) {
		forEachKey(e.which, function(handler) {
			if(handler.ready) {
				handler.ready = false;
				
				if(handler.repeat) {
					if(handler.interval == null) {
						handler.interval = setInterval(handler.callback, 30);
					}
				} else {
					handler.callback();
				}
			}
		});
	});
	
	document.addEventListener('keyup', function(e) {
		forEachKey(e.which, function(handler) {
			handler.ready = true;
			
			if(handler.repeat) {
				if(handler.interval != null) {
					clearInterval(handler.interval);
					handler.interval = null;
				}
			}
		});
	});
}