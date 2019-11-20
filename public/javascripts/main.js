// Open headshot image
$("#zoom-in").click(() => {
  $(".headshot").animate(
    {
      zoom: "215%",
      left: "-=28%"
    },
    "slow"
  );
  $("#zoom-in").css({ display: "none" });
  $("#close").css({ display: "block" });
  $(".headshot").unbind("mouseenter");
});

// Close headshot image
$("#close").click(() => {
  $("#close").css({ display: "none" });
  $(".headshot").hover(
    function() {
      $("#zoom-in").css({ display: "block" });
    },
    function() {
      $("#zoom-in").css({ display: "none" });
    }
  );
  $(".headshot").animate(
    {
      zoom: "100%",
      left: "+=28%"
    },
    "slow"
  );
});

// $(".card").click(() => {
//   $(".resume").toggle("slow");
// });

//TODO: change earliest year
$("#dropdownYear").each(function() {
  let year = new Date().getFullYear();
  let current = year;

  for (let i = 0; i < 6; i++) {
    if (year + i === current)
      $(this).append(
        '<option selected value="' +
          (year - i) +
          '">' +
          (year - i) +
          "</option>"
      );
    else
      $(this).append(
        '<option value="' + (year - i) + '">' + (year - i) + "</option>"
      );
  }
});

$(".switch").ready(() => {
  let switchValue = $(".switch").attr("value");
  if (switchValue === "undefined") {
    $(this).attr("value", "true");
  } else {
    $(this).attr("value", "false");
  }
});





// $('.card').click(() => {
//     console.log('we hitting it', $(this))

//     $.ajax(
//         {
//             method: 'GET',
//             url: '/users/gallery',
//             data: {
//                 id: 
//             },
//             dataType: 'json',
//             success: (result) => {
//                 console.log(result);
                
//             }
//         })
//     })

// $(".edit-profile-error").ready(() => {
//   if (errors) {
//     console.log(errors);
//     $("#nav-profile-tab").trigger("click");
//   }
// });


$("#add-school").click(() => {
  event.preventDefault();
  $(".addschoolform").append(
    '<input type="text" class="form-control" id="school" placeholder="School" />'
  );
});

$("#add-training").click(() => {
  event.preventDefault();
  $(".addtrainingform").append(
    '<input type="text" class="form-control" id="school" placeholder="Training" />'
  );
});

$("#add-skill").click(() => {
  event.preventDefault();
  $(".addskillsform").append(
    '<input type="text" class="form-control" id="school" placeholder="Skill" />'
  );
});