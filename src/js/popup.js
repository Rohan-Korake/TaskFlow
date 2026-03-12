import { app } from "./app.js";

app.controller("popupController", function ($scope) {
  console.log("popupController initialized");
  const taskDateInput = document.getElementById("taskDate");
  if (taskDateInput) {
    taskDateInput.valueAsDate = new Date();
  }
  $scope.isVisible = false;

  $scope.submitTask = function () {
    console.log("submitted", $scope.taskName, $scope.taskDate);

    $scope.resetPopup();
    $scope.toggleForm();
  };

  $scope.closeForm = function () {
    $scope.resetPopup();
    $scope.toggleForm();
  };

  $scope.resetPopup = function () {
    $scope.taskName = "";
    $scope.taskDate = "";
  };

  $scope.toggleForm = function () {
    $scope.isVisible = !$scope.isVisible;
  };
});
