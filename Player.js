class Player
{
    constructor(sprite, x, y)
    {
        this.sprite = loadImage("assets/"+sprite+".png");
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, g);
        this.right = 0;
        this.left = 0;
        this.direction = 1;
        this.attack = 5;
        this.defense = 5;
        this.specialAttack = 5;
        this.specialDefense = 5;
        this.speed = 5;
    }

    draw()
    {
        push();
        translate(this.pos.x, this.pos.y)
        scale(this.direction, 1)
        image(this.sprite, 0, 0, 128, 128);
        pop();
    }

    update()
    {
        this.vel.x = (this.right - this.left) * this.speed;
        this.vel.add(this.acc);
        this.pos.add(this.vel);
    }

    WalkLeft(value=1)
    {
        this.left = value
        if(value !== 1)
            {
                this.direction = -1;
            }
    }

    WalkRight(value=1)
    {
        this.right = value
        if(value !== 1)
            {
                this.direction = 1;
            }
    }

}

class WhiteCharacter extends Player
{
    constructor(sprite, x, y)
    {
        super();
        this.sprite = loadImage("assets/"+sprite+".png");
        this.pos = createVector(x, y);
        this.attack = 5;
        this.defense = 5;
        this.specialAttack = 5;
        this.specialDefense = 5;
        this.speed = 5;

        this.Combo = 0;
        this.CombatDebounce = false
        this.ComboCooldown = 1;
    }

    async Combat()
    {
        if(this.CombatDebounce == true) return
        this.CombatDebounce = true;
        this.Combo++;

        if(this.Combo > 5)
            {
                this.Combo = 1
            }

        console.log(this.Combo);
        
        await wait(this.ComboCooldown)
        this.CombatDebounce = false
    }

}