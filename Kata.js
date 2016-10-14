Kata
Solutions
Translations
Collections
Kumite
Social
Discourse
Completed (25)
Unfinished
Obsolete
4 kyu
Roman Numerals Decoder
JavaScript:

function solution(roman){
  // complete the solution by transforming the 
  // string roman numeral into an integer  
  //var romanMap = [{1000 => 'M'}, 
  //{900 => 'CM'}, 
  //{500 => 'D'}, 
  //{400 => 'CD'}, 
  //{100 => 'C'},
  //{90 => 'XC'}, 
  //{50 => 'L'}, 
  //{40 => 'XL'}, 
  //{10 => 'X'}, 
  //{9 => 'IX'}, 
  //{5 => 'V'}, 
  //{4 => 'IV'}, 
  //{1 => 'I'}];
  console.log(roman);
  return roman.split('').map(function(r,index,rArray){
    switch(r) {
      case 'M':
      if(rArray[index-1]=='C') return 900;
      return 1000;
      case 'C':
      if(rArray[index+1]=='D') return 0;
      if(rArray[index+1]=='M') return 0;
      if(rArray[index-1]=='X') return 90;
      return 100;
      case 'D':
      if(rArray[index-1]=='C') return 400;
      return 500;
      case 'L':
      if(rArray[index-1]=='X') return 40;
      return  50;
      case 'X':
      if(rArray[index+1]=='C') return 0;
      if(rArray[index+1]=='L') return 0;
      if(rArray[index-1]=='I') return 9;
      return 10;
      case 'V':
      if(rArray[index-1]=='I') return 4;
      return 5;
      case 'I':
      if(rArray[index+1]=='V') return 0;
      if(rArray[index+1]=='X') return 0;
      return 1;
    }
  }).reduce(function(i,j){return i+j;});
  
}
8 months agoRefactorDiscuss
5 kyu
Conway's Game of Life
JavaScript:

function nextGen(cells){
  // Uncomment next row to have an example
  // return cells;
  console.log(cells);
  return cells.map(function(row,rowIndex,rs){
    return row.map(function(c,columnIndex,cs){
      var aliveValue = 0;
      var top = rowIndex - 1;
      var bottom = rowIndex + 1;
      var left = columnIndex - 1;
      var right = columnIndex + 1;
      if(top >= 0) {
        aliveValue += cells[top][columnIndex];
        if(left >= 0) {
          aliveValue += cells[top][left];
          aliveValue += cells[rowIndex][left];
          if(bottom < rs.length) {
            aliveValue += cells[bottom][left];
          }
          
        } 
        if(right < cs.length) {
          aliveValue += cells[top][right];
          aliveValue += cells[rowIndex][right];
          if(bottom < rs.length) {
            aliveValue += cells[bottom][right];
          }
        }
        if(bottom < rs.length) aliveValue += cells[bottom][columnIndex];
      } else {
        if(bottom < rs.length) {
          aliveValue += cells[bottom][columnIndex];
          if(left >= 0) {
            aliveValue += cells[bottom][left];
            aliveValue += cells[rowIndex][left];
          }
          if(right < cs.length) {
            aliveValue += cells[bottom][right];
            aliveValue += cells[rowIndex][right];
          }
        }
      }
      
      
      
      
      if(c===1 && aliveValue < 2) return 0;
      if(c===1 && (aliveValue === 2 || aliveValue === 3)) return 1;
      if(c===1 && aliveValue > 3) return 0;
      
      if(c===0 && aliveValue === 3) return 1;
      return c;
      
    });
  });
}
8 months agoRefactorDiscuss
7 kyu
Sorting Dictionaries
JavaScript:

function sortDict(dict){
  var values = new Array();
  for(var key in dict)
  {
    if(isNaN(key)) values.push([key,dict[key]]);
    else values.push([Number(key),dict[key]]);
  }
  return values.sort(function(a,b){return b[1]-a[1]});
  
}
9 months agoRefactorDiscuss
5 kyu
Sierpinski's Gasket
JavaScript:

function sierpinski(n) {
// TODO: Program me
  if(n==0) return 'L';
  if(n==1) return [
    'L',
    'L L'
].join('\n');
  return sierpinski(n-1).concat('\n',sierpinski(n-1).split('\n').map(function(s,index,a){
    
    for(var i = 0; i<2*(a.length-index-1); i++) {
      s += ' ';
    }
    return s;
    //return (s + ' ' + s);
  }).map(function(w){return (w+' '+w).trim();}).join('\n'));
}
9 months agoRefactorDiscuss
5 kyu
Metric Units - 1
JavaScript:

