//Exemple with geometry:
//https://code.earthengine.google.com/?scriptPath=users%2Flucassantarosa%2FSBSR%3ASoilGrids%20on%20Google%20Earth%20Engine%20(GEE)

//Other layers can be found here:
//https://git.wur.nl/isric/soilgrids/soilgrids.notebooks/-/blob/master/markdown/access_on_gee.md

//More information:
//https://www.soilgrids.org/


//load soil layers 
var clay = ee.Image("projects/soilgrids-isric/clay_mean"); //The profiles is available from 0 to 200 cm
var sand = ee.Image("projects/soilgrids-isric/sand_mean");
var silt = ee.Image("projects/soilgrids-isric/silt_mean");

var clay_clip = clay.clip(geometry)
var sand_clip = sand.clip(geometry)
var silt_clip = silt.clip(geometry)

print(clay_clip)
print(sand_clip)
print(silt_clip)

//set visualization parameters (change the band)
var imageVisParam = {"opacity":1,"bands":["clay_0-5cm_mean"],"min":10,"max":800,"palette":["ffef29","0000ff"]};

//add layer to the map
Map.addLayer(clay_clip, imageVisParam)
Map.centerObject(geometry, 5)

//download layers
Export.image.toDrive({
  image: clay_clip,
  description: 'clay', 
  fileNamePrefix: 'clay',
  scale: 250,
  folder: 'Soil_SP',
  region: geometry,
  maxPixels: 1e13
});

Export.image.toDrive({
  image: sand_clip,
  description: 'sand', 
  fileNamePrefix: 'sand',
  scale: 250,
  folder: 'Soil_SP',
  region: geometry,
  maxPixels: 1e13
});

Export.image.toDrive({
  image: silt_clip,
  description: 'silt', 
  fileNamePrefix: 'silt',
  scale: 250,
  folder: 'Soil_SP',
  region: geometry,
  maxPixels: 1e13
});
