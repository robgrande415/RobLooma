/*
 * Functions that are common in all lessons
 *
 */

var flag_start = 0,i,j,flag;

//enable or disable the control buttons
function controlButtonDisplay(button,status){
	var opacity;
	if(status === 'enabled'){
		opacity = 1;
		cursor = 'pointer';
	}else{
		opacity = .3;
		cursor = 'default';
	}
	var buttonCss = {
			'opacity':opacity,
			'cursor':cursor
	};
	$('#'+button).css(buttonCss);
}

// TBD: remove these functions when all lessons are converted.

//generate a random numbers between two limits
function genRand( lower, upper ){
    alert('Don\'t use genRand, use Karma.random instead.');
	  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

/*
	Function to generate a set of random numbers and assign it to a variable supplied
	@params: randVar - > The variable in which the random numbers to be stored
			 lower -> lower number
			 upper -> upper number
	include lower and upper limit
	Currently it generates numbers betweem 0-upper (exclude upper)
*/
function shuffleNumbers(randVar,lower,upper)  {
    alert('Don\'t use shuffleNumbers, use Karma.shuffle(range(lower, upper + 1)))');
	var total_nums = upper-lower;
	randVar[0] = genRand(0,total_nums-1);
	for(i= 1; i < total_nums; i++){
			do{
				flag = 0;
				randVar[i] = genRand(0,total_nums-1);
				for(j=0; j<i; j++){
					if(randVar[i] === randVar[j]){
						flag++;
					}
				}
			}while(flag != 0 );  //end of do while loop
		}
}


