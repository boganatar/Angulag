interface Figure {
    perimeter():number;
    square():number;
}

class Circle implements Figure{

    static Rad: number = 0;

    constructor (r: number){
        Circle.Rad = r;
    }
    perimeter(){return 2*Math.PI*Circle.Rad;}
    square(){return Math.PI**Circle.Rad;}
}

class Square implements Figure{
    static Side: number = 0;

    constructor (s: number){
        Square.Side = s;
    }

    perimeter(){return Square.Side*4;}
    square(){return Square.Side**;}
}