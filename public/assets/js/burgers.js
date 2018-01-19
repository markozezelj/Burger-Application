// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
    $(".burger-btn").on("click", function(event) {
      var id = $(this).data("id");
      var eaten = $(this).data("eaten");
      console.log(eaten);
      
      // Set burger to eaten
      var newEatenState = {
        eaten: eaten
      };
  
      if (eaten) {
        // Change state of eaten to true
        $.ajax("/api/burgers/" + id, 
        {
          method: "PUT",
          data: newEatenState
        }).then(function() {
          console.log("changed eaten to", newEatenState);
          location.reload();
        });
      } else {
        // Send the DELETE request.
        $.ajax("/api/burgers/" + id, {
          type: "DELETE",
        }).then(
          function() {
            console.log("deleted burger", id);
            // Reload the page to get the updated list
            location.reload();
          }
        );
      }
    });
  
    $(".create-form").on("submit", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
  
      // Create new burger object based off form data
      var newBurger = {
        name: $("#brg").val().trim(),
        eaten: $("[name=eaten]:checked").val().trim()
      };
  
      // Send the POST request.
      $.ajax("/api/burger", {
        type: "POST",
        data: newBurger
      }).then(
        function() {
          console.log("created new burger");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  });