import { app } from "./app.js";

app.controller("cardController", function ($scope, $rootScope, $timeout) {
  // initially load from localStorage
  $scope.tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // whenever a new task is added update the list
  $rootScope.$on("tasksUpdated", function () {
    $scope.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  });

  //delete completed task event
  $scope.completeTask = (task) => {
    $timeout(() => {
      $scope.tasks = $scope.tasks.filter((c) => {
        return c.id !== task.id;
      });
      localStorage.setItem("tasks", JSON.stringify($scope.tasks));
      $rootScope.$broadcast("tasksUpdated");
    }, 200);
  };
});
