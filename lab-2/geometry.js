const volumeOfRectanglePrism = function (length, height, width) {
    if (typeof length == "number" && length > 0 ) {
        if (typeof height == "number" && height > 0) {
            if (typeof width == "number" && width > 0) {
                var area = length * height * width;
                return area;
            } else {
                return ("argument is not correct");
            }
        } else {
            return ("argument is not correct");
        }
    } else {
        return ("argument is not correct");
    }
}


const surfaceAreaOfRectanglePrism = function (length, height, width) {
  
    if ((typeof length == "number" && length > 0) && (typeof height == "number" && height > 0) && (typeof width == "number" && width > 0)  ) {
      
        
        return (2*((width * length) + (width * height) + (height * length)))
    } else {
        return ("argument is not correct");
    }



}

const volumeOfSphere = function (radius) {
    if (typeof radius == "number" && radius > 0) {
        return ( 4 * Math.PI * ( radius * radius * rai))
    } else {
        return ("argument is not correct");
    }

}

const surfaceAreaOfSphere = function (radius) {

    if (typeof radius == "number" && radius > 0) {
        var area = 4 * Math.PI * Math.pow(radius, 2);
        return area
    } else {
        return ("argument is not correct");
    }
}


module.exports = {
    volumeOfRectanglePrism,
    surfaceAreaOfRectanglePrism,
    volumeOfSphere,
    surfaceAreaOfSphere
}