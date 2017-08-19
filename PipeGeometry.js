/*
creates a 3d pipe this.geometry
*/

function PipeGeometry(radius, segments, height) {
    this.geometry = new THREE.Geometry();

    //vertices
    this.geometry.vertices.push(new THREE.Vector3(0, 0, 0));

    tau = Math.PI * 2;
    delta = tau / segments;

    for (i = 0 ; i < segments ; ++i) {
        x = radius * Math.cos(i * delta);
        z = radius * Math.sin(i * delta);
        y = 0;

        this.geometry.vertices.push(new THREE.Vector3(x, y, z));
    }

    for (i = 0 ; i < segments ; ++i) {
        x = this.geometry.vertices[i + 1].x;
        z = this.geometry.vertices[i + 1].z;
        y = height;

        this.geometry.vertices.push(new THREE.Vector3(x, y, z));
    }

    this.geometry.vertices.push(new THREE.Vector3(0, height, 0));

    //faces
    //top and bottom
    this.geometry.faces.push(new THREE.Face3(0, segments, 1));

    for (i = 1 ; i < segments ; ++i) {
        this.geometry.faces.push(new THREE.Face3(0, i, i+1));
    }

    start = segments + 1;
    last = segments * 2 + 1;

    this.geometry.faces.push(new THREE.Face3(start, last-1, last));

    for (i = start ; i < last - 1 ; ++i) {
        this.geometry.faces.push(new THREE.Face3(i+1, i, last));
    }

    //sides
    this.geometry.faces.push(new THREE.Face3(last - 1, 1, segments));
    for (i = 1 ; i < segments ; ++i) {
        this.geometry.faces.push(new THREE.Face3(segments + i, i+1, i));
        this.geometry.faces.push(new THREE.Face3(i + 1, segments + i, segments + i + 1));
    }

    this.geometry.faces.push(new THREE.Face3(last - 1, start, 1));
    for (i = start ; i < last - 1 ; ++i) {
    }

    this.geometry.computeBoundingSphere();
    this.geometry.computeFaceNormals();
}
