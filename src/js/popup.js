import { app } from "./app.js";

app.controller("popupController", function ($scope, $rootScope) {
  const taskDateInput = document.getElementById("taskDate");
  $scope.isVisible = false;
  $scope.today = new Date().toISOString().split("T")[0];

  if (taskDateInput) {
    taskDateInput.valueAsDate = new Date();
  }
  $scope.capitalizeFirstLetter = function () {
    if ($scope.task.title) {
      $scope.task.title =
        $scope.task.title.charAt(0).toUpperCase() + $scope.task.title.slice(1);
    }
  };

  $scope.submitTask = function () {
    if ($scope.taskForm.$valid) {
      $scope.tasks = JSON.parse(localStorage.getItem("tasks")) || [];

      const todayDate = new Date();
      const dueDate = $scope.task.date;

      const time = dueDate - todayDate;
      const days = Math.ceil(time / (1000 * 60 * 60 * 24));

      let priority = "Later";
      if (days < 0) {
        priority = "Overdue";
      } else if (days <= 1) {
        priority = "Urgent";
      } else if (days <= 3) {
        priority = "Upcoming";
      }

      $scope.tasks.push({
        id: Date.now(),
        title: $scope.task.title,
        date: $scope.task.date,
        priority: priority,
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
