if (Meteor.isClient) {

	Meteor.subscribe("tracks");
	// Template.soundcloud.onRendered(function(){
	// 	SC.initialize({
	// 		client_id: '74636a7842d691e119d298aaff377fc4'
	// 	});
	// 	//SEARCH SOUNDCLOUD TRACKS
	// 	SC.get('/tracks', {
	// 		genre:Session.get('roomname').toLowerCase(),
	// 	  duration:{to:60000*20}
	// 	}).then(function(tracks) {
	// 		// console.log(tracks)
	// 	  for(var i=0; i<12; i++){
	// 			// SOUNDCLOUD EMBED PLAYER
	// 			var track_url = tracks[i].permalink_url;
	// 			SC.oEmbed(track_url, { auto_play: false }).then(function(oEmbed) {
	// 			$('.player').append(
	// 				'<div class="col-md-6 track" style="margin:0px"><button class="btn btn-success btn-block nominate" type="button" id='+tracks[i].id+'>Nominate</button><div class="scHtml">'+oEmbed.html+'</div></div>')
	// 			// console.log(oEmbed.html)
	// 			});
	// 	  }
	// 	});
	// })

	Template.soundcloud.events({
		'click .nominate': function(event, template){
			console.log('nomiated!!')
			var scHtml = $(event.target).closest('div').find('.scHtml').html()
			var stream_url = $(event.target).closest('div').find('.scHtml')[0].id
			console.log(stream_url)
			// var roomId = Rooms.find({roomname:"Techno"}).fetch()[0]._id;
		  Tracks.insert({roomId:Session.get('roomname'),
		  	scHtml: scHtml,
		  	vote: 0,
		  	user: Meteor.user().username,
		  	stream_url: stream_url.replace('https://api.soundcloud.com','')
      });
		},
		'keyup #track': function(e, t) {
      if(e.type == "keyup" && e.which == 13) {
      $('html, body').animate({scrollTop:$('.list').position().top}, 'slow');
      $('.list').empty()
      var trackSearch = $('#track').val()
        SC.initialize({
        client_id: '74636a7842d691e119d298aaff377fc4'
        });

        //SEARCH SOUNDCLOUD TRACKS
        SC.get('/tracks', {
          q: trackSearch, 
          genres: Session.get('roomname').toLowerCase(), 
          duration:{to:60000*8}
        }).then(function(tracks) {
          console.log(tracks);
          // console.log(tracks.permalink_url);
          // console.log(tracks.artwork_url);
          var trackTimes = []
          for(var i=0; i<8; i++){
             // SOUNDCLOUD EMBED PLAYER
            var track_url = tracks[i].permalink_url;
            var stream_url = tracks[i].stream_url;
            SC.oEmbed(track_url, { auto_play: false }).then(function(oEmbed) {
            $('.list').append('<div class="col-md-6 track" style="margin:0px"><button class="btn btn-success btn-block nominate" type="button">Nominate</button><div class="scHtml" id='+stream_url+'>'+oEmbed.html+'</div></div>')
            });
          }
        });
      }
    }
	})
}

if (Meteor.isServer) {
	Tracks.allow({
    insert: function (userId, doc) {
      return true;
    }
  });

}