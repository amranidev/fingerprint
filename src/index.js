import sha256 from "./sha256";

let fingerprint = function webgl() {
    let canvas, ctx, width = 256, height = 128;
    canvas = document.body.appendChild(document.createElement("canvas"));
    canvas.style.display = 'none';
    canvas.width = width,
        canvas.height = height,
        ctx = canvas.getContext("webgl2") || canvas.getContext("experimental-webgl2") || canvas.getContext("webgl") || canvas.getContext("experimental-webgl") || canvas.getContext("moz-webgl");

    try {
        let f = "attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}";
        let g = "precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}";
        let h = ctx.createBuffer();

        ctx.bindBuffer(ctx.ARRAY_BUFFER, h);

        let i = new Float32Array([-.2, -.9, 0, .4, -.26, 0, 0, .7321, 0]);

        ctx.bufferData(ctx.ARRAY_BUFFER, i, ctx.STATIC_DRAW), h.itemSize = 3, h.numItems = 3;

        let j = ctx.createProgram();
        let k = ctx.createShader(ctx.VERTEX_SHADER);

        ctx.shaderSource(k, f);
        ctx.compileShader(k);

        let l = ctx.createShader(ctx.FRAGMENT_SHADER);

        ctx.shaderSource(l, g);
        ctx.compileShader(l);
        ctx.attachShader(j, k);
        ctx.attachShader(j, l);
        ctx.linkProgram(j);
        ctx.useProgram(j);

        j.vertexPosAttrib = ctx.getAttribLocation(j, "attrVertex");
        j.offsetUniform = ctx.getUniformLocation(j, "uniformOffset");

        ctx.enableVertexAttribArray(j.vertexPosArray);
        ctx.vertexAttribPointer(j.vertexPosAttrib, h.itemSize, ctx.FLOAT, !1, 0, 0);
        ctx.uniform2f(j.offsetUniform, 1, 1);
        ctx.drawArrays(ctx.TRIANGLE_STRIP, 0, h.numItems);

    } catch (e) {
    }

    let n = new Uint8Array(width * height * 4);
    ctx.readPixels(0, 0, width, height, ctx.RGBA, ctx.UNSIGNED_BYTE, n);
    let m = JSON.stringify(n).replace(/,?"[0-9]+":/g, "");
    window.fingerprint = sha256(m)
    canvas.remove();
}

fingerprint()
