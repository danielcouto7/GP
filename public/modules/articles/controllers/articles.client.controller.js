'use strict';

angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles', 'Users',
	function($scope, $stateParams, $location, Authentication, Articles, Users) {
		$scope.authentication = Authentication;
        
        $scope.users = Users.query();
                                                             

		$scope.create = function() {
            
			var article = new Articles({
				titulo: this.titulo,
				descricao: this.descricao,
                responsavel: this.responsavel
			});
			article.$save(function(response) {
				$location.path('articles/' + response._id);

				$scope.titulo = '';
				$scope.descricao = '';
                $scope.responsavel = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(article) {
			if (article) {
				article.$remove();

				for (var i in $scope.articles) {
					if ($scope.articles[i] === article) {
						$scope.articles.splice(i, 1);
					}
				}
			} else {
				$scope.article.$remove(function() {
					$location.path('articles');
				});
			}
		};

		$scope.update = function() {
			var article = $scope.article;

			article.$update(function() {
				$location.path('articles/' + article._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.articles = Articles.query();
		};

		$scope.findOne = function() {
			$scope.article = Articles.get({
				articleId: $stateParams.articleId
			});
		};
	}
]);