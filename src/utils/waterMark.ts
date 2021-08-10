/*
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-08-10 21:51:13
 * @LastEditors: mjqin
 * @LastEditTime: 2021-08-10 22:41:02
 */
export function drawWaterMark(
    text = "水印",
    deg = 30,
    fontSize = 18,
    callback: Function,
    dom = "body",
    _config = {
        fontWeight: "bold", // 加粗
        fontFamily: "黑体", // 字体
        fillStyle: "rgba(0,0,0,0.1)", // 背景色
        canvasWidth: 500, // canvas 宽
        canvasHeight: 500, // canvas 高
        textPostionX: 80, // 文字位置 x轴
        textPostionY: 20, // 文字位置 y轴
        zIndex: 999, // 层叠等级
        showDouble: true, // 是否增加水印密度
    }
) {
    const config = {
        fontWeight: _config.fontWeight || "bold", // 加粗
        fontFamily: _config.fontFamily || "黑体", // 字体
        fillStyle: _config.fillStyle || "rgba(0,0,0,0.1)", // 背景色
        canvasWidth: _config.canvasWidth || 500, // canvas 宽
        canvasHeight: _config.canvasHeight || 500, // canvas 高
        textPostionX: _config.textPostionX || 80, // 文字位置 x轴
        textPostionY: _config.textPostionY || 20, // 文字位置 y轴
        zIndex: _config.zIndex || 999, // 层叠等级
        showDouble: _config.showDouble || false, // 是否增加水印密度
    }

    let body
    if (dom) {
        body = document.querySelector(dom) as any
    } else {
        body = document.querySelector("body") as any
    }

    const waterMarkDiv = document.createElement("div") as any // 渲染水印的 div
    waterMarkDiv.style.width = `${window.innerWidth}px`
    waterMarkDiv.style.height = `${window.innerHeight}px`
    waterMarkDiv.style.position = "absolute"
    waterMarkDiv.style.top = 0
    waterMarkDiv.style.left = 0
    waterMarkDiv.style.zIndex = 999
    waterMarkDiv.style.pointerEvents = "none"

    const canvas = document.createElement("canvas")
    canvas.width = config.canvasWidth
    canvas.height = config.canvasHeight
    canvas.style.display = "none"

    body.append(canvas)

    const ctx = canvas.getContext("2d") as any

    ctx.clearRect(0, 0, config.canvasWidth, config.canvasHeight)
    ctx.font = `${fontSize}px ${config.fontWeight} ${config.fontFamily}` // '24px bold 黑体'
    ctx.fillStyle = config.fillStyle // 'rgba(0,0,0,0.1)'
    ctx.rotate((deg * Math.PI) / 360)
    ctx.fillText(text, config.textPostionX, config.textPostionY)
    if (config.showDouble) {
        ctx.fillText(
            text,
            config.textPostionX + config.canvasWidth / 2,
            config.textPostionY + 100
        )
    }
    // 回调
    if (callback) {
        callback()
    }
    waterMarkDiv.style.backgroundImage = `url(${canvas.toDataURL(
        "image/png"
    )})`
    body.append(waterMarkDiv) // append 可以接收 DOM元素 或 DOMString字段   appendChild 只能接受 DOM元素
}