var renderer = null, 
    scene = null,
    camera = null,
    mesh = null;

$(document).ready(
    function() {
        var container = document.getElementById("container");
        
        var offX = 0, offY = 160;
        a.width += offX;
        a.height += offY;

        c = a.getContext("2d");
        c.fillStyle="#000";
        //c.fillRect(0, 0, a.width, a.height);
        c.strokeStyle="#A9F";

        var numLines = 24;
        for (k=numLines; k--;) {
            c.beginPath();
            var l = a.width/numLines*k;
            c.moveTo(l, 0);
            c.lineTo(l, a.height);
            c.stroke();
        }
        numLines = 12;
        for (k=numLines; k--;) {
            c.beginPath();
            l = a.height/numLines*k;
            c.moveTo(0, l);
            c.lineTo(a.width, l);
            c.stroke();
        }
        
        c.strokeStyle="#59F";
        for (q of world) {
            c.beginPath();
            x = q.x - 26 + offX/2;
            y = q.y - 130 + offY/2;
            c.moveTo(x, y);
            for (i of q.path) {
                z=i.charCodeAt()-6,c.lineTo(x+=(~~(z/11)-5),y+=(z%11-5));c.stroke()
            }
        }
        
        var app = new EarthApp();
        app.init({ container: container });
        setTimeout(app.run.bind(app), 1000/60); // 1 frame pause before launch (or before lunch)
    }
);