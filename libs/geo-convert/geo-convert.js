var fs = require('fs')

var geoConvert = function(name, file) {
	var input = file + name + '.geo';
	var output = file + 'compiled/' + name + '.js';
	
	var parseGeo = function(data) {
		var lines = data.match(/.+/gi);
		
		var parsed  = {
			vertices: [],
			faces: [],
			uvs: []
		}
		
		var vertexRegExp = /^[\d-]+/;
		var faceRegExp = /^\s\d\s\<+/;
		
		for(i in lines) {
			if(vertexRegExp.test(lines[i])) {
				var values = lines[i].match(/[^\s\(\)]+/gi);
				
				parsed.vertices.push([values[0], values[1], values[2]]);
				parsed.uvs.push([values[4], values[5]]);
			};
			
			if(faceRegExp.test(lines[i])) {
				var face = lines[i].match(/[\d]/gi);
				face.shift();
				parsed.faces.push(face);
			}
		}
		
		return parsed;
	}
	
	var generateJsOld = function(parsedData) {
		var vertices = parsedData.vertices;
		var faces = parsedData.faces;
		
		var js = [
			'var '+name+' = function () {',
			'var scope = this;',
			'THREE.Geometry.call( this );'
		];
		
		for(i in vertices) {
			js.push('v('+ vertices[i].join(',') +');');
		}
		
		for(i in faces) {
			js.push('f3('+ faces[i].join(',') +');');
		}
		
		js.push('this.computeCentroids();');
		js.push('this.computeFaceNormals();');
		js.push('function v( x, y, z, u, v ) {');
		js.push('scope.vertices.push( new THREE.Vertex( new THREE.Vector3( x, y, z ) ) );');
		js.push('scope.uvs.push( new THREE.UV( u, v ) );');
		js.push('}');
		js.push('function f3( a, b, c ) {');
		js.push('scope.faces.push( new THREE.Face3( a, b, c ) );');
		js.push('}');
		js.push('}');
		js.push(''+name+'.prototype = new THREE.Geometry();');
		js.push(''+name+'.prototype.constructor = '+name+';');
		
		return js.join('\n');
	}
	
	var generateJs = function(parsedData) {
		var vertices = parsedData.vertices;
		var faces = parsedData.faces;
		var uvs = parsedData.uvs;
		
		var model = {
			version: 1,
			scale: 1.000000,
			materials: [],
			morphTargets: [],
			normals: [],
			colors: [],
			vertices: [],
			uvs: [],
			faces: []
		};
		
		for(i in vertices) {
			for(j in vertices[i]) {
				model.vertices.push(vertices[i][j]);
			}
		}
		
		for(i in faces) {
			for(j in faces[i]) {
				model.faces.push(faces[i][j]);
			}
		}
		
		for(i in uvs) {
			model.uvs.push(uvs[i]);
		}
		
		var js = 'var model = ' + JSON.stringify(model) + '; postMessage( model ); close();';
		
		console.log(js);
		
		return js;
	}
	
	fs.readFile(input, 'utf-8', function(err, data) {
		fs.writeFile(output, generateJs(parseGeo(data)));
	});
}

geoConvert('CubeModel', '../../models/');