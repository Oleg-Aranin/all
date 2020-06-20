<template>
  <div class="container">
    <div>
      <canvas ref="canvas"></canvas>
    </div>

    <div class="inputs">
      <label>
        rotate
        <input type="range" min="0" max="320" v-model.number="angleValue">
      </label>

      <label>
        color
        <input type="range" min="0" max="300" v-model.number="colorValue">
      </label>
    </div>
  </div>
</template>


<script>
    export default {
        computed: {
            angle() {
                return this.angleValue / 100
            },
            color() {
                return this.colorValue / 100
            }
        },
        beforeUpdate() {
            this.draw()
            this.createVertices()
        },
        data() {
            return {
                gl: null,
                shaderProgram: null,
                vertices: null,
                angleValue: 0,
                colorValue: 0,
            }
        },
        mounted() {
            const canvas = this.$refs.canvas
            this.gl = canvas.getContext('webgl')
            this.gl.viewport(0, 0, canvas.width, canvas.height)
            this.gl.clearColor(1, 1, 1, 1)

            this.createShaders()
            this.createVertices()
            this.draw()
        },
        methods: {
            createShaders() {
                let vs = `
                 attribute vec4 coords;
                attribute float pointSize;
                uniform mat4 transformMatrix;
                void main(void) {
                gl_Position = transformMatrix * coords;
                gl_PointSize = pointSize;
                }
                `

                let vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER)
                this.gl.shaderSource(vertexShader, vs)
                this.gl.compileShader(vertexShader)

                let fs = `
                 precision mediump float;
                uniform vec4 color;
                void main(void) {
                gl_FragColor = color;
                }
                `

                let fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER)
                this.gl.shaderSource(fragmentShader, fs)
                this.gl.compileShader(fragmentShader)

                this.shaderProgram = this.gl.createProgram()
                this.gl.attachShader(this.shaderProgram, vertexShader)
                this.gl.attachShader(this.shaderProgram, fragmentShader)
                this.gl.linkProgram(this.shaderProgram)
                this.gl.useProgram(this.shaderProgram)
            },
            createVertices() {
                this.vertices = [
                    -0.9, -0.9, 0.0,
                    0.9, -0.9, 0.0,
                    0.0, 0.9, 0.0
                ]

                let buffer = this.gl.createBuffer()
                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer)
                this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.vertices), this.gl.STATIC_DRAW)


                let coords = this.gl.getAttribLocation(this.shaderProgram, 'coords')
                this.gl.vertexAttribPointer(coords, 3, this.gl.FLOAT, false, 0, 0)
                this.gl.enableVertexAttribArray(coords)
                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null)

                let pointSize = this.gl.getAttribLocation(this.shaderProgram, 'pointSize')
                this.gl.vertexAttrib1f(pointSize, 20)

                let color = this.gl.getUniformLocation(this.shaderProgram, 'color')
                this.gl.uniform4f(color, this.color, this.color - 1, this.color - 2, 1)

            },
            draw() {
                this.rotateY(this.angle)
                this.gl.clear(this.gl.COLOR_BUFFER_BIT)
                this.gl.drawArrays(this.gl.TRIANGLES, 0, 3)
            },
            rotateY(angle) {
                let cos = Math.cos(angle)
                let sin = Math.sin(angle)
                let matrix = new Float32Array(
                    [cos, 0, sin, 0,
                        0, 1, 0, 0,
                        -sin, 0, cos, 0,
                        0, 0, 0, 1]
                )
                let transformMatrix = this.gl.getUniformLocation(this.shaderProgram, 'transformMatrix')
                this.gl.uniformMatrix4fv(transformMatrix, false, matrix)
            }
        }
    }
</script>


<style scoped>
  .container {
    display: flex;
    justify-content: space-around;
    margin-top: 70px;
  }

  .inputs {
    display: flex;
    flex-direction: column;
  }

  canvas {
    width: 400px;
    height: 400px;
  }

  input {
    display: block;
    margin-top: 10px;
  }

  label {
    margin-bottom: 25px;
    text-align: center;
  }
</style>
