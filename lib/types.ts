import { Color, Gradient } from "./color.ts";

export interface Rect {
    x: number
    y: number
    width: number
    height: number
    type: "fill" | "stroke"
    color: Color
}

export interface Circle {
    x: number
    y: number
    radius: number
    type: "fill" | "stroke",
    color: Color
}

export interface Triangle {
    x1: number
    y1: number
    x2: number
    y2: number
    x3: number
    y3: number
    type: "fill" | "stroke"
    color: Color
}

export interface Line {
    x1: number
    y1: number
    x2: number
    y2: number
    color: Color
}

export interface Text {
    x: number
    y: number
    size: number
    text: string
    font: string
    color: Color
}

export interface RectOptions {
    x?: number
    y?: number
    width?: number
    height?: number
    type?: "fill" | "stroke"
    color?: Color
}

export interface CircleOptions {
    x?: number
    y?: number
    radius?: number
    type?: "fill" | "stroke",
    color?: Color
}

export interface TriangleOptions {
    x1?: number
    y1?: number
    x2?: number
    y2?: number
    x3?: number
    y3?: number
    type?: "fill" | "stroke"
    color?: Color
}

export interface LineOptions {
    x1?: number
    y1?: number
    x2?: number
    y2?: number
    color?: Color
}

export interface TextOptions {
    x?: number
    y?: number
    size?: number
    text?: string
    font?: string
    color?: Color
}

export interface RectReturn extends Rect {
    draw(options?: RectOptions): this
    setX(x: number): this
    setY(y: number): this
    setXAndY(x: number, y: number): this
    setWidth(width: number): this
    setHeight(height: number): this
    setType(type: "fill" | "stroke"): this
    setRGB(red: number, green: number, blue: number): this
    setRGBA(red: number, green: number, blue: number, alpha: number): this
    setGradient(gradient: Gradient): this
    setColor(color: Color): this
}

export interface CircleReturn extends Circle {
    draw(options?: CircleOptions): this
    setX(x: number): this
    setY(y: number): this
    setXAndY(x: number, y: number): this
    setRadius(radius: number): this
    setType(type: "fill" | "stroke"): this
    setRGB(red: number, green: number, blue: number): this
    setRGBA(red: number, green: number, blue: number, alpha: number): this
    setGradient(gradient: Gradient): this
    setColor(color: Color): this
}

export interface TriangleReturn extends Triangle {
    draw(options?: RectOptions): this
    setAngle1(x: number, y: number): this
    setAngle2(x: number, y: number): this
    setAngle3(x: number, y: number): this
    setType(type: "fill" | "stroke"): this
    setRGB(red: number, green: number, blue: number): this
    setRGBA(red: number, green: number, blue: number, alpha: number): this
    setGradient(gradient: Gradient): this
    setColor(color: Color): this
}

export interface LineReturn extends Line {
    draw(options?: RectOptions): this
    setMove(x: number, y: number): this
    setLine(x: number, y: number): this
    setRGB(red: number, green: number, blue: number): this
    setRGBA(red: number, green: number, blue: number, alpha: number): this
    setGradient(gradient: Gradient): this
    setColor(color: Color): this
}

export interface TextReturn extends Text {
    draw(options?: RectOptions): this
    setX(x: number): this
    setY(y: number): this
    setXAndY(x: number, y: number): this
    setSize(size: number): this
    setText(text: string): this
    setFont(path: string): this
    setRGB(red: number, green: number, blue: number): this
    setRGBA(red: number, green: number, blue: number, alpha: number): this
    setGradient(gradient: Gradient): this
    setColor(color: Color): this
}

export type ShapesData = RectReturn | CircleReturn;