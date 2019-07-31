

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

    $('.submit-button').on('click', function(event){
        event.preventDefault();

        var trainName = $('#train-name').val();
        var destination = $('#destination').val();
        var time = $('#time').val();
        var frequency = $('#frequency').val();

        db.ref('/train-tracker').push({
            name : trainName, 
            destination : destination, 
            time : time ,
            frequency : frequency
        });
        
        $('#train-name').val('');
        $('#destination').val('');
        $('#time').val('');
        $('#frequency').val('');
        
    });

    db.ref('/train-tracker').on('value', function(snap){
        Object.keys(snap.val()).forEach(function(dbId){
            
            var id = $('<td>').text(dbId).attr({'style'  : "display: none"});
            var name = $('<td>').text(snap.val()[dbId].name);
            var destination = $('<td>').text(snap.val()[dbId].destination);
            var frequency = $('<td>').text(snap.val()[dbId].frequency);

            var appendRow = $('<tr>').append([id, name, destination,frequency]); 

            $('tbody').append(appendRow)

        })
    })
})