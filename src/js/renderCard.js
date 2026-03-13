import { app } from "./app.js";

app.controller("cardController", function ($scope, $rootScope) {
  // initially load from localStorage
  $scope.tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // whenever a new task is added update the list
  $rootScope.$on("tasksUpdated", function () {
    $scope.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  });
});
