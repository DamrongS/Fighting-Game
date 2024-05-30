class Cloud
{
    constructor(x, y, type=0)
    {
        this.clouds = [];
        //this.sprite = clouds[type];
        this.pos = createVector(x, y);
    }

    draw()
    {
        push()
        translate(this.pos.x, this.pos.y)
        ellipse(0, 0, 20, 10);
        pop()
    }

    update()
    {
        this.pos.x -= 0.5;
        angleMode(DEGREES);
        this.pos.y = this.pos.y + sin(this.pos.x);
    }

}