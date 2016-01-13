Tracks = new Mongo.Collection("tracks");

if (Meteor.isClient){
		Meteor.subscribe("tracks");

	Template.tracks.onCreated(function(){
			Session.setDefault('pushPlay', false);
	})

  Template.deck.onRendered(function(){
      var iframeElement = document.getElementById('iframe');
      var widget = SC.Widget(iframeElement);
      widget.bind(SC.Widget.Events.READY, function () {
        console.log('Ready');
        widget.bind(SC.Widget.Events.PLAY, function () {
            widget.getCurrentSound(function (sound) {
                console.log(sound.title);
            });
        });
           widget.bind(SC.Widget.Events.FINISH, function () {
               console.log('Finished');
        });
    });
  })

	Template.tracks.helpers({
    tracks: function() {
    	if (!Template.instance().subscriptionsReady()) return;
      return Tracks.find({roomId:"Techno"}, {sort: {vote: -1}})
    }
  })

  Template.player.helpers({
    play: function() {
    	return Session.get('pushPlay');
    }
  })

  Template.deck.helpers({
    track: function() {
      if (!Template.instance().subscriptionsReady()) return;
      var track = Tracks.find({roomId:"Techno"}, {sort: {vote: -1}}).fetch()[0].scHtml.replace('auto_play=false','auto_play=true')
      var trackObject = new Object();
      trackObject.html = track

      return trackObject
    }
  })


  Template.tracks.events({    
    'click .vote': function(e, t) {
      // console.log($(event.target).attr('id'))
      var trackId = $(event.target).attr('id')
      // console.log(Tracks.find(trackId).fetch()[0].vote)
      var trackVote = Tracks.find(trackId).fetch()[0].vote
      Tracks.update(trackId, {
        $set: {
          vote: trackVote + 1
        }
      })
    },
    'click .delete': function(e, t) {
      var trackId = $(event.target).attr('id')
      Tracks.remove(trackId);
    },
 	  'click #play': function(e, t) {
      var streamUrl = Tracks.find({roomId:"Techno"}, {sort: {vote: -1}}).fetch()[0].stream_url
	  	Session.set('pushPlay',true)
      // console.log(streamUrl)
	  }
  })
}

if (Meteor.isServer) {
	  Tracks.allow({
    update: function (userId, doc, fieldNames, modifier) {
      return true;
    },
    remove: function (userId, doc) {
      return true;
    }
  });

	Meteor.publish("tracks", function () {
    return Tracks.find();
  });

}