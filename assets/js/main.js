

$('document').ready(function(){

    var firebaseConfig = {
        apiKey: "AIzaSyCCjK81U44XV_L3Vz06AAEUPxhoHt5KT6I",
        authDomain: "double-aleph-143200.firebaseapp.com",
        databaseURL: "https://double-aleph-143200.firebaseio.com",
        projectId: "double-aleph-143200",
        storageBucket: "double-aleph-143200.appspot.com",
        messagingSenderId: "225732579150",
        appId: "1:225732579150:web:d5badc7f43b06da5"
      };
      // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    var db = firebase.database();

    

    var calculateTimes = function(){
        $('tbody tr').each(function(index, value){


            var frequency = $(value).children('td#frequency-row').text()
            var startTime = $(value).children('td#time-row').text()

            var convertedTime = moment(startTime, "HH:mm").subtract(1, "years");

            var timeDiff = moment().diff(moment(convertedTime), 'minutes');

            var nextTrainMins = (frequency - (timeDiff % frequency));

            var nextTrainTime = moment().add(nextTrainMins, "minutes").format("HH:mm");

            $(value).children('td#next-arrival-row').text( nextTrainTime); 
            $(value).children('td#mins-away-row').text(parseInt(frequency) === nextTrainMins ? 'Now' : nextTrainMins);             
        });
    }
    $('.submit-button').on('click', function(event){
        event.preventDefault();

        var trainName = $('#train-name').val();
        var destination = $('#destination').val();
        var time = $('#time').val();
        var frequency = $('#frequency').val();
        console.log(trainName, destination, time, frequency)

        db.ref('/train-tracker').push({
            name : trainName, 
            destination : destination, 
            time : time ,
            frequency : frequency
        });
        
        // $('#train-name').val('');
        // $('#destination').val('');
        // $('#time').val('');
        // $('#frequency').val('');
        
    });

    db.ref('/train-tracker').on('value', function(snap){

        $('tbody').empty()

        Object.keys(snap.val()).forEach(function(dbId){
            
            var id = $('<td>').text(dbId).attr({'style'  : "display: none", id : "id"});
            var name = $('<td>').text(snap.val()[dbId].name).attr({id:'name-row'});
            var destination = $('<td>').text(snap.val()[dbId].destination).attr({id:'destination-row'});
            var time = $('<td>').text(snap.val()[dbId].time).attr({'style'  : "display: none", id : "time-row"});
            var frequency = $('<td>').text(snap.val()[dbId].frequency).attr({id:'frequency-row'});
            var nextArrival = $('<td>').text('').attr({id:'next-arrival-row'});
            var minsAway = $('<td>').text('').attr({id:'mins-away-row'});


            var appendRow = $('<tr>').append([id, name, destination,time,frequency, nextArrival, minsAway]); 

            $('tbody').append(appendRow)
             
            calculateTimes();
        })
    })


var timer = function(){
    calculateTimes()
    setTimeout(timer, '60000')
}

timer()

})
