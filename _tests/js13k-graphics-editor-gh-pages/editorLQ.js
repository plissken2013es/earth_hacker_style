t = c.getContext("2d");
u = d.getContext("2d");
last_x = 0;
last_y = 0;
started = 0;
o.value = "";
LIMIT = 20;
ZOOM = 1;

d.onclick = function(e) {
    x = (~~(e.pageX - c.getBoundingClientRect().left - document.documentElement.scrollLeft - document.body.scrollLeft)) & 0b1111111111111100;
    y = (~~(e.pageY - c.getBoundingClientRect().top - document.documentElement.scrollTop - document.body.scrollTop)) & 0b1111111111111100;
    
    if (!started) {
        started = 1;
        last_x = x;
        last_y = y;
        o.value += "{x:"+x+",y:"+y+",path:`.";
    } else if ((last_x != x || last_y != y) && Math.abs(last_x - x) <= LIMIT && Math.abs(last_y - y) <= LIMIT) {
        t.beginPath();
        t.moveTo(last_x, last_y);
        t.lineTo(x,y);
        t.stroke();
        o.value += String.fromCharCode(6 + 11 * ((x-last_x)/4+5) + (((y-last_y)/4)+5)).replace(/(\\|`)/g,"\\$1");
        last_x = x;
        last_y = y;
    }
}

window.onmousemove = function(e){
    if(started){
        d.width |= 0;
        x = (~~(e.pageX - c.getBoundingClientRect().left - document.documentElement.scrollLeft - document.body.scrollLeft)) & 0b1111111111111100;
        y = (~~(e.pageY - c.getBoundingClientRect().top - document.documentElement.scrollTop - document.body.scrollTop)) & 0b1111111111111100;
        if (Math.abs(x - last_x) > LIMIT || Math.abs(y - last_y) > LIMIT){
            c.style.background="red";
        } else {
            c.style.background = "";
        }
        u.beginPath();
        u.moveTo(last_x, last_y);
        u.lineTo(x,y);
        u.stroke();
    }
}

window.onkeyup = function(e) {
    if (started && !e.ctrlKey) {
        d.width |=0;
        started = 0;
        o.value+="`}\n";
        c.style.background = "";
    }
}

window.onload = function() {
    w = bg.naturalWidth*ZOOM;
    h = bg.naturalHeight*ZOOM;
    b.width = c.width = d.width = w;
    b.height = c.height = d.height = h;
}