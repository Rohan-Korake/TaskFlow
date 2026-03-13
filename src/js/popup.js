import { app } from "./app.js";

app.controller("popupController", function ($scope, $rootScope) {
  console.log("popupController initialized");
  const taskDateInput = document.getElementById("taskDate");
  $scope.isVisible = false;
  $scope.today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  if (taskDateInput) {
    taskDateInput.valueAsDate = new Date();
  }

  $scope.submitTask = function () {
    if ($scope.taskForm.$valid) {
      $scope.tasks = JSON.parse(localStorage.getItem("tasks")) || [];

      $scope.tasks.push({
        title: $scope.task.title,
        date: $scope.task.date,
        priority: $scope.task.priority,
      });

      localStorage.setItem("tasks", JSON.stringify($scope.tasks));
      $rootScope.$broadcast("tasksUpdated");

      $scope.resetPopup();
      $scope.toggleForm();
    }
  };

  $scope.closeForm = function () {
    $scope.resetPopup();
    $scope.toggleForm();
  };

  $scope.resetPopup = function () {
    $scope.task = {};
    $scope.taskForm.$setPristine();
    $scope.taskForm.$setUntouched();
  };

  $scope.toggleForm = function () {
    $scope.isVisible = !$scope.isVisible;
  };
});
