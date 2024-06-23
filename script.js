

class GameView{
    construct(){
        let canvas = document.getElementById("canvas");
        this.ctx = canvas.getContext("2d");
        this.width = canvas.width;
        this.height = canvas.height;
        this.offsetTop = canvas.offsetTop;
    }

    draw(...entities){
        // Fill the canvas with black
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0,0,this.width,this.height);

        entities.forEach(entity => entity.draw(this.ctx));
    }

    drawScores(scores){
        this.ctx.fillStyle = "white";
        this.ctx.font = "30px monospace";
        this.ctx.textAlign = "left";
        this.ctx.fillText(scores.leftScore.toString(),50,50);
        this.ctx.textAlign = "right";
        this.ctx.fillText(scores.rightScore.toString(), this.width - 50,50);

    }

    drawGameOver(){
      this.ctx.fillStyle = "white";
      this.ctx.font = "30px monospace";
      this.ctx.textAlign = "center";
      this.ctx.fillText("GAME OVER", this.width / 2, this.height / 2);
    }
}