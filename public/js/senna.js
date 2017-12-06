

function scroll_toc(path) {
  // remove base either '/docs/' or '/'
  var base = '/docs/';
    
  path = path.indexOf(base) == 0? path.substring(base.length) : path.substring(1);
  
  if(path[path.length - 1] == '/') {
    path = path.substring(0, path.length - 1);
  }
  
  path = '.' + path.split('/').join(' .');

  $('.active').removeClass('active');

  if(path.length > 1) {
    $(path).addClass('active');
    
    while(path.lastIndexOf(' ') > -1) {
      path = path.substring(0, path.lastIndexOf(' '));
      $(path).addClass('active');
    }
  }
}

$(document).ready(function() {
  scroll_toc(window.location.pathname);

  var app = new senna.App();
  app.setBasePath('/');
  // replace html with 'content' id
  app.addSurfaces('content');
  
  if(location.hostname == "rocketchat.github.io" || location.hostname == "rocket.chat"){
    app.addRoutes(new senna.Route(/docs\/.*/, senna.HtmlScreen));
  }
  else {
    app.addRoutes(new senna.Route(/.*/, senna.HtmlScreen));
  }
  
  app.on('startNavigate', function(event) {
    scroll_toc(event.path)
  });
  
  app.on('endNavigate', function(event) {
    var hash = event.path.indexOf('#');

  	if (hash !== -1) {
  		location.hash = path.substr(hash);
  	}
    else {
  		$('#content').scrollTop(0);
  	}
	});
});
