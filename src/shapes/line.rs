use image::{Rgba, RgbaImage, ImageBuffer};
use std::marker::PhantomData;
use raqote::{Source, SolidSource, GradientStop, Point, Gradient, Spread, PathBuilder, DrawTarget, LineCap, LineJoin, DrawOptions, StrokeStyle};
use super::super::{GradientSelect, Shape, Color};

pub fn draw_line_mut(img: &mut RgbaImage, shape: &Shape, width: u32, height: u32) {
    let (mut x1, mut y1, mut x2, mut y2) = (shape.data[0], shape.data[1], shape.data[2], shape.data[3]);

    if x1 > width as f32 {
        x1 = width as f32;
    }
    if x2 > width as f32 {
        x2 = width as f32;
    }
    if y1 > height as f32 {
        y1 = height as f32;
    }
    if y2 > height as f32 {
        y2 = height as f32;
    }

    let x: f32;
    let y: f32;
    if x1 > x2{
        x = x1;
    }
    else {
        x = x2;
    }
    if y1 > y2{
        y = y1;
    }
    else {
        y = y2;
    }
    let source: Source;
    match &shape.color {
        Color::RGBA { red, green, blue, alpha } => {
            source = Source::Solid(SolidSource{r: *blue, g: *green, b: *red, a: *alpha});
        }
        Color::Gradients { gradients } => {
            let mut stops:Vec<GradientStop> = Vec::new();
            for gradient in gradients.iter() {
                stops.push(GradientStop {position: gradient.position, color: raqote::Color::new(gradient.color[3], gradient.color[0], gradient.color[1], gradient.color[2])});
            }
            match &gradients[0].gradient_select {
                GradientSelect::Linear {start, end} => {
                    let start = Point { x: start.x, y: start.y, _unit: PhantomData };
                    let end = Point { x: end.x, y: end.y, _unit: PhantomData };
                    source = Source::new_linear_gradient(Gradient { stops }, start, end, Spread::Pad );
                }
                GradientSelect::Radial{center, radius} => {
                    let start = Point { x: center.x, y: center.y, _unit: PhantomData };
                    source = Source::new_radial_gradient(Gradient { stops }, start, *radius, Spread::Pad );
                }
            }
        }
    }
    let mut path_builder = PathBuilder::new();
    path_builder.move_to(x1, y1);
    path_builder.line_to(x2, y2);
    path_builder.close();
    let mut draw_target = DrawTarget::new(x as i32,y as i32);
    let style = StrokeStyle {
        width: 9.,
        cap: LineCap::Butt,
        join: LineJoin::Miter,
        miter_limit: 10.,
        dash_array: Vec::new(),
        dash_offset: 0.,
    };
    draw_target.stroke(&path_builder.finish(), &source, &style, &DrawOptions::new());
    let raw_image = draw_target.get_data_u8().to_vec();
    let buffer:RgbaImage = ImageBuffer::<Rgba<u8>, Vec<u8>>::from_raw(x as u32, y as u32, raw_image).unwrap();
    for (_x, _y, pixel,) in buffer.enumerate_pixels() {
        if pixel != &Rgba([0,0,0,0]) {
            img.put_pixel(_x, _y, pixel.to_owned());
        }
    }
}
