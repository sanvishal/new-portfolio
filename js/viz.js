let PI = Math.PI, t=0, startTime=Date.now(); var beta = 0, gamma = 0;

const sin = (a) => Math.sin(a);
const cos = (a) => Math.cos(a);
const sqrt = (a) => Math.sqrt(a);
const hypot = (a,b) => Math.sqrt(a*b + b*b);
window.isMobile = function() {
	var check = false;
	(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
	return check;
};

let Mouse = {
	x: window.innerWidth/2,
	y: window.innerHeight/2,
	events: {
		move: function(e) {
			Mouse.x = (Mouse.x + e.pageX) * 0.5;
			Mouse.y = (Mouse.y + e.pageY) * 0.5;
		}
	}
};

window.addEventListener('mousemove', Mouse.events.move, false);
let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

canvas.resizeHandler = function() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	canvas.min = Math.min(canvas.width,canvas.height);
	canvas.max = Math.max(canvas.width,canvas.height);
	canvas.hyp = hypot(canvas.width,canvas.height);
};

canvas.resizeHandler();
window.addEventListener('resize', canvas.resizeHandler, false);

function Point(x, y, size, row, col) {
	this.x = x;
	this.xPI = x / canvas.width * PI - PI/2;
	this.y = y;
	this.yPI = this.y / canvas.height * PI - PI/2;
	this.size = size;
	this.row = row;
	this.col = col;
	this.offset = {x: 0, y: 0};
	this.scale = {x: 1, y: 1};
	this.rotation = 0;
}

Point.prototype.draw = function(fn){
	ctx.save();
	ctx.translate(this.x + this.offset.x,this.y + this.offset.y);
	ctx.rotate(this.rotation);
	ctx.scale(this.scale.x, this.scale.y);
	fn();
	ctx.restore();
};

Point.prototype.distance = function(x, y) {
	let a = x - this.x, b = y - this.y;
	return Math.sqrt(a*a + b*b);
};

let grid = [];
grid.populate = function() {
	grid.coeff = canvas.hyp / 35;
	grid.length = 0;
	let row = 0, col = 0, height = grid.coeff*3, width = 0.75 * height, size = grid.coeff;
	height = height/1.34;
	for (let y = grid.coeff; y < canvas.height - grid.coeff; y += height) {
		col = 0;
		for (let x = grid.coeff; x < canvas.width - grid.coeff; x += width) {
			let p = new Point(x,y, size , row, col);
			if (row%2 === 0) {
				let p = new Point(x+width/2, y, size, row, col);
			}
			grid.push(p);
			col++
		}
		row++
	}
};


grid.populate();

window.addEventListener('resize', grid.populate);

function animloop() {
	animloop.id = requestAnimationFrame(animloop);
	t = (Date.now() - startTime)/2000;
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.fillStyle = "#fafafa";
	ctx.fillRect(0,0,canvas.width,canvas.height);
	for (let i = 0, p; p = grid[i] ; i++) {
		p.offset.x = cos(p.xPI*2+t)*sin(p.yPI*2+t)*p.size;
		p.offset.y = sin(p.yPI-t)*cos(p.xPI*2-t)*p.size;
		p.scale.x = sin(p.distance(Mouse.x,Mouse.y)  / canvas.hyp * PI  + PI/2) * 1.5;
		p.scale.y = sin(p.distance(Mouse.x,Mouse.y)  / canvas.hyp * PI  + PI/2) * 1.5;

		p.draw(function() {
			ctx.fillStyle = "#a3a3a333";
			ctx.beginPath();
			ctx.arc(0,0,5,0,2*PI,false);
			ctx.closePath();
			ctx.fill();
		});
	}
}

animloop();