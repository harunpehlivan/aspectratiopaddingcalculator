// Reduce a fraction by finding the Greatest Common Divisor and dividing by it.
function reduce(numerator,denominator){
  var gcd = function gcd(a,b){
    return b ? gcd(b, a%b) : a;
  };
  gcd = gcd(numerator,denominator);
  return [numerator/gcd, denominator/gcd];
}

var v = new Vue({
    'el' : '#app',
    'data' : {
        canvas: false,
        ctx: false,
        advanced : false,
        roundAmount : 5,
        sass: false,
        displayType: 'basic',
        inputType: 'typed',
        drawing: false,
        start: {
            x: 0,
            y: 0
        },
        size : {
            x : 16,
            y : 9,
        },
        v : {
            x : 0,
            y : 0,
        }
    },
    computed : {
        padding(){
            var percent = Math.abs( (this.size.y / this.size.x) * 100);
            percent = Math.round( percent * 100 ) / 100;
            return (percent) + '%';
        },
        cssClassName(){
            return 'aspect-' + this.size.x + '-' + this.size.y;
        }
    },
    methods : {
        reduce(){
            var out = reduce(this.size.x, this.size.y);
            this.size.x = out[0];
            this.size.y = out[1];
        },
        round(){
           this.size.x = Math.round(this.size.x / this.roundAmount) * this.roundAmount;
           this.size.y = Math.round(this.size.y / this.roundAmount) * this.roundAmount;
            this.reduce();
        },
        go169(){
            this.size.x = 16;
            this.size.y = 9;
        },
        go43(){
            this.size.x = 4;
            this.size.y = 3;
        },
        go21(){
            this.size.x = 2;
            this.size.y = 1;
        },
        goSquare(){
            this.size.x = 1;
            this.size.y = 1;
        },
        startDrawing(){
            this.inputType = 'drawn';
            this.$nextTick(function(){
                this.canvas = document.getElementById("canvas");
                this.ctx = this.canvas.getContext("2d");    
            });
        }
    },
    mounted(){
        this.canvas = document.getElementById("canvas");
        if(this.canvas){
            this.ctx = this.canvas.getContext("2d");
        }
        var vm = this;
            
        $("#canvas").mousedown(function(e){
            var offset = $(this).offset();
            vm.start.x = e.pageX - offset.left;
            vm.start.y = e.pageY - offset.top;
            vm.size.x = 0;
            vm.size.y = 0;
            console.log(vm.start);
            vm.drawing = true;
            $("#canvas").on('mousemove', function(e){
                vm.ctx.fillStyle = "#555555";
                vm.ctx.clearRect(0, 0, 1000, 1000);
                vm.size.x = e.pageX - offset.left - vm.start.x;
                vm.size.y = e.pageY - offset.top - vm.start.y;
                console.log(vm.start.x, vm.start.y, vm.size.x, vm.size.y);
                            vm.ctx.fillRect(vm.start.x,vm.start.y,vm.size.x,vm.size.y);
            });
        });

        $("#canvas").mouseup(function(e){
            $("#canvas").off('mousemove');
            vm.drawing = false;
            vm.ctx.clearRect(0, 0, 1000, 1000);
        });
    }
});