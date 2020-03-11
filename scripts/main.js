var compound_transform;

// automatically called whenever any transform changes
function CalculateCompoundTransform(transforms) {
    // matrices in `transforms[i].mat4x4`
    // note `transform[0]` is first tranform to apply to vertex
    
    // if only one transform, set compound transform eequal to it
    if(transforms.length === 1) {
        compound_transform = transforms[0].mat4x4;
    }

    // otherwise multiply all matrices together (in proper order)
    // `compound_transform = Matrix.multiply(...)`
    else {
        var transform_matrices = [];
        for (let transform of transforms) {
            transform_matrices.unshift(transform.mat4x4);
        }
        compound_transform = Matrix.multiply(transform_matrices); // change / remove this
    }
    
    return compound_transform;
}

// automatically called whenever compound transform changes
function CalculateTransformedVertex(vertex) {
    // multiple vertex by compound_transform
    // `final_vertex = Matrix.multiply(...)`
    var final_vertex = new Vector(4); // change / remove this
    console.log(vertex, compound_transform)
    final_vertex = Matrix.multiply([compound_transform, vertex]);
    return final_vertex;
}

// automatically called whenever user modifies a transform (changes type or values)
function ChangeTransform(index, type, values) {
    app.transforms[index].type = type;
    // update `app.transforms[index].mat4x4`
    switch(type) {
        case "translate":
            Mat4x4Translate(app.transforms[index].mat4x4, values[0], values[1], values[2]);
            break;
        case "scale":
            Mat4x4Scale(app.transforms[index].mat4x4, values[0], values[1], values[2]);
            break;
        case "rotate_x":
            Mat4x4RotateX(app.transforms[index].mat4x4, values[0]);
            break;
        case "rotate_y":
            Mat4x4RotateY(app.transforms[index].mat4x4, values[0]);
            break;
        case "rotate_z":
            Mat4x4RotateZ(app.transforms[index].mat4x4, values[0]);
            break;
        case "shear":
            Mat4x4ShearXY(app.transforms[index].mat4x4, values[0], values[1]);
            break;
    }

    // recalculate compound transform and tranformed vertex
    app.compound = CalculateCompoundTransform(app.transforms);
    app.final_vertex = CalculateTransformedVertex(app.vertex);
}