function meters(x) {
  // todo: return value scaled to correct unit
  // e.g. 5000 becomes "5km", 1 becomes "1m"
  var r = 0;
   for(var i=8;i>=0;i--) {
     r = x/Math.pow(10,i*3);
     if(r>=1) break;
   }
   switch(i) {
     case 0:
     return r.toString()+'m';
     case 1:
     return r.toString()+'km';
     case 2:
     return r.toString()+'Mm';
     case 3:
     return r.toString()+'Gm';
     case 4:
     return r.toString()+'Tm';
     case 5:
     return r.toString()+'Pm';
     case 6:
     return r.toString()+'Em';
     case 7:
     return r.toString()+'Zm';
     case 8:
     return r.toString()+'Ym';
   }
}
9 months agoRefactorDiscuss
5 kyu
Count IP Addresses
JavaScript:

function ipsBetween(start, end){
   var startArray  = start.split('.');
   var endArray  = end.split('.');
   return (endArray.shift()-startArray.shift())*Math.pow(256,3)+
   (endArray.shift()-startArray.shift())*Math.pow(256,2)+
   (endArray.shift()-startArray.shift())*Math.pow(256,1)+
   (endArray.shift()-startArray.shift())*Math.pow(256,0);
}
9 months agoRefactorDiscuss
5 kyu
Guess The Gifts!
JavaScript:

function guessGifts(wishlist, presents) {
  return wishlist.filter(function(w){
    return presents.some(function(p){
      if(w.name == 'card game') {console.log(w.clatters+p.clatters);}
      if(w.size == p.size&&w.clatters==p.clatters&&w.weight==p.weight) return true;
      return false;
    });
  }).map(function(g){return g.name;});
}
9 months agoRefactorDiscuss
5 kyu
Concatenating functions
JavaScript:

// just a small amount of possible functions to start testing with.
var addOne = function(e) {return e + 1;};
var square = function(e) {return e * e;};

// Extend the Function prototype with a method pipe
Function.prototype.pipe = function(f) { 
  console.log(this);
  var origin = this;
   var p = function(e) {
     return f(origin.call(null,e));
   }
   return p;
 }
9 months agoRefactorDiscuss
5 kyu
Did I Finish my Sudoku?
JavaScript:

function doneOrNot(board) {
console.log(board);
	for (var i = 0; i < 9; i++) {
		//var rowSum = 0;
		//var columnSum = 0;
    var rowSet = new Set(board[i]);
    if(rowSet.size !==9) return 'Try again!';
    var columnSet = new Set([]);
    if(i%3==0){
    var region1Set = new Set([]);
    var region2Set = new Set([]);
    var region3Set = new Set([]);
    }
    
		for (var j = 0; j < 9; j++) {
			if (board[i][j] < 1 || board[i][j] > 9) return 'Try again!';
			//rowSum += board[i][j];
			//columnSum += board[j][i];
      columnSet.add(board[j][i]);
      if(j<3) region1Set.add(board[i][j]);
      if(j>2&&j<6) region2Set.add(board[i][j]);
      if(j>5) region3Set.add(board[i][j]);
      
		}
    if(i==2 && region1Set.size !==9) return 'Try again!';
    if(i==5 && region2Set.size !==9) return 'Try again!';
    if(i==8 && region3Set.size !==9) return 'Try again!';
    if(columnSet.size !==9) return 'Try again!';
		//if (rowSum != 45) return 'Try again!';
		//if (columnSum != 45) return 'Try again!';

	}
	return 'Finished!';
}
9 months agoRefactorDiscuss
6 kyu
Evil Autocorrect Prank
JavaScript:

function autocorrect(input){
  return input.replace(/\byou+\b/gi,'your sister').replace(/\bu\b/gi, 'your sister');
}
9 months agoRefactorDiscuss
6 kyu
WeIrD StRiNg CaSe
JavaScript:

function toWeirdCase(string){
  return string.split(' ').map(function(w){
    return w.split('').map(function(c,index){return index%2 == 0?c.toUpperCase():c;}).join('');
  }).join(' ');
}
9 months agoRefactorDiscuss
6 kyu
Stop gninnipS My sdroW!
JavaScript:

function spinWords(s){
    return s.split(' ').map(function(w){
        if(w.length >4) return w.split('').reverse().join('');
        return w;
    }).join(' ');
}
9 months agoRefactorDiscuss
6 kyu
Grouped by commas
JavaScript:

function groupByCommas(n) {
console.log(n.toString().split(''));
  var nArray = n.toString().split('');
  
  var r = '';
  for(var i = nArray.length;i > 0; i--){
    r += i%3==1&&i/3>1?nArray.shift()+',':nArray.shift();
  }
  return r;
}
9 months agoRefactorDiscuss
6 kyu
Sum of many ints
JavaScript:

function f(n, m) {
  //var arr = new Array();
  //for(var i = 0; i<=n; i++) {
    //arr.push(i);
  //}
  //return arr.reduce(function(x,y){return x + y%m;});
  var v = n%m;
  return m*(m-1)/2*Math.floor(n/m)+(1+v)*v/2;
}
9 months agoRefactorDiscuss
6 kyu
Palindrome for your Dome
JavaScript:

