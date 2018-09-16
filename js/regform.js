$(function () {

    if (localStorage.getItem("students") == null) {
        localStorage.setItem("students", JSON.stringify([]));
    }
    showdata();
    
    dialog = $("#dialog").dialog({
        autoOpen: false,
        width: 500,
        height: 500,
        modal: true,
        title:"Registration Form"
    });
    
    $(".regstu").click(function(){
        dialog.dialog("open");
    });
    
    $("#dob").datepicker({
        changeYear: true,
        changeMonth: true,
        maxDate: "0d"
    });
    $(".submit").click(function () {
        var isvalid = $("#regform").validate({
            rules: {
                usn: {
                    required: true,
                    minlength: 10,
                    maxlength: 10,
                },
                name: {
                    required: true,
                    minlength: 3
                },
                email: {
                    required: true,
                    email: true,
                },
                mobile: {
                    required: true,

                },
                percentage: {
                    required: true,
                    min: 55,
                    max: 100,

                },
                course: {
                    required: true,
                },
                dob: {
                    required: true,
                }
            },
            messages: {
                usn: {
                    required: "USN can't be empty",

                },
                name: {
                    required: "Name can't be empty",
                    minlength: "Nmae should have atleast 3 charecter"
                },
                email: {
                    required: "please enter your email"
                },
                mobile: {
                    required: "Mobile number can't be empty"
                },
                percentage: {
                    required: "Please enter your percentage",
                    min: "Your not Eligible for placement drive",
                    max: "Invalid percentage, it should be below 100",
                },
                course: {
                    required: "Please select your course",
                },
                dob: {
                    required: "please provide your date of birth"
                }
            }
        }).form();
        if (isvalid) {
            var usn = $("#usn").val();
            var name = $("#name").val();
            var email = $("#email").val();
            var mobile = $("#mobile").val();
            var course = $("#course").val();
            var percentage = $("#percentage").val();
            var dob = $("#dob").val();
            $(".reset").click();

            student = {
                "usn": usn,
                "name": name,
                "email": email,
                "mobile": mobile,
                "course": course,
                "percentage": percentage,
                "dob": dob,
            }
            var students = JSON.parse(localStorage.getItem("students"));
            students.push(student);
            updatedata(students);
            showdata();
            dialog.dialog("close")
            return false;
        }

    });

    function showdata() {
        var students = getdatafromlocalstorage();
        var data = "";
        if (students.length == 0) {
            data = "<h3>students are not registered yet...</h3>"

        } else {
            data += "<table id='studenttable'><thead><tr>";
            data += "<th>#</th>";
            data += "<th>usn</th>";
            data += "<th>name</th>";
            data += "<th>email</th>";
            data += "<th>mobile</th>";
            data += "<th>dob</th>";
            data += "<th>branch</th>";
            data += "<th>percentage</th>";
            data += "</tr></thead>";
            for (var i = 0; i < students.length; i++) {
                var j = i + 1;
                data += "<tr>";
                data += "<td>" + j + "</td>";
                data += "<td>" + students[i].usn + "</td>";
                data += "<td>" + students[i].name + "</td>";
                data += "<td>" + students[i].email + "</td>";
                data += "<td>" + students[i].mobile + "</td>";
                data += "<td>" + students[i].dob + "</td>";
                data += "<td>" + students[i].course + "</td>";
                data += "<td>" + students[i].percentage + "</td>";
                data += "</tr>";
            }
            data += "</table>";
        }
        $("#content").html(data);
        $("#studenttable").dataTable({
            "pageLength": 2
        })
    }



    function getdatafromlocalstorage() {
        var students = JSON.parse(localStorage.getItem("students"));
        return students;
    }

    function updatedata(updatedstudents) {
        localStorage.setItem("students", JSON.stringify(updatedstudents));

    }

});