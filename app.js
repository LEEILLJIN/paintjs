const canvas = document.getElementById("JsCanvas");
const ctx = canvas.getContext("2d");
//context는 canvas 안에서 픽셀을 다루는 걸 의미한다.
const colors = document.getElementsByClassName("jsColor");

/*canvas의 pixel manupulating size
기본적으로 canvas는 css로 만들고 js에서는 pixel을 다룰 수 있는 element로 만드는 거라서
width와 height를 지정해줘야한다.(보통 canvas와 같은 size로)
*/
canvas.width = 700;
canvas.height = 700;


ctx.strokeStyle ="#2c2c2c";//우리가 그릴 선들이 모두 이 색을 갖는다고 말해준다.
ctx.lineWidth = 2.5;


let painting = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
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
}

if(canvas){//canvas가 존재하는지 check
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);//마우스가 canvas 바깥으로 나갔을 때
}


Array.from(colors).forEach(color =>
     color.addEventListener("click", handleColorClick)
     );
     //color은 colors안의 각각의 div를 나타냄 여러 색을 배열로 저장한 Arrays.form(colors)안에는 색이 있는 div가 요소로 들어있다.