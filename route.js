 Router.configure({
  // the default layout
  layoutTemplate: 'mainLayout'
});
 
Router.route('/', function () {
  this.render('soundcloud');
  this.layout('mainLayout');
});
 
 
Router.route('/search', function () {
  this.render('soundcloud');
  this.layout('mainLayout');
});

Router.route('/jukebox', function () {
  this.render('player');
  this.layout('mainLayout');
});

Router.route('/chat', function () {
  this.render('chat');
  this.layout('mainLayout');
});
 