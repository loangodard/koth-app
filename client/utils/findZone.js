exports.isInside=(point,vs) => {
    var x = point.latitude, y = point.longitude;
    
    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i].latitude, yi = vs[i].longitude;
        var xj = vs[j].latitude, yj = vs[j].longitude;
        
        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    
    return inside;
}