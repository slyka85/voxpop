if (Meteor.isClient) {

	Meteor.subscribe("tracks");

	Template.soundcloud.events({
		'click .nominate': function(event, template){
			console.log('nomiated!!')
			var scHtml = $(event.target).closest('iframe').html()
			var stream_url = $(event.target).closest('div').find('.scHtml')[0].id
			console.log($(event.target).closest('iframe'))
			// var roomId = Rooms.find({roomname:"Techno"}).fetch()[0]._id;
		  Tracks.insert({roomId:Session.get('roomname'),
		  	html: scHtml,
		  	vote: 0,
		  	user: Meteor.user().username,
		  	stream_url: stream_url.replace('https://api.soundcloud.com','').replace('/stream','')
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
          // console.log(tracks);
          // console.log(tracks.permalink_url);
          // console.log(tracks.artwork_url);
          for(var i=0; i<8; i++){
             // SOUNDCLOUD EMBED PLAYER
            var track_url = tracks[i].permalink_url;
            var stream_url = tracks[i].stream_url.replace('https://api.soundcloud.com','').replace('/stream','');
            console.log(stream_url)

            $('.list').append('<div class="col-md-4 track" style="margin:0px"><button class="btn btn-success btn-block nominate" type="button">Nominate</button><div class="scHtml" id="'+stream_url+'""><iframe width="100%" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com'+stream_url+'""></iframe></div></div>')

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