function palindrome(string) {
  var stringArray = string.split('');
  var f = '',r = '';
  for(var i = 0; i < Math.ceil(stringArray.length/2); i++) {
    while(!isLetter(f=stringArray.shift()))
    {
      if(typeof f == 'undefined') return true;
    }
     while(!isLetter(r=stringArray.pop())) 
     {
       if(typeof r == 'undefined') return true;
       
     }
     if(f.toLowerCase() != r.toLowerCase()) return false;
  }
  return true;
}

isLetter = function(c) {
  if(typeof c == 'undefined') return false;
  if((c.charCodeAt(0)>64&&c.charCodeAt(0)<91)||(c.charCodeAt(0)>96&&c.charCodeAt(0)<123))
     return true;
  return false;
}
9 months agoRefactorDiscuss
6 kyu
Decode the Morse code
JavaScript:

decodeMorse = function(morseCode){
  return morseCode.split('   ').map(decodeMorseWord).join(' ').trim();
}
decodeMorseWord = function (morseWord) {
  return morseWord.split(' ').map(decodeMorseChar).join('');
}
decodeMorseChar = function (morseChar) {
  return MORSE_CODE[morseChar];
}

9 months agoRefactorDiscuss
7 kyu
Find an employees role in the company
JavaScript:

function findEmployeesRole(name) {
  // employees array preloaded 
  var result = false;
  var firstName = name.split(' ')[0];
  var lastName = name.split(' ').length > 1?name.split(' ')[1]:'';
  for(var i = 0; i < employees.length; i++) 
  {
    result = (firstName === employees[i].firstName && lastName === employees[i].lastName);
    if( result )
      return employees[i].role;
      
  }
  return "Does not work here!" ;// Passed employees role
}
9 months agoRefactorDiscuss
7 kyu
Triangular Treasure
JavaScript:

// Return the nth triangular number
function triangular( n ) {
  if(isNaN(n) || n < 0) return 0;
  return (n+1)*n/2;
}
9 months agoRefactorDiscuss
7 kyu
Head, Tail, Init and Last
JavaScript:

// TODO: implement the four functions specified.
Array.prototype.clone = function(list) {
  if(isEmpty(list)){
    return [];
    } else {
      var arr = new Array();
      for(v in list) {
        arr.push(v);
      }
      return arr;
    }
}
function head(list) {
  if(isEmpty(list)) {
    return '';
  } else {
    
    return list[0];
  }
}
function last(list) {
  if(isEmpty(list)) {
    return '';
  } else {
    return list[list.length-1];
  }
}
function tail(list) {
  if(isEmpty(list)) {
    return [];
  } else {
    var tmpList = new Array();
    for(var i = 1;i<list.length;i++) {
      tmpList.push(list[i]);
    }
    return tmpList;
  }
}
function init(list) {
  if(isEmpty(list)) {
    return [];
  } else {
  var tmpList = new Array();
    for(var i = 0;i<list.length-1;i++) {
      tmpList.push(list[i]);
    }
    return tmpList;
  }
}
function isEmpty(obj) {
  for(p in obj) {
    if(obj.hasOwnProperty(p))
      return false;
   }
  return true;
}
9 months agoRefactorDiscuss
7 kyu
List to Array
JavaScript:

function listToArray(list) {
  var arr = [
  ];
  if (!isEmpty(list)) {
    while (true) {
      arr.push(list.value);
      list = list.next;
      if (list === null) break;
    }
    return arr;
  } else {
    return arr;
  }
}
function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}
9 months agoRefactorDiscuss
7 kyu
Return String of First Characters
JavaScript:

function makeString(s){
  return s.split(' ').map(function(d){
    return d[0];
  }).join('');
}
9 months agoRefactorDiscuss
7 kyu
Is this working?
JavaScript:

function Counter(){
  this.count = 0;

  Counter.prototype.updateCount = function(){
    this.count++;
  };
}
9 months agoRefactorDiscuss
7 kyu
A Rule of Divisibility by 13
JavaScript:

function thirt(n) {
  if (isNaN(n)) return 'It\'s not a Number';
  var remainder = n;
  var sum = 0;
  var nString = String(n);
  var i = nString.length - 1;
  var j = 0;
  for (; i >= 0; i--, j++) {
    sum += parseInt(nString[i]) * (Math.pow(10, j) % 13);
  }
  console.log(sum);
  if (remainder == sum) {
    return remainder;
  }
  while (remainder != sum) {
    remainder = sum;
    sum = 0;
    nString = String(remainder);
    i = nString.length - 1;
    j = 0;
    for (; i >= 0; i--, j++) {
      sum += parseInt(nString[i]) * (Math.pow(10, j) % 13);
    }
    console.log(':'+sum);
  }
  return remainder;
}
9 months agoRefactorDiscuss
8 kyu
Broken Greetings
JavaScript:

function Person(name){
  this.name = name;
}

Person.prototype.greet = function(otherName){
  return "Hi " + otherName + ", my name is " + this.name;
}
9 months agoRefactor
8 kyu
Multiply
JavaScript:

function multiply(a, b){
  return a * b;
}