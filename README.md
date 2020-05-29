# turtle
AltaML coding exercise

## Getting Started

Running either the docker based build or the local build will make the application available at http://localhost:8080

### Docker (Recommended)

#### Remote Build Context
```shell
$> docker build -t kevinloney https://github.com/easyas314159/turtle.git
$> docker run -p 8080:80 kevinloney
```

#### Local Build Context
```shell
$> git clone https://github.com/easyas314159/turtle.git
$> docker build -t kevinloney turtle
$> docker run -p 8080:80 kevinloney
```

### Locally
```shell
$> git clone https://github.com/easyas314159/turtle.git
$> cd turtle
$> npm install
$> npm build-prod
$> python[3] -m http.server 8080 --directory build
```

### Testing
```shell
$> npm run coverage
```

## Usage Notes & Assumptions

### Front-end

To get started click the file upload button in the top right and select a directions file to use. I chose to go with a naive validation approach which accepts any file (including binary), applies an uppercase transform, and then removes any characters matching `/[^FLR]+/g`.

Once a file has been loaded you can control which layers are visible from the settings menu (the cog icon in the top right). You can also use the toolbar in the top right to explore the output using the zoom and pan tools.

If this were being actively developed I would spend a lot more time on the general user experience, and the accessibility features of the various tools bars.

### Back-end

When running locally you can use python3's `http.server` module to host the output static files from the build (See: Getting Started > Locally). However, I chose to go with building the docker image to serve static files using nginx instead of python as the python based docker image was ~80M or 4x times larger than the nginx image.

### Intersection Algorithm

This is probably the section that has the largest margin for general improvement. Based on the responses to some of the questions about what to prioritize I chose to go with a naive O(n^2) will not scale particularly well beyond ~10k line segments. Here are some of the most immediate improvements I would make to the line intersection algorithm:

* Move generation of the output SVG to the backend to more effectively take advantage of caching. That way if two users upload equivalent movement instructions existing content can be served. e.g. `'FLRF'` and `'FRLF'` are equivalent and should only be generated once.
* Switch to using a more efficient overlap/intersection detection algorithm.
  * A line sweep would be good choice if there is no issue with storing all of the generated lines in memory.
  * A more advanced geospatial index that supports paging to disk would be a good choice for instruction sets that are large enough that having more than one loaded into memory at a time could be prohibitive.
* The existing overlap/intersection algorithm can generate duplicate intersections and overlaps so adding an optimization step that joins overlapping colinear line segments and remove duplicate intersection points would help reduce the size of the output SVG.
* Switch to using a streaming approach for parsing, optimizing, and generating the movement path to prevent loading and storing multiple copies of the uploaded file in memory.
