/*
represents a mitered pipe segment
*/

/*
  Cut angle in degrees, distance measurements in inches
*/
function PipeSeg(radius, segments, cutDist, cutAngle) {
    //fields
    this.radius = radius;
    this.segments = segments;
    this.cutDist = cutDist;
    this.cutAngle = cutAngle;

    this.geom = new THREE.Geometry();

    this.endPoint = new THREE.Vector3(0, 0, 0);
    this.endNormal = new THREE.Vector3(0, 0, 0);

    this.mat = new THREE.MeshLambertMaterial( {color: 0x00ff00});
    this.mesh = new THREE.Mesh(this.geom, this.mat);


    //methods
    this.attachTo = function(seg) {
        this.mesh.position.copy(seg.getEndPoint());
        this.mesh.rotation.copy(seg.getEndRotation());
    };

    this.getEndPoint = function() {
        return (new THREE.Vector3).addVectors(this.endPoint, this.mesh.position);
    };

    this. getEndRotation = function() {
        var retVal = new THREE.Euler(0);
        retVal.copy(this.mesh.rotation);
        retVal.z -= this.cutAngle * 2;
        return retVal;
    };

    this.getEndNormal = function () {
        return (new THREE.Vector3).copy(this.endNormal).applyEuler(this.mesh.rotation);
    };

    this.addToScene = function(scene) {
        scene.add(this.mesh);
    };


    //TODO this don't work brah
    this.rotate = function(axis, rads) {
        var rotObjectMatrix = new THREE.Matrix4();
        rotObjectMatrix.makeRotationAxis(axis.normalize(), rads);

        //this.mesh.matrix.multiply(rotObjectMatrix);
        rotObjectMatrix.multiply(this.mesh.matrix);
        this.mesh.matrix = rotObjectMatrix;


        this.mesh.rotation.setFromRotationMatrix(this.mesh.matrix);
    };



    //geometry related
    this.calculateVertices = function() {
        tau = Math.PI * 2;
        delta = tau / segments;

        //bottom
        for (i = 1 ; i < segments + 1 ; ++i) {
            this.geom.vertices[i].x = this.radius * Math.cos(delta * i);
            this.geom.vertices[i].y = 0;
            this.geom.vertices[i].z = this.radius * Math.sin(delta * i);;
        }

        start = segments + 1;
        end = 2 * segments;

        //seam
        for (i = start ; i < end + 1 ; ++i) {
            x = this.geom.vertices[i - segments].x;
            z = this.geom.vertices[i - segments].z;

            height = (this.radius - x) * Math.tan(this.cutAngle);
            y = this.cutDist + height;

            this.geom.vertices[i].x = x;
            this.geom.vertices[i].y = y;
            this.geom.vertices[i].z = z;
        }

        start = 2 * segments + 1;
        end = 3 * segments;

        //top
        for (i = start ; i < end + 1 ; ++i) {
            x = this.geom.vertices[i - segments].x;
            y = this.geom.vertices[i - segments].y;
            z = this.geom.vertices[i - segments].z;

            x += y * Math.cos(Math.PI / 2 - 2 * this.cutAngle);
            y += y * Math.sin(Math.PI / 2 - 2 * this.cutAngle);

            this.geom.vertices[i].x = x;
            this.geom.vertices[i].y = y;
            this.geom.vertices[i].z = z;
       }

        //top center
        lastX = 0;
        lastY = this.cutDist + this.radius * Math.tan(this.cutAngle);

        lastX += lastY * Math.cos(Math.PI / 2 - 2 * this.cutAngle);
        lastY += lastY * Math.sin(Math.PI / 2 - 2 * this.cutAngle);

        this.geom.vertices[3 * segments + 1].x = lastX;
        this.geom.vertices[3 * segments + 1].y = lastY;

        this.endPoint.x = lastX;
        this.endPoint.y = lastY;
    };


    //init geometry
    //add vertices
    for (i = 0 ; i < 3 * segments + 2 ; ++i) {
        this.geom.vertices.push(new THREE.Vector3(0, 0, 0));
    }
    this.calculateVertices();

    //create faces
    //bottom circle
    center = 0;
    start = 1;
    end = segments;

    this.geom.faces.push(new THREE.Face3(start, center, end));
    for (i = start ; i < end ; ++i) {
        this.geom.faces.push(new THREE.Face3(i+1, center, i));
    }

    //top circle
    center = 3 * segments + 1;
    start = 2 * segments + 1;
    end = 3 * segments;

    this.geom.faces.push(new THREE.Face3(end, center, start));

    //get face index
    var faceIndex = this.geom.faces.length - 1;

    for (i = start ; i < end ; ++i) {
        this.geom.faces.push(new THREE.Face3(i, center, i+1));
    }

    //first half of walls
    start = 1;
    end = segments;

    this.geom.faces.push(new THREE.Face3(end, end + 1, start));
    for (i = start ; i < end ; ++i) {
        this.geom.faces.push(new THREE.Face3(i, i + segments + 1, i + 1));
    }

    start = segments + 1;
    end = 2 * segments;

    this.geom.faces.push(new THREE.Face3(start, end - segments, end));
    for (i = start ; i < end ; ++i) {
        this.geom.faces.push(new THREE.Face3(i+1, i - segments , i));
    }

    //second half of walls
    start = segments + 1;
    end = 2 * segments;

    this.geom.faces.push(new THREE.Face3(end, end + 1, start));
    for (i = start ; i < end ; ++i) {
        this.geom.faces.push(new THREE.Face3(i, i + segments + 1, i + 1));
    }

    start = 2 * segments + 1;
    end = 3 * segments;

    this.geom.faces.push(new THREE.Face3(start, end - segments, end));
    for (i = start ; i < end ; ++i) {
        this.geom.faces.push(new THREE.Face3(i+1, i - segments , i));
    }

    this.geom.computeBoundingSphere();
    this.geom.computeFaceNormals();

    //get end normal
    var face = this.geom.faces[faceIndex];
    this.endNormal.copy(face.normal);

}
