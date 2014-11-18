'use strict';

// Configuring the Articles module
angular.module('articles').run(['Menus',
	function(Menus) {
		// Set top bar menu items
        Menus.addMenuItem('topbar', 'Projetos', 'articles', 'ListArticles', '/articles(/create)?');
	}
]);