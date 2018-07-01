module.exports = {
    shuffle: function (array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
    },
    queues: function (queue) {
        var all = {
            'conquest5v5' : 423,
            'novicequeue' : 424,
            'conquest' : 426,
            'practice' : 427,
            'conquestchallenge' : 429,
            'conquestranked' : 430,
            'domination' : 433,
            'motd1' : 434,
            'arena' : 435,
            'arenachallenge' : 438,
            'dominationchallenge' : 439,
            'joustleague' : 440,
            'joustranked' : 440,
            'joustchallenge' : 441,
            'assault' : 445,
            'assaultchallenge' : 446,
            'joust3v3' : 448,
            'joustranked3v3' : 450,
            'conquestleague' : 451,
            'conquestranked' : 451,
            'arenaleague' : 452,
            'arenaranked' : 452,
            'motd2' : 465,
            'clash' : 466,
            'clashchallenge' : 467
            };
        if(queue){
            return all[queue];
        }else{
            return all;
        }
    }
  };
  
