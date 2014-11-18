'use strict';

angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles', 'Users',
	function($scope, $stateParams, $location, Authentication, Articles, Users) {
		$scope.authentication = Authentication;
        
        $scope.users = Users.query();
        
        $scope.escolheuResponsavelCriar = function(){
            angular.forEach($scope.users,function(user){
                if (user._id == $scope.responsavel.responsavelId) {
                    $scope.responsavel.username = user.username;
                }
            });
        };
        
        $scope.escolheuResponsavelEditar = function(user){
            angular.forEach($scope.users,function(user){
                if (user._id == $scope.article.responsavel.responsavelId) {
                    $scope.article.responsavel.username = user.username;
                }
            });
            //$scope.article.responsavel.username = user.username;
        };
                                                             

		$scope.create = function() {
            
			var article = new Articles({
				nome: this.nome,
				descricao: this.descricao,
                responsavel: this.responsavel,
                dtInicio: this.dtInicio,
                dtTermino: this.dtTermino
			});
			article.$save(function(response) {
				$location.path('articles/' + response._id);

				$scope.nome = '';
				$scope.descricao = '';
                $scope.responsavel = '';
                $scope.dtInicio = '';
                $scope.dtTermino = '';
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
        
        $scope.ver = function(article){
            $location.path('articles/' + article._id);
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
        
        
        

        
        
            $scope.clear = function() {
            $scope.dt = null;
          };

          // Disable weekend selection
          $scope.disabled = function(date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
          };

          $scope.toggleMin = function() {
            $scope.minDate = $scope.minDate ? null : new Date();
          };
          $scope.toggleMin();

          $scope.openInicio = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.inicioOpened = true;
          };
        
            $scope.openTermino = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.terminoOpened = true;
          };

          $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
          };

          $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
          $scope.format = $scope.formats[0];
	}
]);