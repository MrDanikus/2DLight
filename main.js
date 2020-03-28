let WinSize = {Width : 600,Height: 700};
let Obstacles = JSON.parse('[{"points":[{"x":0.3276250076293945,"y":0.3400073537826538},{"x":0.25762500762939455,"y":0.1940073537826538},{"x":0.17762500762939454,"y":0.2920073537826538}]},{"points":[{"x":0.8036250076293945,"y":0.04600735378265381},{"x":0.6336250076293946,"y":0.1320073537826538},{"x":0.5296250076293946,"y":0.1380073537826538},{"x":0.6676250076293946,"y":0.2560073537826538},{"x":0.6676250076293946,"y":0.2560073537826538}]},{"points":[{"x":0.8216250076293945,"y":0.4400073537826538},{"x":0.7496250076293945,"y":0.4140073537826538},{"x":0.6936250076293945,"y":0.5380073537826539},{"x":0.7816250076293946,"y":0.7260073537826538},{"x":0.9096250076293946,"y":0.4200073537826538},{"x":0.8216250076293945,"y":0.4400073537826538}]},{"points":[{"x":0.25762500762939455,"y":0.7320073537826538},{"x":0.13962500762939453,"y":0.7280073537826538},{"x":0.15562500762939452,"y":0.5000073537826538},{"x":0.2836250076293945,"y":0.45600735378265383},{"x":0.21562500762939454,"y":0.6200073537826538}]},{"points":[{"x":0.15562500762939452,"y":0.1480073537826538},{"x":0.12962500762939452,"y":0.07000735378265381},{"x":0.24362500762939454,"y":0.09800735378265381}]},{"points":[{"x":0.31362500762939455,"y":0.9100073537826538},{"x":0.4076250076293945,"y":0.8140073537826538},{"x":0.43362500762939454,"y":0.9340073537826538}]},{"points":[{"x":0.8456250076293945,"y":0.9220073537826539},{"x":0.6736250076293945,"y":0.8960073537826538},{"x":0.6196250076293945,"y":0.9120073537826539},{"x":0.5996250076293945,"y":0.7880073537826539},{"x":0.7156250076293945,"y":0.7900073537826539}]}]');





function Parse(){
    for(let i in Obstacles){
        let p = new Path();
        p.Points = Obstacles[i].points.map(a=>{
            a.x *= WinSize.Width;
            a.y *= WinSize.Height;
            return a;
        });
        Paths.push(p);
    }
}


//let BGImage;

function setup(){

    //Cursor = loadImage('./bulb.png');
    //WinSize = {Width : windowWidth,Height: windowHeight}
    createCanvas(WinSize.Width ,WinSize.Height);
    Parse();
    //BGImage = loadImage(`https://picsum.photos/${WinSize.Width}/${WinSize.Height}`);
}




let LightPath;

let LightPos;

function draw(){
    clear();
    //background(BGImage);
    background(0,0,0);


    for(let i in Paths){
        Paths[i].Draw();
    }


    let point = {x:Math.min(Math.max(mouseX,1),WinSize.Width-1),y: Math.min(Math.max(mouseY,1),WinSize.Height-1)};
    if(Paths.length > 0){

        //let pg = createGraphics(WinSize.Width,WinSize.Height);

        fill(255,255,255,64);
        stroke(255,255,255,64);
        strokeWeight(0.5);


        
        //pg.beginDraw();
        //let lst = null;
        for(let i = 0; i < 8; ++i){
            
            let p = {x:point.x + 10*Math.cos(0.25*Math.PI*i),y:point.y + 10*Math.sin(0.25*Math.PI*i)};
            LightPath = getLightPath(p,Paths,WinSize);
            beginShape();
            for(let i of LightPath){
                vertex(i.x,i.y);
            }
            endShape(CLOSE);

        }
        

        fill(255,255,255);
        //noStroke();

        
        for(let i = 0; i < 8; ++i){
            let p = {x:point.x + 10*Math.cos(0.25*Math.PI*i),y:point.y + 10*Math.sin(0.25*Math.PI*i)};
            circle(p.x,p.y,5);
        }


 
        

        // stroke(80,5,5);
        // for(let i of LightPath){
        //     line(point.x,point.y,i.x,i.y);
        // }
    }


    //image(Cursor,mouseX-10,mouseY-10,20,20);
}