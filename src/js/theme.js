var app = angular.module("taskFlow", []);

app.controller("themeController", function ($scope) {
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.getElementById("taskDate").valueAsDate = new Date();

  $scope.isLight = savedTheme === "light";

  if ($scope.isLight) {
    document.documentElement.classList.add("light");
  }

  $scope.toggleTheme = function () {
    $scope.isLight = !$scope.isLight;

    if ($scope.isLight) {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    }
  };
});
