 Router.configure({
  // the default layout
  layoutTemplate: 'mainNav'
});
 
Router.route('/', function () {
  this.render('soundcloud');
  this.layout('mainNav');
});
 
 
Router.route('/search', function () {
  this.render('soundcloud');
  this.layout('mainNav');
});

Router.route('/jukebox', function () {
  this.render('player');
  this.layout('mainNav');
});

Router.route('/chat', function () {
  this.render('chat');
  this.layout('mainNav');
});
 