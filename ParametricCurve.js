function ParametricCurve(startX, startY, startZ) {
    this.start = new THREE.Vector3(startX, startY, startZ);
    this.end = this.start.clone();
    this.geometry = new THREE.Geometry();

    this.appendCurve = function(paraX, paraY, paraZ, begin, end, division) {
        var delta = (end - begin) / division;

        for (i = 0 ; i < division ; i++) {
            x = paraX(i * delta) + this.end.x;
            y = paraY(i * delta) + this.end.y;
            z = paraZ(i * delta) + this.end.z;

            this.geometry.vertices.push(new THREE.Vector3(x, y, z));
        }

        //update end point and add it to the geometry
        this.end.x = paraX(end) + this.end.x;
        this.end.y = paraY(end) + this.end.y;
        this.end.z = paraZ(end) + this.end.z;
        console.log(this.end);
        this.geometry.vertices.push(this.end.clone());
    };

}
