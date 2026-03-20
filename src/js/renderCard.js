import { app } from "./app.js";

app.controller("cardController", function ($scope, $rootScope, $timeout) {
  function updatePriorities() {
    const todayDate = new Date();

    $scope.tasks.forEach((task) => {
      const dueDate = new Date(task.date);

      const time = dueDate - todayDate;
      const days = Math.ceil(time / (1000 * 60 * 60 * 24));

      if (days < 0) {
        task.priority = "Overdue"; // 🔥 added
      } else if (days <= 1) {
        task.priority = "Urgent";
      } else if (days <= 3) {
        task.priority = "Upcoming";
      } else {
        task.priority = "Later";
      }
    });

    // optional: persist updated priority
    localStorage.setItem("tasks", JSON.stringify($scope.tasks));
  }

  function loadTasks() {
    $scope.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    updatePriorities(); // 🔥 key line
  }

  // initial load
  loadTasks();

  // update when new task added
  $rootScope.$on("tasksUpdated", function () {
    loadTasks();
  });

  // delete task
  $scope.completeTask = (task) => {
    $timeout(() => {
      $scope.tasks = $scope.tasks.filter((c) => c.id !== task.id);
      localStorage.setItem("tasks", JSON.stringify($scope.tasks));
      $rootScope.$broadcast("tasksUpdated");
    }, 200);
  };
});
