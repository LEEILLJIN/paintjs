const canvas = document.getElementById("JsCanvas");
const ctx = canvas.getContext("2d");
//context는 canvas 안에서 픽셀을 다루는 걸 의미한다.
const colors = document.getElementsByClassName("jsColor");

/*canvas의 pixel manupulating size
기본적으로 canvas는 css로 만들고 js에서는 pixel을 다룰 수 있는 element로 만드는 거라서
width와 height를 지정해줘야한다.(보통 canvas와 같은 size로)
*/
//ctrl + z 기능? : You might have to save the coordinates on an array. And when ctrl + z you can paint them white again.

const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR ="#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle =INITIAL_COLOR;//우리가 그릴 선들이 모두 이 색을 갖는다고 말해준다.
ctx.lineWidth = 2.5;
ctx.fillStyle =INITIAL_COLOR;


let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    if(filling === false){//filling mode에서 클릭하고 드래그하면 잠시동안 paint되고, 마우스를 떼었을때 비로소 fill이 되는 현상 해결방법
      painting = true;
    }
}
function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    /*event의 요소 중 clientX,Y도 있지만 offsetX,Y를 사용하는 이유는 
    client는 스크린 전체에서의 X,Y값을 나타내며 offsetX,Y는 canvas안에서의 X,Y값을 나타내기 때문이다.
    */
   if(!painting){//canvas에서 클릭하기 전까지만 활동하는 메소드이다. 
       ctx.beginPath();//경로를 생성
       ctx.moveTo(x, y);//선 시작 좌표
   }else{//lineTo : Connects the last point in the curent sub-path to the specified (x, y) coordinate with a straight line.
        ctx.lineTo(x, y);//선 끝 좌표  
        ctx.stroke();//선 그리기
   }
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    const size= event.target.value;
    ctx.lineWidth =size;
}

function handleModeClick(event){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    }else{
        filling = true;
        mode.innerText = "Paint";
    }
}
function handelCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}
function handleCM(event){
    event.preventDefault();
}
function handelSaveClick(event){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;//href는 image = URL이 되어야하고
    link.download = "PaintJS✍";//download는 download될 파일의 이름?
    link.click();
    //위에서 만든 link자체가 click되면 image가 download되도록 한거니까
    //link를 click하도록 해서 다운로드하도록 하는 것 이다.
}
if(canvas){//canvas가 존재하는지 check
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);//마우스가 canvas 바깥으로 나갔을 때
    canvas.addEventListener("click",handelCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);//contextmenu는 canvas에서 우클릭하면 나오는 메뉴
}


Array.from(colors).forEach(color =>
     color.addEventListener("click", handleColorClick)
     );
     //color은 colors안의 각각의 div를 나타냄 여러 색을 배열로 저장한 Arrays.form(colors)안에는 색이 있는 div가 요소로 들어있다.

if(range){
    range.addEventListener("input", handleRangeChange)//왜 input으로 할까나?
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handelSaveClick)
}