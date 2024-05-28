class Player
{
    constructor(x, y)
    {
        this.sprites = {
            idle: loadImage("assets/")
        }

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

        this.jumpPower = -20;

        this.isBlockingRight = false;
        this.isBlockingLeft = false;
        this.onGround = false;
        this.isJumping = false;

        this.state = "idle";
    }

    draw()
    {
        push();
        translate(this.pos.x, this.pos.y)
        scale(this.direction, 1)
        imageMode(CENTER);
        textAlign(CENTER);
        textSize(25);
        image(this.sprites[this.state], 0, 0, 128, 128);
        scale(this.direction, 1)
        text(this.state, 0, -68);
        pop();
    }

    update()
    {
        if(!this.isBlocking || !this.isBlockingLeft)
            {
                this.vel.x = (this.right - this.left) * this.speed;
            }

        if(!this.onGround)
        {
            this.vel.add(this.acc);
        }
        else
        {
            this.vel.y = 0;
        }
        this.pos.add(this.vel);
        this.pos.x = constrain(this.pos.x, 64, width-64);

        this.stateHandler();

        this.reachedGround();
    }

    stateHandler()
    {
        if(this.vel.y > 0)
        {
            this.isJumping = false;
        }
    
        if(!this.isJumping && !this.onGround)
        {
            this.state = "fall";
        }
        else if(this.isJumping && !this.onGround)
        {
            this.state = "jump";
        }
        else
        {
            if(this.right - this.left == 0)
            {
                this.state = "idle";
            }
            else
            {
                this.state = "run";
            }
        }
    }

    reachedGround(groundLevel = height - 64) {
        if (this.pos.y >= groundLevel) {
            this.pos.y = groundLevel;
            this.onGround = true;
            this.vel.y = 0;
        } else {
            this.onGround = false;
        }
    }

    WalkLeft(value=1)
    {
        if(this.isBlockingLeft)
        {
            value = 0;
        }

        this.left = value
        if(value !== 0)
        {
            this.direction = -1;
        }
    }

    WalkRight(value=1)
    {
        if(this.isBlockingRight)
        {
            value = 0;
        }

        this.right = value
        if(value !== 0)
        {
            this.direction = 1;
        }
    }

    Jump()
    {
        console.log("fired")
        if(this.onGround)
            {
                console.log("jumped")
                this.isJumping = true;
                this.vel.y = this.jumpPower;
                this.onGround = false;
            }
    }

}

class WhiteCharacter extends Player
{
    constructor(sprite, x, y)
    {
        super();
        this.sprites = {
            idle: loadImage("assets/Yuji_idle.gif"),
            run: loadImage("assets/Yuji_Run_1.gif"),
            jump: loadImage("assets/chibi gojo.png"),
            fall: loadImage("assets/huh3.png"),
        }
        this.pos = createVector(x, y);
        this.attack = 5;
        this.defense = 5;
        this.specialAttack = 5;
        this.specialDefense = 5;
        this.speed = 5;

        this.Combo = 0;
        this.CombatDebounce = false
        this.ComboCooldown = 1;

        this.state = "idle";

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