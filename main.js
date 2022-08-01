window.onload = function () {
    var width = window.innerWidth;
    var height = window.innerHeight;

    var stage = new Konva.Stage({
        container: 'container',
        width: width,
        height: height,
    });

    var layer = new Konva.Layer();
    var group1 = new Konva.Group({x: 50, y: 150, name: 'g1', draggable: true,});
    var group2 = new Konva.Group({x: 200, y: 50, name: 'g2', draggable: true,});

    // делаем болванку
    var box = new Konva.Rect({
        width: 50,
        height: 50,
        fill: 'white',
        stroke: 'black',
        strokeWidth: 1,
    });
    // с болванки делаем клонов с нужными параметрами
    var box1 = box.clone({name: 'box1'});
    var box2 = box.clone({name: 'box2', offsetX: -50});

    var connector = new Konva.Circle({
        name: 'cleft',
        offsetX: 0,
        offsetY: -25,
        radius: 5,
        fill: 'black',
        stroke: 'black',
    });
    var leftConnector = connector.clone({name: 'cleft'});
    var leftConnector2 = connector.clone({name: 'cleft', offsetX: -50});
    var rightConnector = connector.clone({name: 'cright', offsetX: -50});
    var rightConnector2 = connector.clone({name: 'cright', offsetX: -100});

    //todo переписать логику
    var box1box2Mid = {}
    if (group1.position().x < group2.position().x) {
        box1box2Mid.x = ((group2.position().x - group1.position().x) / 2) + group1.position().x+75;
    } else {
        box1box2Mid.x = ((group1.position().x - group2.position().x) / 2) + group1.position().x+75;
    }
    if (group1.position().y > group1.position().y) {
        box1box2Mid.y = ((group2.position().y - group1.position().y) / 2) + group1.position().y;
    } else {
        box1box2Mid.y = ((group1.position().y - group2.position().y) / 2) + group1.position().y;
    }

    var line = new Konva.Line({
        stroke: 'blue',
        strokeWidth: 1,
    });
    var points = [
        group1.position().x+50, group1.position().y+25,
        box1box2Mid.x, box1box2Mid.y,
        box1box2Mid.x+20, box1box2Mid.y,
        group2.position().x+50, group2.position().y+25
    ];
    var line1 = line.clone({name: 'line1', points});

    group1.add(box1, leftConnector, rightConnector);
    group2.add(box2, leftConnector2, rightConnector2);

    // group1.on('mouseover', function () {document.body.style.cursor = 'pointer';});
    // group1.on('mouseout', function () {document.body.style.cursor = 'default';});

    group1.on('dragmove', function () {
        // var mousePos = stage.getPointerPosition();
        line1.points([group1.position().x+50, group1.position().y+25, box1box2Mid.x, box1box2Mid.y, box1box2Mid.x+20, box1box2Mid.y, group2.position().x+50, group2.position().y+25]);
    });
    group2.on('dragmove', function () {
        line1.points([group1.position().x+50, group1.position().y+25, box1box2Mid.x, box1box2Mid.y, box1box2Mid.x+20, box1box2Mid.y, group2.position().x+50, group2.position().y+25]);
    });

    layer.add(group1, group2, line1);
    stage.add(layer);
}