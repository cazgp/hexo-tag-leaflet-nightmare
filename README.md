# Hexo-tag-leaflet-nightmare

Use nightmare (phantomjs) to generate static leaflet images from a hexo tag.

# Requires

- phantomjs

# Usage

```
{% leafletstatic "Caption of the map" %}
scripts:
  - proj4
  - /home/user/Documents/proj4leaflet.js
  - //cdn.jsdelivr.net/leaflet.esri/1.0.0/esri-leaflet.js
styles:
file: customleaflet.js
wait: 2000
{% endleafletstatic %}
```

`Scripts` is a list of javascript files to include. `leaflet.js` and `leaflet.css` are bundled with this repo and automatically included. The value of a script can be absolute, relative, or a url. If relative, it looks for a folder in `sources` as pointed to by the value `static_dir` in `_config.yml`. By default, this is `static`. Otherwise, the scripts are loaded as is.

`file` is the js file to execute in the context of a leaflet page. This is taken to be in the `asset_folder` directory, i.e. `_posts/Post-Title/customleaflet.js`. It's relative, so if you want to reference a file elsewhere, dot notation should work.

`wait` is how long to make nightmare wait before taking a screenshot. This is set to 2000 by default, but if your network is faster or slower, then it makes sense to change this value.

The image will be placed in a path relative to the `asset_folder`.

# Caveats

Due to the way file watching works, the image generation will cause a new render to start happening. There is a check to prevent it from entering into an infinite regress, but "Reloading browser" will appear twice.

# To do

Currently the image html is hard-coded in `img.js`. In the future, changing that to be any file to allow flexible image html output would be useful. It's set to match pandoc output currently.
