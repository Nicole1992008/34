const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit;
var fruit_con;
var fruit_con_2;


var bg_img;
var food;
var goatImg;

var button,button2;
var goat;




function preload(){

  bg_img = loadImage('bg.jpg');
  food = loadImage('apple.png');
  goatImg = loadImage('goat.png');
  
  
}

function setup() {
  createCanvas(600,700);

  engine = Engine.create();
  world = engine.world;

  button = createImg('cut_btn.png');
  button.position(100,90);
  button.size(50,50);
  button.mouseClicked(drop);

  button2 = createImg('cut_btn.png');
   button2.position(450,90);
   button2.size(50,50);
   button2.mouseClicked(drop2);

   rope = new Rope(7,{x:120,y:90});
   rope2 = new Rope(7,{x:490,y:90});

   goat = rect(300,300,50,50);
  goat.scale = 0.2;
  

  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con_2 = new Link(rope2,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}



function draw() 
{
  background(51);
  image(bg_img,0,0,width,height);
  Engine.update(engine);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();

  drop();
  drop2();

  Engine.update(engine);
  drawSprites();

  if(collide(fruit,goat,80)==true)
  {
    World.remove(engine.world,fruit);
    fruit = null;
  }

  if(fruit!=null && fruit.position.y>=650)
  {
  fruit=null;
   }
  

}

function drop()
{
  rope.break();
  fruit_con.dettach();
  fruit_con = null; 
}

function drop2()
{
  rope2.break();
  fruit_con_2.dettach();
  fruit_con_2 = null;
}

function collide(body,sprite,x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}