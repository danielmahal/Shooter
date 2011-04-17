var KeyHandler = function() {
	var keyListeners = {};
	
	this.add = function(key, repeat, callback) {
		if(keyListeners[key] == undefined) {
			keyListeners[key] = {
				keyDown: false,
				ready: true,
				handlers: []
			};
		}
		
		keyListeners[key].handlers.push({
			repeat: repeat,
			callback: callback
		});
	}
	
	var forEachKey = function(key, fn) {
		if(keyListeners[key] != undefined) {
			for(i in keyListeners[key].handlers) {
				fn(keyListeners[key]['handlers'][i]);
			}
		}
	}
	
	this.trigger = function() {
		for(i in keyListeners) {
			if(keyListeners[i].keyDown) {
				forEachKey(i, function(handler) {
					handler.callback();
				});
			}
		}
	}
	
	document.addEventListener('keydown', function(e) {
		console.log('Pressed:', e.which);
		var key = e.which;
		if(keyListeners[key] != undefined) {
			keyListeners[key].keyDown = true;
		}
	});
	
	document.addEventListener('keyup', function(e) {
		var key = e.which;
		if(keyListeners[key] != undefined) {
			keyListeners[key].keyDown = false;
		}
	});
}